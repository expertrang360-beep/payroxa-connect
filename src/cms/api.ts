import { createServerFn } from "@tanstack/react-start";
import {
  findUserByEmail,
  findUserById,
  getCmsDb,
  getCmsUsers,
  logActivity,
  sanitizeUser,
  saveCmsDb,
  updateApplicationLinks,
  updateSiteSettings,
  updateSocialSettings,
} from "./db.server";
import { createSignedToken, hashPassword, verifyPassword, verifySignedToken } from "./auth.server";
import type { AdminRole, ApplicationLinks, CmsUser, SiteSettings, SocialSettings } from "./types";

export const loginCmsFn = createServerFn({ method: "POST" })
  .validator((data: { email?: string; password?: string }) => data)
  .handler(async ({ data }) => {
    const { email, password } = data;

    if (!email || !password) {
      return { success: false, error: "Email and password are required." };
    }

    const userRecord = findUserByEmail(email);
    if (!userRecord) {
      // Intentionally generic error message to prevent enumeration
      return { success: false, error: "Invalid email or password." };
    }

    const isMatch = await verifyPassword(password, userRecord.passwordHash);
    if (!isMatch) {
      return { success: false, error: "Invalid email or password." };
    }

    // Update last login
    const db = getCmsDb();
    const dbUser = db.users.find((u) => u.id === userRecord.id);
    if (dbUser) {
      dbUser.lastLoginAt = new Date().toISOString();
      saveCmsDb(db);
    }

    const safeUser = sanitizeUser(userRecord);
    const token = createSignedToken(safeUser);

    logActivity(
      "admin_logged_in",
      `Administrator signed into CMS dashboard`,
      safeUser,
      "auth",
      safeUser.id,
    );

    return {
      success: true,
      user: safeUser,
      token,
    };
  });

export const getCmsSessionFn = createServerFn({ method: "POST" })
  .validator((data: { token?: string }) => data)
  .handler(async ({ data }) => {
    const result = verifySignedToken(data.token);
    if (!result.valid) {
      return { authenticated: false, user: null };
    }

    const userRecord = findUserById(result.user.id);
    if (!userRecord) {
      return { authenticated: false, user: null };
    }

    return {
      authenticated: true,
      user: sanitizeUser(userRecord),
    };
  });

export const getDashboardOverviewFn = createServerFn({ method: "POST" })
  .validator((data: { token?: string }) => data)
  .handler(async ({ data }) => {
    const auth = verifySignedToken(data.token);
    if (!auth.valid) {
      throw new Error("Unauthorized access to CMS Dashboard");
    }

    const db = getCmsDb();

    const activeProducts = db.products.filter((p) => p.published).length;
    const totalFaqs = db.faqs.filter((f) => f.status === "published").length;
    const totalTestimonials = db.testimonials.filter((t) => t.status === "published").length;
    const mediaCount = db.media.length;
    const publishedPagesCount = 8; // Home, Business, Payments, Store, Cards, Pricing, About, Contact
    const activeAnnouncements = db.announcements.filter((a) => a.enabled).length;

    // Check if there are draft modifications
    const hasHeroDraft = JSON.stringify(db.hero.published) !== JSON.stringify(db.hero.draft);

    return {
      stats: {
        publishedPages: publishedPagesCount,
        activeProducts,
        totalProducts: db.products.length,
        faqs: totalFaqs,
        testimonials: totalTestimonials,
        mediaAssets: mediaCount,
        activeAnnouncements,
        hasDraftContent: hasHeroDraft,
        lastUpdated: db.settings.updatedAt,
        lastUpdatedBy: db.settings.updatedBy,
        websiteStatus: "Operational",
      },
      settings: db.settings,
      links: db.links,
      recentActivities: (db.activities || []).slice(0, 8),
    };
  });

export const getCmsSettingsFn = createServerFn({ method: "POST" })
  .validator((data: { token?: string }) => data)
  .handler(async ({ data }) => {
    const auth = verifySignedToken(data.token);
    if (!auth.valid) {
      throw new Error("Unauthorized");
    }

    const db = getCmsDb();
    return {
      settings: db.settings,
      links: db.links,
      social: db.social,
    };
  });

export const updateGeneralSettingsFn = createServerFn({ method: "POST" })
  .validator((data: { token: string; settings: Partial<SiteSettings> }) => data)
  .handler(async ({ data }) => {
    const auth = verifySignedToken(data.token);
    if (!auth.valid) {
      throw new Error("Unauthorized");
    }

    if (auth.user.role !== "Super Admin") {
      throw new Error("Only Super Admins can modify global site settings.");
    }

    const updated = updateSiteSettings(data.settings, auth.user);
    return { success: true, settings: updated };
  });

export const updateApplicationLinksFn = createServerFn({ method: "POST" })
  .validator((data: { token: string; links: Partial<ApplicationLinks> }) => data)
  .handler(async ({ data }) => {
    const auth = verifySignedToken(data.token);
    if (!auth.valid) {
      throw new Error("Unauthorized");
    }

    if (auth.user.role !== "Super Admin") {
      throw new Error("Only Super Admins can modify Application URLs.");
    }

    const updated = updateApplicationLinks(data.links, auth.user);
    return { success: true, links: updated };
  });

export const updateSocialSettingsFn = createServerFn({ method: "POST" })
  .validator((data: { token: string; social: SocialSettings }) => data)
  .handler(async ({ data }) => {
    const auth = verifySignedToken(data.token);
    if (!auth.valid) {
      throw new Error("Unauthorized");
    }

    const updated = updateSocialSettings(data.social, auth.user);
    return { success: true, social: updated };
  });

export const getAdminUsersFn = createServerFn({ method: "POST" })
  .validator((data: { token?: string }) => data)
  .handler(async ({ data }) => {
    const auth = verifySignedToken(data.token);
    if (!auth.valid) {
      throw new Error("Unauthorized");
    }

    return {
      users: getCmsUsers(),
      currentUserRole: auth.user.role,
    };
  });

export const createAdminUserFn = createServerFn({ method: "POST" })
  .validator(
    (data: { token: string; name: string; email: string; password: string; role: AdminRole }) =>
      data,
  )
  .handler(async ({ data }) => {
    const auth = verifySignedToken(data.token);
    if (!auth.valid || auth.user.role !== "Super Admin") {
      throw new Error("Super Admin permissions required to create admin accounts.");
    }

    const cleanEmail = data.email.trim().toLowerCase();
    if (!cleanEmail || !data.password || !data.name) {
      return { success: false, error: "Name, email, and password are required." };
    }

    if (data.password.length < 8) {
      return { success: false, error: "Password must be at least 8 characters long." };
    }

    const existing = findUserByEmail(cleanEmail);
    if (existing) {
      return { success: false, error: "An administrator with this email already exists." };
    }

    const db = getCmsDb();
    const passwordHash = await hashPassword(data.password);
    const newUser: CmsUser & { passwordHash: string } = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: data.name.trim(),
      email: cleanEmail,
      role: data.role || "Editor",
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    db.users.push(newUser);
    saveCmsDb(db);

    logActivity(
      "admin_added",
      `Created new ${newUser.role} user: ${newUser.name} (${newUser.email})`,
      auth.user,
      "users",
      newUser.id,
    );

    return { success: true, user: sanitizeUser(newUser) };
  });

export const deleteAdminUserFn = createServerFn({ method: "POST" })
  .validator((data: { token: string; userId: string }) => data)
  .handler(async ({ data }) => {
    const auth = verifySignedToken(data.token);
    if (!auth.valid || auth.user.role !== "Super Admin") {
      throw new Error("Super Admin permissions required.");
    }

    if (auth.user.id === data.userId) {
      return { success: false, error: "You cannot delete your own admin account." };
    }

    const db = getCmsDb();
    const target = db.users.find((u) => u.id === data.userId);
    if (!target) {
      return { success: false, error: "Administrator user not found." };
    }

    // Ensure at least one Super Admin remains
    const superAdmins = db.users.filter((u) => u.role === "Super Admin");
    if (target.role === "Super Admin" && superAdmins.length <= 1) {
      return { success: false, error: "Cannot delete the last Super Admin in the system." };
    }

    db.users = db.users.filter((u) => u.id !== data.userId);
    saveCmsDb(db);

    logActivity(
      "admin_role_changed",
      `Deleted admin user: ${target.name} (${target.email})`,
      auth.user,
      "users",
      target.id,
    );

    return { success: true };
  });

export const getActivityLogFn = createServerFn({ method: "POST" })
  .validator((data: { token?: string }) => data)
  .handler(async ({ data }) => {
    const auth = verifySignedToken(data.token);
    if (!auth.valid) {
      throw new Error("Unauthorized");
    }

    const db = getCmsDb();
    return {
      activities: db.activities || [],
    };
  });

export const getHeroContentFn = createServerFn({ method: "POST" })
  .validator((data: { token?: string }) => data)
  .handler(async ({ data }) => {
    const auth = verifySignedToken(data.token);
    if (!auth.valid) throw new Error("Unauthorized");
    const db = getCmsDb();
    return {
      hero: db.hero,
    };
  });

export const saveHeroDraftFn = createServerFn({ method: "POST" })
  .validator((data: { token: string; draft: any }) => data)
  .handler(async ({ data }) => {
    const auth = verifySignedToken(data.token);
    if (!auth.valid) throw new Error("Unauthorized");
    const db = getCmsDb();
    db.hero.draft = {
      ...db.hero.draft,
      ...data.draft,
      status: "draft",
      updatedAt: new Date().toISOString(),
      updatedBy: auth.user.name || auth.user.email,
    };
    saveCmsDb(db);
    logActivity("content_updated", "Saved draft modifications for Hero Section", auth.user, "hero");
    return { success: true, hero: db.hero };
  });

export const publishHeroContentFn = createServerFn({ method: "POST" })
  .validator((data: { token: string }) => data)
  .handler(async ({ data }) => {
    const auth = verifySignedToken(data.token);
    if (!auth.valid) throw new Error("Unauthorized");
    const db = getCmsDb();
    db.hero.published = {
      ...db.hero.draft,
      status: "published",
      updatedAt: new Date().toISOString(),
      updatedBy: auth.user.name || auth.user.email,
    };
    db.hero.draft = { ...db.hero.published };
    saveCmsDb(db);
    logActivity(
      "content_published",
      "Published Hero Section changes to live website",
      auth.user,
      "hero",
    );
    return { success: true, hero: db.hero };
  });

export const getProductsFn = createServerFn({ method: "POST" })
  .validator((data: { token?: string }) => data)
  .handler(async ({ data }) => {
    const auth = verifySignedToken(data.token);
    if (!auth.valid) throw new Error("Unauthorized");
    const db = getCmsDb();
    return { products: db.products };
  });

export const saveProductsFn = createServerFn({ method: "POST" })
  .validator((data: { token: string; products: any[] }) => data)
  .handler(async ({ data }) => {
    const auth = verifySignedToken(data.token);
    if (!auth.valid) throw new Error("Unauthorized");
    const db = getCmsDb();
    db.products = data.products;
    saveCmsDb(db);
    logActivity(
      "content_updated",
      `Updated products list (${data.products.length} products)`,
      auth.user,
      "products",
    );
    return { success: true, products: db.products };
  });

export const getFaqsFn = createServerFn({ method: "POST" })
  .validator((data: { token?: string }) => data)
  .handler(async ({ data }) => {
    const auth = verifySignedToken(data.token);
    if (!auth.valid) throw new Error("Unauthorized");
    const db = getCmsDb();
    return { faqs: db.faqs };
  });

export const saveFaqsFn = createServerFn({ method: "POST" })
  .validator((data: { token: string; faqs: any[] }) => data)
  .handler(async ({ data }) => {
    const auth = verifySignedToken(data.token);
    if (!auth.valid) throw new Error("Unauthorized");
    const db = getCmsDb();
    db.faqs = data.faqs;
    saveCmsDb(db);
    logActivity("faq_updated", `Saved FAQs list (${data.faqs.length} items)`, auth.user, "faqs");
    return { success: true, faqs: db.faqs };
  });

export const getTestimonialsFn = createServerFn({ method: "POST" })
  .validator((data: { token?: string }) => data)
  .handler(async ({ data }) => {
    const auth = verifySignedToken(data.token);
    if (!auth.valid) throw new Error("Unauthorized");
    const db = getCmsDb();
    return { testimonials: db.testimonials };
  });

export const saveTestimonialsFn = createServerFn({ method: "POST" })
  .validator((data: { token: string; testimonials: any[] }) => data)
  .handler(async ({ data }) => {
    const auth = verifySignedToken(data.token);
    if (!auth.valid) throw new Error("Unauthorized");
    const db = getCmsDb();
    db.testimonials = data.testimonials;
    saveCmsDb(db);
    logActivity(
      "content_updated",
      `Updated testimonials (${data.testimonials.length} reviews)`,
      auth.user,
      "testimonials",
    );
    return { success: true, testimonials: db.testimonials };
  });

export const getBusinessTypesFn = createServerFn({ method: "POST" })
  .validator((data: { token?: string }) => data)
  .handler(async ({ data }) => {
    const auth = verifySignedToken(data.token);
    if (!auth.valid) throw new Error("Unauthorized");
    const db = getCmsDb();
    return { businessTypes: db.businessTypes };
  });

export const saveBusinessTypesFn = createServerFn({ method: "POST" })
  .validator((data: { token: string; businessTypes: any[] }) => data)
  .handler(async ({ data }) => {
    const auth = verifySignedToken(data.token);
    if (!auth.valid) throw new Error("Unauthorized");
    const db = getCmsDb();
    db.businessTypes = data.businessTypes;
    saveCmsDb(db);
    logActivity(
      "content_updated",
      "Updated target business types on home page",
      auth.user,
      "business",
    );
    return { success: true, businessTypes: db.businessTypes };
  });

export const getNavigationFn = createServerFn({ method: "POST" })
  .validator((data: { token?: string }) => data)
  .handler(async ({ data }) => {
    const auth = verifySignedToken(data.token);
    if (!auth.valid) throw new Error("Unauthorized");
    const db = getCmsDb();
    return { navigation: db.navigation };
  });

export const saveNavigationFn = createServerFn({ method: "POST" })
  .validator((data: { token: string; navigation: any[] }) => data)
  .handler(async ({ data }) => {
    const auth = verifySignedToken(data.token);
    if (!auth.valid || auth.user.role !== "Super Admin") {
      throw new Error("Super Admin permissions required to modify navigation.");
    }
    const db = getCmsDb();
    db.navigation = data.navigation;
    saveCmsDb(db);
    logActivity(
      "settings_updated",
      "Updated website navigation menu items",
      auth.user,
      "navigation",
    );
    return { success: true, navigation: db.navigation };
  });

export const getAnnouncementsFn = createServerFn({ method: "POST" })
  .validator((data: { token?: string }) => data)
  .handler(async ({ data }) => {
    const auth = verifySignedToken(data.token);
    if (!auth.valid) throw new Error("Unauthorized");
    const db = getCmsDb();
    return { announcements: db.announcements };
  });

export const saveAnnouncementsFn = createServerFn({ method: "POST" })
  .validator((data: { token: string; announcements: any[] }) => data)
  .handler(async ({ data }) => {
    const auth = verifySignedToken(data.token);
    if (!auth.valid) throw new Error("Unauthorized");
    const db = getCmsDb();
    db.announcements = data.announcements;
    saveCmsDb(db);
    logActivity(
      "announcement_updated",
      "Updated top marketing announcement banner",
      auth.user,
      "announcements",
    );
    return { success: true, announcements: db.announcements };
  });

export const getMediaFn = createServerFn({ method: "POST" })
  .validator((data: { token?: string; category?: string }) => data)
  .handler(async ({ data }) => {
    const auth = verifySignedToken(data.token);
    if (!auth.valid) throw new Error("Unauthorized");
    const db = getCmsDb();
    let media = db.media || [];
    if (data.category && data.category !== "All") {
      media = media.filter((m) => m.category === data.category);
    }
    return { media };
  });

export const uploadMediaFn = createServerFn({ method: "POST" })
  .validator(
    (data: {
      token: string;
      filename: string;
      mimeType: string;
      sizeBytes: number;
      dataUrl: string;
      category?: string;
      altText?: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    const auth = verifySignedToken(data.token);
    if (!auth.valid) throw new Error("Unauthorized");
    const db = getCmsDb();

    const newAsset = {
      id: `med_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      filename: data.filename,
      originalName: data.filename,
      mimeType: data.mimeType,
      sizeBytes: data.sizeBytes,
      url: data.dataUrl,
      category: (data.category || "general") as any,
      altText: data.altText || data.filename,
      createdAt: new Date().toISOString(),
      uploadedBy: auth.user.name || auth.user.email,
    };

    db.media = [newAsset, ...(db.media || [])];
    saveCmsDb(db);

    logActivity(
      "content_created",
      `Uploaded media asset: ${newAsset.filename} (${newAsset.category})`,
      auth.user,
      "media",
      newAsset.id,
    );

    return { success: true, asset: newAsset };
  });

export const updateMediaAssetFn = createServerFn({ method: "POST" })
  .validator(
    (data: { token: string; id: string; altText?: string; category?: string; filename?: string }) =>
      data,
  )
  .handler(async ({ data }) => {
    const auth = verifySignedToken(data.token);
    if (!auth.valid) throw new Error("Unauthorized");
    const db = getCmsDb();

    const asset = (db.media || []).find((m) => m.id === data.id);
    if (!asset) {
      return { success: false, error: "Asset not found" };
    }

    if (data.altText !== undefined) asset.altText = data.altText;
    if (data.category !== undefined) asset.category = data.category as any;
    if (data.filename !== undefined) asset.filename = data.filename;

    saveCmsDb(db);
    logActivity(
      "content_updated",
      `Updated media metadata for ${asset.filename}`,
      auth.user,
      "media",
      asset.id,
    );

    return { success: true, asset };
  });

export const deleteMediaAssetFn = createServerFn({ method: "POST" })
  .validator((data: { token: string; id: string }) => data)
  .handler(async ({ data }) => {
    const auth = verifySignedToken(data.token);
    if (!auth.valid) throw new Error("Unauthorized");
    const db = getCmsDb();

    const target = (db.media || []).find((m) => m.id === data.id);
    db.media = (db.media || []).filter((m) => m.id !== data.id);
    saveCmsDb(db);

    if (target) {
      logActivity(
        "content_updated",
        `Deleted media asset ${target.filename}`,
        auth.user,
        "media",
        target.id,
      );
    }

    return { success: true };
  });

export const updateBrandVisualsFn = createServerFn({ method: "POST" })
  .validator(
    (data: {
      token: string;
      logoType?: "symbol_text" | "image" | "symbol_only";
      logoUrl?: string;
      logoDarkUrl?: string;
      logoHeightPx?: number;
      brandSymbol?: string;
      brandSymbolBg?: "gradient-purple" | "solid-purple" | "dark-slate" | "emerald" | "custom";
      faviconUrl?: string;
      appIconUrl?: string;
      defaultOgImageUrl?: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    const auth = verifySignedToken(data.token);
    if (!auth.valid) throw new Error("Unauthorized");
    if (auth.user.role !== "Super Admin") {
      throw new Error(
        "Super Admin permissions required to modify Brand Logos and Visual Identity.",
      );
    }

    const db = getCmsDb();
    db.settings = {
      ...db.settings,
      logoType: data.logoType !== undefined ? data.logoType : db.settings.logoType,
      logoUrl: data.logoUrl !== undefined ? data.logoUrl : db.settings.logoUrl,
      logoDarkUrl: data.logoDarkUrl !== undefined ? data.logoDarkUrl : db.settings.logoDarkUrl,
      logoHeightPx: data.logoHeightPx !== undefined ? data.logoHeightPx : db.settings.logoHeightPx,
      brandSymbol: data.brandSymbol !== undefined ? data.brandSymbol : db.settings.brandSymbol,
      brandSymbolBg:
        data.brandSymbolBg !== undefined ? data.brandSymbolBg : db.settings.brandSymbolBg,
      faviconUrl: data.faviconUrl !== undefined ? data.faviconUrl : db.settings.faviconUrl,
      appIconUrl: data.appIconUrl !== undefined ? data.appIconUrl : db.settings.appIconUrl,
      defaultOgImageUrl:
        data.defaultOgImageUrl !== undefined
          ? data.defaultOgImageUrl
          : db.settings.defaultOgImageUrl,
      updatedAt: new Date().toISOString(),
      updatedBy: auth.user.name || auth.user.email,
    };

    saveCmsDb(db);
    logActivity(
      "settings_updated",
      "Updated brand logos, favicon, and visual identity configurations",
      auth.user,
      "branding",
    );

    return { success: true, settings: db.settings };
  });

export const getSeoFn = createServerFn({ method: "POST" })
  .validator((data: { token?: string }) => data)
  .handler(async ({ data }) => {
    const auth = verifySignedToken(data.token);
    if (!auth.valid) throw new Error("Unauthorized");
    const db = getCmsDb();
    return { seo: db.seo };
  });

export const saveSeoFn = createServerFn({ method: "POST" })
  .validator((data: { token: string; pageSlug: string; seo: any }) => data)
  .handler(async ({ data }) => {
    const auth = verifySignedToken(data.token);
    if (!auth.valid) throw new Error("Unauthorized");
    const db = getCmsDb();
    db.seo[data.pageSlug] = {
      ...db.seo[data.pageSlug],
      ...data.seo,
      updatedAt: new Date().toISOString(),
      updatedBy: auth.user.name || auth.user.email,
    };
    saveCmsDb(db);
    logActivity(
      "content_updated",
      `Updated SEO metadata for page (${data.pageSlug})`,
      auth.user,
      "seo",
    );
    return { success: true, seo: db.seo };
  });

export const getContentSectionsFn = createServerFn({ method: "POST" })
  .validator((data: { token?: string }) => data)
  .handler(async ({ data }) => {
    const auth = verifySignedToken(data.token);
    if (!auth.valid) throw new Error("Unauthorized");
    const db = getCmsDb();
    return {
      storeSection: db.storeSection,
      walletSection: db.walletSection,
      dashboardSection: db.dashboardSection,
      securitySection: db.securitySection,
      cardsSection: db.cardsSection,
      trustStrip: db.trustStrip,
      howItWorks: db.howItWorks,
    };
  });

export const saveContentSectionsFn = createServerFn({ method: "POST" })
  .validator(
    (data: {
      token: string;
      sectionKey:
        | "storeSection"
        | "walletSection"
        | "dashboardSection"
        | "securitySection"
        | "cardsSection"
        | "trustStrip"
        | "howItWorks";
      content: any;
    }) => data,
  )
  .handler(async ({ data }) => {
    const auth = verifySignedToken(data.token);
    if (!auth.valid) throw new Error("Unauthorized");
    const db = getCmsDb();
    db[data.sectionKey] = data.content;
    saveCmsDb(db);
    logActivity("content_updated", `Updated ${data.sectionKey} content`, auth.user, "content");
    return { success: true, [data.sectionKey]: db[data.sectionKey] };
  });

export const getPublicPublishedSiteDataFn = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const db = getCmsDb();
    return {
      settings: db.settings,
      links: db.links,
      social: db.social,
      navigation: db.navigation.filter((n) => n.enabled),
      hero: db.hero.published,
      trustStrip: db.trustStrip,
      products: db.products.filter((p) => p.published),
      businessTypes: db.businessTypes.filter((b) => b.active),
      storeSection: db.storeSection,
      walletSection: db.walletSection,
      dashboardSection: db.dashboardSection,
      securitySection: db.securitySection,
      howItWorks: db.howItWorks.filter((h) => h.enabled),
      cardsSection: db.cardsSection,
      faqs: db.faqs.filter((f) => f.status === "published"),
      testimonials: db.testimonials.filter((t) => t.status === "published"),
      announcements: db.announcements.filter((a) => a.enabled),
      seo: db.seo.home,
    };
  } catch (err) {
    console.error("Error fetching published CMS site data:", err);
    return null;
  }
});
