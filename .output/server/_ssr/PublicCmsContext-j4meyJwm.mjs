import { i as __toESM } from "../_runtime.mjs";
import { f as DEFAULT_APPLICATION_LINKS, h as INITIAL_CMS_DATABASE, m as DEFAULT_SITE_SETTINGS, p as DEFAULT_HERO_CONTENT } from "./ssr.mjs";
import { b as getPublicPublishedSiteDataFn } from "./api-CzvtI6QF.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PublicCmsContext-j4meyJwm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/cms/context/PublicCmsContext.tsx";
var defaultState = {
	settings: DEFAULT_SITE_SETTINGS,
	links: DEFAULT_APPLICATION_LINKS,
	social: INITIAL_CMS_DATABASE.social,
	navigation: INITIAL_CMS_DATABASE.navigation,
	hero: DEFAULT_HERO_CONTENT,
	trustStrip: INITIAL_CMS_DATABASE.trustStrip,
	products: INITIAL_CMS_DATABASE.products,
	businessTypes: INITIAL_CMS_DATABASE.businessTypes,
	storeSection: INITIAL_CMS_DATABASE.storeSection,
	walletSection: INITIAL_CMS_DATABASE.walletSection,
	dashboardSection: INITIAL_CMS_DATABASE.dashboardSection,
	securitySection: INITIAL_CMS_DATABASE.securitySection,
	howItWorks: INITIAL_CMS_DATABASE.howItWorks,
	cardsSection: INITIAL_CMS_DATABASE.cardsSection,
	faqs: INITIAL_CMS_DATABASE.faqs,
	testimonials: INITIAL_CMS_DATABASE.testimonials,
	announcements: INITIAL_CMS_DATABASE.announcements,
	activeAnnouncement: null,
	seo: INITIAL_CMS_DATABASE.seo.home,
	allSeo: INITIAL_CMS_DATABASE.seo,
	blogPosts: INITIAL_CMS_DATABASE.blogPosts,
	blogCategories: INITIAL_CMS_DATABASE.blogCategories,
	blogAuthors: INITIAL_CMS_DATABASE.blogAuthors,
	isCmsLoaded: false
};
var PublicCmsContext = (0, import_react.createContext)(defaultState);
function PublicCmsProvider({ children }) {
	const [data, setData] = (0, import_react.useState)(defaultState);
	(0, import_react.useEffect)(() => {
		let mounted = true;
		async function loadPublishedCms() {
			try {
				const res = await getPublicPublishedSiteDataFn();
				if (res && mounted) {
					const activeAnn = (res.announcements || []).find((a) => a.enabled) || null;
					setData({
						settings: res.settings || DEFAULT_SITE_SETTINGS,
						links: res.links || DEFAULT_APPLICATION_LINKS,
						social: res.social || INITIAL_CMS_DATABASE.social,
						navigation: res.navigation || INITIAL_CMS_DATABASE.navigation,
						hero: res.hero || DEFAULT_HERO_CONTENT,
						trustStrip: res.trustStrip || INITIAL_CMS_DATABASE.trustStrip,
						products: res.products || INITIAL_CMS_DATABASE.products,
						businessTypes: res.businessTypes || INITIAL_CMS_DATABASE.businessTypes,
						storeSection: res.storeSection || INITIAL_CMS_DATABASE.storeSection,
						walletSection: res.walletSection || INITIAL_CMS_DATABASE.walletSection,
						dashboardSection: res.dashboardSection || INITIAL_CMS_DATABASE.dashboardSection,
						securitySection: res.securitySection || INITIAL_CMS_DATABASE.securitySection,
						howItWorks: res.howItWorks || INITIAL_CMS_DATABASE.howItWorks,
						cardsSection: res.cardsSection || INITIAL_CMS_DATABASE.cardsSection,
						faqs: res.faqs || INITIAL_CMS_DATABASE.faqs,
						testimonials: res.testimonials || INITIAL_CMS_DATABASE.testimonials,
						announcements: res.announcements || INITIAL_CMS_DATABASE.announcements,
						activeAnnouncement: activeAnn,
						seo: res.seo || INITIAL_CMS_DATABASE.seo.home,
						allSeo: res.allSeo || INITIAL_CMS_DATABASE.seo,
						blogPosts: res.blogPosts || INITIAL_CMS_DATABASE.blogPosts,
						blogCategories: res.blogCategories || INITIAL_CMS_DATABASE.blogCategories,
						blogAuthors: res.blogAuthors || INITIAL_CMS_DATABASE.blogAuthors,
						isCmsLoaded: true
					});
				}
			} catch (err) {
				console.warn("Using fallback static configuration:", err);
			}
		}
		loadPublishedCms();
		return () => {
			mounted = false;
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PublicCmsContext.Provider, {
		value: data,
		children
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 128,
		columnNumber: 10
	}, this);
}
function usePublicCms() {
	return (0, import_react.useContext)(PublicCmsContext);
}
//#endregion
export { usePublicCms as n, PublicCmsProvider as t };
