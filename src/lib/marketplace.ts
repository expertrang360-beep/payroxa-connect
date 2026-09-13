import { createMarketplaceOrderFn, getMarketplaceOrderFn } from "../cms/marketplace-api";
import {
  getProducts as apiGetProducts,
  getProduct as apiGetProduct,
  getVendors as apiGetVendors,
  getVendor as apiGetVendor,
  getStore as apiGetStore,
  getCategories as apiGetCategories,
  getFeatured as apiGetFeatured,
  searchMarketplace as apiSearchMarketplace
} from "../services/payroxa-public-api/client";

export const marketplaceService = {
  createOrder: async (data: any) => {
    try {
      return await createMarketplaceOrderFn({ data });
    } catch (err: any) {
      console.error("[marketplaceService] createOrder error:", err);
      return { success: false, error: err?.message || "Failed to create order" };
    }
  },
    
  getOrder: async (orderId: string) => {
    try {
      return await getMarketplaceOrderFn({ data: { orderId } });
    } catch (err: any) {
      console.error("[marketplaceService] getOrder error:", err);
      return { success: false, error: err?.message || "Failed to get order" };
    }
  },

  getProducts: async (params?: any) => {
    try {
      const res = await apiGetProducts(params);
      if (!res.success) throw new Error(res.error?.message || "Failed to fetch products");
      return res;
    } catch (err: any) {
      console.error("[marketplaceService] getProducts error:", err);
      return { success: false, data: [], error: { code: "FETCH_ERROR", message: err?.message || "Network error" } };
    }
  },

  getProduct: async (idOrSlug: string) => {
    try {
      const res = await apiGetProduct(idOrSlug);
      if (!res.success) throw new Error(res.error?.message || "Failed to fetch product");
      return res;
    } catch (err: any) {
      console.error("[marketplaceService] getProduct error:", err);
      return { success: false, data: null, error: { code: "FETCH_ERROR", message: err?.message || "Network error" } };
    }
  },

  getVendors: async () => {
    try {
      const res = await apiGetVendors();
      if (!res.success) throw new Error(res.error?.message || "Failed to fetch vendors");
      return res;
    } catch (err: any) {
      console.error("[marketplaceService] getVendors error:", err);
      return { success: false, data: [], error: { code: "FETCH_ERROR", message: err?.message || "Network error" } };
    }
  },

  getVendor: async (id: string) => {
    try {
      const res = await apiGetVendor(id);
      if (!res.success) throw new Error(res.error?.message || "Failed to fetch vendor");
      return res;
    } catch (err: any) {
      console.error("[marketplaceService] getVendor error:", err);
      return { success: false, data: null, error: { code: "FETCH_ERROR", message: err?.message || "Network error" } };
    }
  },

  getStore: async (slug: string) => {
    try {
      const res = await apiGetStore(slug);
      if (!res.success) throw new Error(res.error?.message || "Failed to fetch store");
      return res;
    } catch (err: any) {
      console.error("[marketplaceService] getStore error:", err);
      return { success: false, data: null, error: { code: "FETCH_ERROR", message: err?.message || "Network error" } };
    }
  },

  getCategories: async () => {
    try {
      const res = await apiGetCategories();
      if (!res.success) throw new Error(res.error?.message || "Failed to fetch categories");
      return res;
    } catch (err: any) {
      console.error("[marketplaceService] getCategories error:", err);
      return { success: false, data: [], error: { code: "FETCH_ERROR", message: err?.message || "Network error" } };
    }
  },

  getFeatured: async () => {
    try {
      const res = await apiGetFeatured();
      if (!res.success) throw new Error(res.error?.message || "Failed to fetch featured");
      return res;
    } catch (err: any) {
      console.error("[marketplaceService] getFeatured error:", err);
      return { 
        success: false, 
        data: { featuredProducts: [], featuredVendors: [], featuredStores: [], categories: [] },
        error: { code: "FETCH_ERROR", message: err?.message || "Network error" }
      };
    }
  },

  searchMarketplace: async (query: string) => {
    try {
      const res = await apiSearchMarketplace(query);
      if (!res.success) throw new Error(res.error?.message || "Failed to search");
      return res;
    } catch (err: any) {
      console.error("[marketplaceService] searchMarketplace error:", err);
      return { success: false, data: [], error: { code: "FETCH_ERROR", message: err?.message || "Network error" } };
    }
  }
};
