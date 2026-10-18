import { createServerFn } from "@tanstack/react-start";

type CandidateProduct = {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  category?: string;
  vendor?: string;
};

type AssistantInput = {
  query: string;
  products: CandidateProduct[];
};

type AssistantPick = { id: string; reason: string };

type AssistantResult = {
  success: boolean;
  summary?: string;
  picks?: AssistantPick[];
  error?: string;
};

const RESPONSE_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    summary: { type: "string" },
    picks: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          id: { type: "string" },
          reason: { type: "string" },
        },
        required: ["id", "reason"],
      },
    },
  },
  required: ["summary", "picks"],
};

export const recommendProductsFn = createServerFn({ method: "POST" })
  .validator((data: AssistantInput) => data)
  .handler(async ({ data }): Promise<AssistantResult> => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) {
      return { success: false, error: "The shopping assistant is not configured yet." };
    }

    const query = (data?.query ?? "").trim();
    const products = Array.isArray(data?.products) ? data.products.slice(0, 80) : [];

    if (!query) return { success: false, error: "Tell us what you are shopping for." };
    if (products.length === 0) {
      return { success: false, error: "No products are available to recommend right now." };
    }

    const catalogue = products
      .map(
        (p) =>
          `id=${p.id} | ${p.name} | ${p.currency} ${p.price} | category: ${p.category ?? "n/a"} | store: ${p.vendor ?? "n/a"} | ${(p.description ?? "").slice(0, 200)}`,
      )
      .join("\n");

    const prompt = `A shopper says: "${query}"

Pick the best matching products from this catalogue. Only use the exact ids listed. Choose at most 6, ordered best first, and skip anything irrelevant rather than padding the list. Keep each reason under 140 characters and write a friendly one-sentence summary.

Catalogue:
${catalogue}`;

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Lovable-API-Key": apiKey,
          "X-Lovable-AIG-SDK": "fetch",
        },
        body: JSON.stringify({
          model: "openai/gpt-6-astra",
          input: prompt,
          stream: true,
          store: false,
          reasoning: { effort: "low", summary: "auto" },
          text: {
            format: {
              type: "json_schema",
              name: "product_recommendations",
              strict: true,
              schema: RESPONSE_SCHEMA,
            },
          },
        }),
      });

      if (!res.ok || !res.body) {
        const body = await res.text().catch(() => "");
        console.error(`AI gateway request failed [${res.status}]: ${body}`);
        if (res.status === 429) {
          return { success: false, error: "The assistant is busy right now. Please try again shortly." };
        }
        if (res.status === 402 || res.status === 403) {
          return { success: false, error: "The assistant is unavailable right now." };
        }
        return { success: false, error: "The assistant could not answer right now." };
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let text = "";

      while (true) {
        const chunk = await reader.read();
        if (chunk.done) break;
        buffer += decoder.decode(chunk.value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const payload = line.slice(5).trim();
          if (!payload || payload === "[DONE]") continue;
          try {
            const event = JSON.parse(payload);
            if (event.type === "response.output_text.delta" && typeof event.delta === "string") {
              text += event.delta;
            } else if (event.type === "response.completed" && !text) {
              text = event.response?.output_text ?? "";
            }
          } catch {
            // ignore keep-alive / partial frames
          }
        }
      }

      if (!text.trim()) {
        return { success: false, error: "The assistant didn't return any suggestions. Try rephrasing." };
      }

      const parsed = JSON.parse(text) as { summary?: string; picks?: AssistantPick[] };
      const validIds = new Set(products.map((p) => p.id));
      const picks = (Array.isArray(parsed.picks) ? parsed.picks : [])
        .filter((pick) => pick && validIds.has(pick.id))
        .slice(0, 6);

      return { success: true, summary: parsed.summary ?? "", picks };
    } catch (err) {
      console.error("Shopping assistant failed", err);
      return { success: false, error: "The assistant could not answer right now." };
    }
  });
