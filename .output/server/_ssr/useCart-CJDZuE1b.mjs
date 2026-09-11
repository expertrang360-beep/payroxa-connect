import { i as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useCart-CJDZuE1b.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function updateSEO(meta) {
	if (typeof window === "undefined" || typeof document === "undefined") return;
	document.title = meta.title;
	const setMetaTag = (attrName, attrVal, content) => {
		let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
		if (!element) {
			element = document.createElement("meta");
			element.setAttribute(attrName, attrVal);
			document.head.appendChild(element);
		}
		element.setAttribute("content", content);
	};
	const description = meta.description || "Buy premium verified drops securely through Payroxa escrow vaults.";
	const image = meta.image || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80";
	const currentUrl = meta.url || window.location.href;
	const type = meta.type || "product";
	setMetaTag("name", "description", description);
	setMetaTag("property", "og:title", meta.title);
	setMetaTag("property", "og:description", description);
	setMetaTag("property", "og:image", image);
	setMetaTag("property", "og:url", currentUrl);
	setMetaTag("property", "og:type", type);
	setMetaTag("property", "og:site_name", "Payroxa Sovereign Marketplace");
	setMetaTag("name", "twitter:card", "summary_large_image");
	setMetaTag("name", "twitter:title", meta.title);
	setMetaTag("name", "twitter:description", description);
	setMetaTag("name", "twitter:image", image);
	setMetaTag("name", "twitter:url", currentUrl);
	if (type === "product" && meta.price !== void 0) {
		setMetaTag("property", "product:price:amount", String(meta.price));
		setMetaTag("property", "product:price:currency", meta.currency || "NGN");
	}
}
var CART_KEY = "payroxa_sovereign_cart";
var CART_EVENT = "payroxa-cart-updated";
function getCartItems() {
	if (typeof window === "undefined") return [];
	try {
		const raw = localStorage.getItem(CART_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}
function saveCartItems(items) {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(CART_KEY, JSON.stringify(items));
		window.dispatchEvent(new Event(CART_EVENT));
	} catch (err) {
		console.error("Failed to save cart items:", err);
	}
}
function useCart() {
	const [items, setItems] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		setItems(getCartItems());
		const handleUpdate = () => {
			setItems(getCartItems());
		};
		window.addEventListener(CART_EVENT, handleUpdate);
		window.addEventListener("storage", handleUpdate);
		return () => {
			window.removeEventListener(CART_EVENT, handleUpdate);
			window.removeEventListener("storage", handleUpdate);
		};
	}, []);
	const addToCart = (product, quantity = 1, size = "M", color = "Classic Edition") => {
		const current = getCartItems();
		const existingIndex = current.findIndex((item) => item.id === product.id && item.size === size && item.color === color);
		if (existingIndex > -1) current[existingIndex].quantity += quantity;
		else current.push({
			id: product.id,
			name: product.name,
			price: product.price,
			currency: product.currency,
			image: product.image,
			slug: product.slug,
			quantity,
			size,
			color
		});
		saveCartItems(current);
	};
	const updateQuantity = (id, size, color, quantity) => {
		const current = getCartItems();
		const index = current.findIndex((item) => item.id === id && item.size === size && item.color === color);
		if (index > -1) {
			if (quantity <= 0) current.splice(index, 1);
			else current[index].quantity = quantity;
			saveCartItems(current);
		}
	};
	const removeFromCart = (id, size, color) => {
		saveCartItems(getCartItems().filter((item) => !(item.id === id && item.size === size && item.color === color)));
	};
	const clearCart = () => {
		saveCartItems([]);
	};
	return {
		items,
		addToCart,
		updateQuantity,
		removeFromCart,
		clearCart,
		totalCount: items.reduce((acc, item) => acc + item.quantity, 0)
	};
}
//#endregion
export { useCart as n, updateSEO as t };
