import { a as getCmsUsers, c as saveCmsDb, d as updateSocialSettings, i as getCmsDb, l as updateApplicationLinks, n as findUserByEmail, o as logActivity, r as findUserById, s as sanitizeUser, t as auditSeoHealth, u as updateSiteSettings } from "./ssr.mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { t as bcryptjs_default } from "../_libs/bcryptjs.mjs";
import crypto from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/api-CddlI5Mt.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var CMS_SECRET = process.env.CMS_JWT_SECRET || process.env.SESSION_SECRET || "payroxa-cms-production-secure-signature-key-2026";
var TOKEN_EXPIRY_MS = 6048e5;
async function hashPassword(password) {
	const salt = await bcryptjs_default.genSalt(10);
	return bcryptjs_default.hash(password, salt);
}
async function verifyPassword(password, hash) {
	return bcryptjs_default.compare(password, hash);
}
function createSignedToken(user) {
	const payload = {
		userId: user.id,
		email: user.email,
		name: user.name,
		role: user.role,
		issuedAt: Date.now(),
		expiresAt: Date.now() + TOKEN_EXPIRY_MS
	};
	const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
	return `${payloadB64}.${crypto.createHmac("sha256", CMS_SECRET).update(payloadB64).digest("base64url")}`;
}
function verifySignedToken(token) {
	if (!token || typeof token !== "string") return { valid: false };
	const parts = token.split(".");
	if (parts.length !== 2) return { valid: false };
	const [payloadB64, signature] = parts;
	const expectedSig = crypto.createHmac("sha256", CMS_SECRET).update(payloadB64).digest("base64url");
	try {
		if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) return { valid: false };
		const payloadStr = Buffer.from(payloadB64, "base64url").toString("utf-8");
		const payload = JSON.parse(payloadStr);
		if (Date.now() > payload.expiresAt) return { valid: false };
		return {
			valid: true,
			user: {
				id: payload.userId,
				email: payload.email,
				name: payload.name,
				role: payload.role
			},
			expiresAt: payload.expiresAt
		};
	} catch {
		return { valid: false };
	}
}
var loginCmsFn_createServerFn_handler = createServerRpc({
	id: "e7fa160ff3d08412930de6a314a4c0fb3318f4bf61686cebc7ed1231d19a71fb",
	name: "loginCmsFn",
	filename: "src/cms/api.ts"
}, (opts) => loginCmsFn.__executeServer(opts));
var loginCmsFn = createServerFn({ method: "POST" }).validator((data) => data).handler(loginCmsFn_createServerFn_handler, async ({ data }) => {
	const { email, password } = data;
	if (!email || !password) return {
		success: false,
		error: "Email and password are required."
	};
	const userRecord = findUserByEmail(email);
	if (!userRecord) return {
		success: false,
		error: "Invalid email or password."
	};
	if (!await verifyPassword(password, userRecord.passwordHash)) return {
		success: false,
		error: "Invalid email or password."
	};
	const db = getCmsDb();
	const dbUser = db.users.find((u) => u.id === userRecord.id);
	if (dbUser) {
		dbUser.lastLoginAt = (/* @__PURE__ */ new Date()).toISOString();
		saveCmsDb(db);
	}
	const safeUser = sanitizeUser(userRecord);
	const token = createSignedToken(safeUser);
	logActivity("admin_logged_in", `Administrator signed into CMS dashboard`, safeUser, "auth", safeUser.id);
	return {
		success: true,
		user: safeUser,
		token
	};
});
var getCmsSessionFn_createServerFn_handler = createServerRpc({
	id: "5475a5eb2180554fd282592cda8268a4854d8dc6534b2a2b95d090767a0b8235",
	name: "getCmsSessionFn",
	filename: "src/cms/api.ts"
}, (opts) => getCmsSessionFn.__executeServer(opts));
var getCmsSessionFn = createServerFn({ method: "POST" }).validator((data) => data).handler(getCmsSessionFn_createServerFn_handler, async ({ data }) => {
	const result = verifySignedToken(data.token);
	if (!result.valid) return {
		authenticated: false,
		user: null
	};
	const userRecord = findUserById(result.user.id);
	if (!userRecord) return {
		authenticated: false,
		user: null
	};
	return {
		authenticated: true,
		user: sanitizeUser(userRecord)
	};
});
var getDashboardOverviewFn_createServerFn_handler = createServerRpc({
	id: "5812131ecd9dbe0849f89e52d015bbc84c1124ca52e75d39e1dddbcc2ee7222b",
	name: "getDashboardOverviewFn",
	filename: "src/cms/api.ts"
}, (opts) => getDashboardOverviewFn.__executeServer(opts));
var getDashboardOverviewFn = createServerFn({ method: "POST" }).validator((data) => data).handler(getDashboardOverviewFn_createServerFn_handler, async ({ data }) => {
	if (!verifySignedToken(data.token).valid) throw new Error("Unauthorized access to CMS Dashboard");
	const db = getCmsDb();
	const activeProducts = db.products.filter((p) => p.published).length;
	const totalFaqs = db.faqs.filter((f) => f.status === "published").length;
	const totalTestimonials = db.testimonials.filter((t) => t.status === "published").length;
	const mediaCount = db.media.length;
	const publishedPagesCount = 8;
	const activeAnnouncements = db.announcements.filter((a) => a.enabled).length;
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
			websiteStatus: "Operational"
		},
		settings: db.settings,
		links: db.links,
		recentActivities: (db.activities || []).slice(0, 8)
	};
});
var getCmsSettingsFn_createServerFn_handler = createServerRpc({
	id: "7b554e1e0728d4b66b29518ecdad0c2288348ece9eaec122036f13d440c4dd62",
	name: "getCmsSettingsFn",
	filename: "src/cms/api.ts"
}, (opts) => getCmsSettingsFn.__executeServer(opts));
var getCmsSettingsFn = createServerFn({ method: "POST" }).validator((data) => data).handler(getCmsSettingsFn_createServerFn_handler, async ({ data }) => {
	if (!verifySignedToken(data.token).valid) throw new Error("Unauthorized");
	const db = getCmsDb();
	return {
		settings: db.settings,
		links: db.links,
		social: db.social
	};
});
var updateGeneralSettingsFn_createServerFn_handler = createServerRpc({
	id: "5320d17f90587982d6412d465e8e5d2c44e9dd55b8327de4754d0ac4563a77e9",
	name: "updateGeneralSettingsFn",
	filename: "src/cms/api.ts"
}, (opts) => updateGeneralSettingsFn.__executeServer(opts));
var updateGeneralSettingsFn = createServerFn({ method: "POST" }).validator((data) => data).handler(updateGeneralSettingsFn_createServerFn_handler, async ({ data }) => {
	const auth = verifySignedToken(data.token);
	if (!auth.valid) throw new Error("Unauthorized");
	if (auth.user.role !== "Super Admin") throw new Error("Only Super Admins can modify global site settings.");
	return {
		success: true,
		settings: updateSiteSettings(data.settings, auth.user)
	};
});
var updateApplicationLinksFn_createServerFn_handler = createServerRpc({
	id: "ebcd51adf54d90924e50e305a1594bc9b7581fde4eae7b37250551ac646e3a34",
	name: "updateApplicationLinksFn",
	filename: "src/cms/api.ts"
}, (opts) => updateApplicationLinksFn.__executeServer(opts));
var updateApplicationLinksFn = createServerFn({ method: "POST" }).validator((data) => data).handler(updateApplicationLinksFn_createServerFn_handler, async ({ data }) => {
	const auth = verifySignedToken(data.token);
	if (!auth.valid) throw new Error("Unauthorized");
	if (auth.user.role !== "Super Admin") throw new Error("Only Super Admins can modify Application URLs.");
	return {
		success: true,
		links: updateApplicationLinks(data.links, auth.user)
	};
});
var updateSocialSettingsFn_createServerFn_handler = createServerRpc({
	id: "b2bcf481f59891dbd7b8e48eed678bde6e753984294684b8dfdb037a04a0cdb5",
	name: "updateSocialSettingsFn",
	filename: "src/cms/api.ts"
}, (opts) => updateSocialSettingsFn.__executeServer(opts));
var updateSocialSettingsFn = createServerFn({ method: "POST" }).validator((data) => data).handler(updateSocialSettingsFn_createServerFn_handler, async ({ data }) => {
	const auth = verifySignedToken(data.token);
	if (!auth.valid) throw new Error("Unauthorized");
	return {
		success: true,
		social: updateSocialSettings(data.social, auth.user)
	};
});
var getAdminUsersFn_createServerFn_handler = createServerRpc({
	id: "4f38ec5edc388241db6444c40389e208adc005c2b4acdb2c36c429bbe403c39d",
	name: "getAdminUsersFn",
	filename: "src/cms/api.ts"
}, (opts) => getAdminUsersFn.__executeServer(opts));
var getAdminUsersFn = createServerFn({ method: "POST" }).validator((data) => data).handler(getAdminUsersFn_createServerFn_handler, async ({ data }) => {
	const auth = verifySignedToken(data.token);
	if (!auth.valid) throw new Error("Unauthorized");
	return {
		users: getCmsUsers(),
		currentUserRole: auth.user.role
	};
});
var createAdminUserFn_createServerFn_handler = createServerRpc({
	id: "332d3eab4085eea5cf14d6276a619b9f8d765d4fdda5fddfd09b922425ee08d3",
	name: "createAdminUserFn",
	filename: "src/cms/api.ts"
}, (opts) => createAdminUserFn.__executeServer(opts));
var createAdminUserFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createAdminUserFn_createServerFn_handler, async ({ data }) => {
	const auth = verifySignedToken(data.token);
	if (!auth.valid || auth.user.role !== "Super Admin") throw new Error("Super Admin permissions required to create admin accounts.");
	const cleanEmail = data.email.trim().toLowerCase();
	if (!cleanEmail || !data.password || !data.name) return {
		success: false,
		error: "Name, email, and password are required."
	};
	if (data.password.length < 8) return {
		success: false,
		error: "Password must be at least 8 characters long."
	};
	if (findUserByEmail(cleanEmail)) return {
		success: false,
		error: "An administrator with this email already exists."
	};
	const db = getCmsDb();
	const passwordHash = await hashPassword(data.password);
	const newUser = {
		id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
		name: data.name.trim(),
		email: cleanEmail,
		role: data.role || "Editor",
		passwordHash,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	db.users.push(newUser);
	saveCmsDb(db);
	logActivity("admin_added", `Created new ${newUser.role} user: ${newUser.name} (${newUser.email})`, auth.user, "users", newUser.id);
	return {
		success: true,
		user: sanitizeUser(newUser)
	};
});
var deleteAdminUserFn_createServerFn_handler = createServerRpc({
	id: "5767259dff2722431dc82c75987c9e55f09ca5255abfe62f8c0305d7311ddfb6",
	name: "deleteAdminUserFn",
	filename: "src/cms/api.ts"
}, (opts) => deleteAdminUserFn.__executeServer(opts));
var deleteAdminUserFn = createServerFn({ method: "POST" }).validator((data) => data).handler(deleteAdminUserFn_createServerFn_handler, async ({ data }) => {
	const auth = verifySignedToken(data.token);
	if (!auth.valid || auth.user.role !== "Super Admin") throw new Error("Super Admin permissions required.");
	if (auth.user.id === data.userId) return {
		success: false,
		error: "You cannot delete your own admin account."
	};
	const db = getCmsDb();
	const target = db.users.find((u) => u.id === data.userId);
	if (!target) return {
		success: false,
		error: "Administrator user not found."
	};
	const superAdmins = db.users.filter((u) => u.role === "Super Admin");
	if (target.role === "Super Admin" && superAdmins.length <= 1) return {
		success: false,
		error: "Cannot delete the last Super Admin in the system."
	};
	db.users = db.users.filter((u) => u.id !== data.userId);
	saveCmsDb(db);
	logActivity("admin_role_changed", `Deleted admin user: ${target.name} (${target.email})`, auth.user, "users", target.id);
	return { success: true };
});
var getActivityLogFn_createServerFn_handler = createServerRpc({
	id: "a2cc8d82ec0c9be054d07ebbe67ccb9a7ceba49f1147a3da803d8790494f5709",
	name: "getActivityLogFn",
	filename: "src/cms/api.ts"
}, (opts) => getActivityLogFn.__executeServer(opts));
var getActivityLogFn = createServerFn({ method: "POST" }).validator((data) => data).handler(getActivityLogFn_createServerFn_handler, async ({ data }) => {
	if (!verifySignedToken(data.token).valid) throw new Error("Unauthorized");
	return { activities: getCmsDb().activities || [] };
});
var getHeroContentFn_createServerFn_handler = createServerRpc({
	id: "6a0f744ca7f4177a5af720885f6c8a74db65e9f63fc12017e1dce6e5a7e90744",
	name: "getHeroContentFn",
	filename: "src/cms/api.ts"
}, (opts) => getHeroContentFn.__executeServer(opts));
var getHeroContentFn = createServerFn({ method: "POST" }).validator((data) => data).handler(getHeroContentFn_createServerFn_handler, async ({ data }) => {
	if (!verifySignedToken(data.token).valid) throw new Error("Unauthorized");
	return { hero: getCmsDb().hero };
});
var saveHeroDraftFn_createServerFn_handler = createServerRpc({
	id: "58544f0f060a79caa1e23ddceb7ddfd3ce8bd68d251255b6cd24eb6f87df39b3",
	name: "saveHeroDraftFn",
	filename: "src/cms/api.ts"
}, (opts) => saveHeroDraftFn.__executeServer(opts));
var saveHeroDraftFn = createServerFn({ method: "POST" }).validator((data) => data).handler(saveHeroDraftFn_createServerFn_handler, async ({ data }) => {
	const auth = verifySignedToken(data.token);
	if (!auth.valid) throw new Error("Unauthorized");
	const db = getCmsDb();
	db.hero.draft = {
		...db.hero.draft,
		...data.draft,
		status: "draft",
		updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
		updatedBy: auth.user.name || auth.user.email
	};
	saveCmsDb(db);
	logActivity("content_updated", "Saved draft modifications for Hero Section", auth.user, "hero");
	return {
		success: true,
		hero: db.hero
	};
});
var publishHeroContentFn_createServerFn_handler = createServerRpc({
	id: "2e741dd695f492e05ceb3c2c8b744cdd02e242c8712c38d40961236be6e96ec8",
	name: "publishHeroContentFn",
	filename: "src/cms/api.ts"
}, (opts) => publishHeroContentFn.__executeServer(opts));
var publishHeroContentFn = createServerFn({ method: "POST" }).validator((data) => data).handler(publishHeroContentFn_createServerFn_handler, async ({ data }) => {
	const auth = verifySignedToken(data.token);
	if (!auth.valid) throw new Error("Unauthorized");
	const db = getCmsDb();
	db.hero.published = {
		...db.hero.draft,
		status: "published",
		updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
		updatedBy: auth.user.name || auth.user.email
	};
	db.hero.draft = { ...db.hero.published };
	saveCmsDb(db);
	logActivity("content_published", "Published Hero Section changes to live website", auth.user, "hero");
	return {
		success: true,
		hero: db.hero
	};
});
var getProductsFn_createServerFn_handler = createServerRpc({
	id: "4eedf9ba9a53b4d7d19bcbbf124021d1c19931b93ab776ace2a9c7d4dc7060eb",
	name: "getProductsFn",
	filename: "src/cms/api.ts"
}, (opts) => getProductsFn.__executeServer(opts));
var getProductsFn = createServerFn({ method: "POST" }).validator((data) => data).handler(getProductsFn_createServerFn_handler, async ({ data }) => {
	if (!verifySignedToken(data.token).valid) throw new Error("Unauthorized");
	return { products: getCmsDb().products };
});
var saveProductsFn_createServerFn_handler = createServerRpc({
	id: "4f05aa94c74c60ed519ef51ec161f118c9e8f5945dce4980724586aa80c5159e",
	name: "saveProductsFn",
	filename: "src/cms/api.ts"
}, (opts) => saveProductsFn.__executeServer(opts));
var saveProductsFn = createServerFn({ method: "POST" }).validator((data) => data).handler(saveProductsFn_createServerFn_handler, async ({ data }) => {
	const auth = verifySignedToken(data.token);
	if (!auth.valid) throw new Error("Unauthorized");
	const db = getCmsDb();
	db.products = data.products;
	saveCmsDb(db);
	logActivity("content_updated", `Updated products list (${data.products.length} products)`, auth.user, "products");
	return {
		success: true,
		products: db.products
	};
});
var getFaqsFn_createServerFn_handler = createServerRpc({
	id: "a2d40e7586c69dc680fec3529d8813b96f05d889f8ad333449a5e7cc7f7dc86c",
	name: "getFaqsFn",
	filename: "src/cms/api.ts"
}, (opts) => getFaqsFn.__executeServer(opts));
var getFaqsFn = createServerFn({ method: "POST" }).validator((data) => data).handler(getFaqsFn_createServerFn_handler, async ({ data }) => {
	if (!verifySignedToken(data.token).valid) throw new Error("Unauthorized");
	return { faqs: getCmsDb().faqs };
});
var saveFaqsFn_createServerFn_handler = createServerRpc({
	id: "f175152d5c3cac5d55e6138f78e680e53507c16bc15e24cb8dd757dcb83dd006",
	name: "saveFaqsFn",
	filename: "src/cms/api.ts"
}, (opts) => saveFaqsFn.__executeServer(opts));
var saveFaqsFn = createServerFn({ method: "POST" }).validator((data) => data).handler(saveFaqsFn_createServerFn_handler, async ({ data }) => {
	const auth = verifySignedToken(data.token);
	if (!auth.valid) throw new Error("Unauthorized");
	const db = getCmsDb();
	db.faqs = data.faqs;
	saveCmsDb(db);
	logActivity("faq_updated", `Saved FAQs list (${data.faqs.length} items)`, auth.user, "faqs");
	return {
		success: true,
		faqs: db.faqs
	};
});
var getTestimonialsFn_createServerFn_handler = createServerRpc({
	id: "6db9d20fa87bf315831e7d6ba03577184919424f39f138808333251faaf1e0d0",
	name: "getTestimonialsFn",
	filename: "src/cms/api.ts"
}, (opts) => getTestimonialsFn.__executeServer(opts));
var getTestimonialsFn = createServerFn({ method: "POST" }).validator((data) => data).handler(getTestimonialsFn_createServerFn_handler, async ({ data }) => {
	if (!verifySignedToken(data.token).valid) throw new Error("Unauthorized");
	return { testimonials: getCmsDb().testimonials };
});
var saveTestimonialsFn_createServerFn_handler = createServerRpc({
	id: "2972081ef20e2528e162996b87709e5bcdf0514b996e245d48d5c7ecd0e8d6b8",
	name: "saveTestimonialsFn",
	filename: "src/cms/api.ts"
}, (opts) => saveTestimonialsFn.__executeServer(opts));
var saveTestimonialsFn = createServerFn({ method: "POST" }).validator((data) => data).handler(saveTestimonialsFn_createServerFn_handler, async ({ data }) => {
	const auth = verifySignedToken(data.token);
	if (!auth.valid) throw new Error("Unauthorized");
	const db = getCmsDb();
	db.testimonials = data.testimonials;
	saveCmsDb(db);
	logActivity("content_updated", `Updated testimonials (${data.testimonials.length} reviews)`, auth.user, "testimonials");
	return {
		success: true,
		testimonials: db.testimonials
	};
});
var getBusinessTypesFn_createServerFn_handler = createServerRpc({
	id: "d9e9e58594192eae6e703e7a0015e8d8545f450e0f857e1f7671c86173858f45",
	name: "getBusinessTypesFn",
	filename: "src/cms/api.ts"
}, (opts) => getBusinessTypesFn.__executeServer(opts));
var getBusinessTypesFn = createServerFn({ method: "POST" }).validator((data) => data).handler(getBusinessTypesFn_createServerFn_handler, async ({ data }) => {
	if (!verifySignedToken(data.token).valid) throw new Error("Unauthorized");
	return { businessTypes: getCmsDb().businessTypes };
});
var saveBusinessTypesFn_createServerFn_handler = createServerRpc({
	id: "d840dbecef3d006ffb0ae8ebcc54162eaabd1e566ba900bbbc7b9f281e7225b3",
	name: "saveBusinessTypesFn",
	filename: "src/cms/api.ts"
}, (opts) => saveBusinessTypesFn.__executeServer(opts));
var saveBusinessTypesFn = createServerFn({ method: "POST" }).validator((data) => data).handler(saveBusinessTypesFn_createServerFn_handler, async ({ data }) => {
	const auth = verifySignedToken(data.token);
	if (!auth.valid) throw new Error("Unauthorized");
	const db = getCmsDb();
	db.businessTypes = data.businessTypes;
	saveCmsDb(db);
	logActivity("content_updated", "Updated target business types on home page", auth.user, "business");
	return {
		success: true,
		businessTypes: db.businessTypes
	};
});
var getNavigationFn_createServerFn_handler = createServerRpc({
	id: "6d63964aa60b41c14dc781b2b20db5e452b921e53bdb8ff9dcb7d4574a050c83",
	name: "getNavigationFn",
	filename: "src/cms/api.ts"
}, (opts) => getNavigationFn.__executeServer(opts));
var getNavigationFn = createServerFn({ method: "POST" }).validator((data) => data).handler(getNavigationFn_createServerFn_handler, async ({ data }) => {
	if (!verifySignedToken(data.token).valid) throw new Error("Unauthorized");
	return { navigation: getCmsDb().navigation };
});
var saveNavigationFn_createServerFn_handler = createServerRpc({
	id: "e0d3f7302c6cb958baef56821299fb908988fa2092959cc34fd2aa8347b81ae9",
	name: "saveNavigationFn",
	filename: "src/cms/api.ts"
}, (opts) => saveNavigationFn.__executeServer(opts));
var saveNavigationFn = createServerFn({ method: "POST" }).validator((data) => data).handler(saveNavigationFn_createServerFn_handler, async ({ data }) => {
	const auth = verifySignedToken(data.token);
	if (!auth.valid || auth.user.role !== "Super Admin") throw new Error("Super Admin permissions required to modify navigation.");
	const db = getCmsDb();
	db.navigation = data.navigation;
	saveCmsDb(db);
	logActivity("settings_updated", "Updated website navigation menu items", auth.user, "navigation");
	return {
		success: true,
		navigation: db.navigation
	};
});
var getAnnouncementsFn_createServerFn_handler = createServerRpc({
	id: "199b2939571c90e625a29d2647444bcde6249d234f87752cb0ed51d75ac3e9b0",
	name: "getAnnouncementsFn",
	filename: "src/cms/api.ts"
}, (opts) => getAnnouncementsFn.__executeServer(opts));
var getAnnouncementsFn = createServerFn({ method: "POST" }).validator((data) => data).handler(getAnnouncementsFn_createServerFn_handler, async ({ data }) => {
	if (!verifySignedToken(data.token).valid) throw new Error("Unauthorized");
	return { announcements: getCmsDb().announcements };
});
var saveAnnouncementsFn_createServerFn_handler = createServerRpc({
	id: "70767e4c6029bdbf1f009157e5067ba4b0b42e9be56352d38e976343d43add96",
	name: "saveAnnouncementsFn",
	filename: "src/cms/api.ts"
}, (opts) => saveAnnouncementsFn.__executeServer(opts));
var saveAnnouncementsFn = createServerFn({ method: "POST" }).validator((data) => data).handler(saveAnnouncementsFn_createServerFn_handler, async ({ data }) => {
	const auth = verifySignedToken(data.token);
	if (!auth.valid) throw new Error("Unauthorized");
	const db = getCmsDb();
	db.announcements = data.announcements;
	saveCmsDb(db);
	logActivity("announcement_updated", "Updated top marketing announcement banner", auth.user, "announcements");
	return {
		success: true,
		announcements: db.announcements
	};
});
var getMediaFn_createServerFn_handler = createServerRpc({
	id: "2af562f34b509d68ac46758f4894c25613ca9990364e906e4ab02cc839fc79b5",
	name: "getMediaFn",
	filename: "src/cms/api.ts"
}, (opts) => getMediaFn.__executeServer(opts));
var getMediaFn = createServerFn({ method: "POST" }).validator((data) => data).handler(getMediaFn_createServerFn_handler, async ({ data }) => {
	if (!verifySignedToken(data.token).valid) throw new Error("Unauthorized");
	let media = getCmsDb().media || [];
	if (data.category && data.category !== "All") media = media.filter((m) => m.category === data.category);
	return { media };
});
var uploadMediaFn_createServerFn_handler = createServerRpc({
	id: "c4a34fec0cbf72e0f10b8ddaab64a68a793f9d42944b45bc29a944b8b4b88b5d",
	name: "uploadMediaFn",
	filename: "src/cms/api.ts"
}, (opts) => uploadMediaFn.__executeServer(opts));
var uploadMediaFn = createServerFn({ method: "POST" }).validator((data) => data).handler(uploadMediaFn_createServerFn_handler, async ({ data }) => {
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
		category: data.category || "general",
		altText: data.altText || data.filename,
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		uploadedBy: auth.user.name || auth.user.email
	};
	db.media = [newAsset, ...db.media || []];
	saveCmsDb(db);
	logActivity("content_created", `Uploaded media asset: ${newAsset.filename} (${newAsset.category})`, auth.user, "media", newAsset.id);
	return {
		success: true,
		asset: newAsset
	};
});
var updateMediaAssetFn_createServerFn_handler = createServerRpc({
	id: "4b899dfa574de4423bed984210bc5e69036a722d1f3ba196cf46cc23f4b614d8",
	name: "updateMediaAssetFn",
	filename: "src/cms/api.ts"
}, (opts) => updateMediaAssetFn.__executeServer(opts));
var updateMediaAssetFn = createServerFn({ method: "POST" }).validator((data) => data).handler(updateMediaAssetFn_createServerFn_handler, async ({ data }) => {
	const auth = verifySignedToken(data.token);
	if (!auth.valid) throw new Error("Unauthorized");
	const db = getCmsDb();
	const asset = (db.media || []).find((m) => m.id === data.id);
	if (!asset) return {
		success: false,
		error: "Asset not found"
	};
	if (data.altText !== void 0) asset.altText = data.altText;
	if (data.category !== void 0) asset.category = data.category;
	if (data.filename !== void 0) asset.filename = data.filename;
	saveCmsDb(db);
	logActivity("content_updated", `Updated media metadata for ${asset.filename}`, auth.user, "media", asset.id);
	return {
		success: true,
		asset
	};
});
var deleteMediaAssetFn_createServerFn_handler = createServerRpc({
	id: "d1afabb44024404484e74ca72c606bc9878e37931aa640fe8e0f45e96fe9c56c",
	name: "deleteMediaAssetFn",
	filename: "src/cms/api.ts"
}, (opts) => deleteMediaAssetFn.__executeServer(opts));
var deleteMediaAssetFn = createServerFn({ method: "POST" }).validator((data) => data).handler(deleteMediaAssetFn_createServerFn_handler, async ({ data }) => {
	const auth = verifySignedToken(data.token);
	if (!auth.valid) throw new Error("Unauthorized");
	const db = getCmsDb();
	const target = (db.media || []).find((m) => m.id === data.id);
	db.media = (db.media || []).filter((m) => m.id !== data.id);
	saveCmsDb(db);
	if (target) logActivity("content_updated", `Deleted media asset ${target.filename}`, auth.user, "media", target.id);
	return { success: true };
});
var updateBrandVisualsFn_createServerFn_handler = createServerRpc({
	id: "f09a44d58559c789fc8022f16c49b7047c19ed62795fe5469e1938f313090879",
	name: "updateBrandVisualsFn",
	filename: "src/cms/api.ts"
}, (opts) => updateBrandVisualsFn.__executeServer(opts));
var updateBrandVisualsFn = createServerFn({ method: "POST" }).validator((data) => data).handler(updateBrandVisualsFn_createServerFn_handler, async ({ data }) => {
	const auth = verifySignedToken(data.token);
	if (!auth.valid) throw new Error("Unauthorized");
	if (auth.user.role !== "Super Admin") throw new Error("Super Admin permissions required to modify Brand Logos and Visual Identity.");
	const db = getCmsDb();
	db.settings = {
		...db.settings,
		logoType: data.logoType !== void 0 ? data.logoType : db.settings.logoType,
		logoUrl: data.logoUrl !== void 0 ? data.logoUrl : db.settings.logoUrl,
		logoDarkUrl: data.logoDarkUrl !== void 0 ? data.logoDarkUrl : db.settings.logoDarkUrl,
		logoHeightPx: data.logoHeightPx !== void 0 ? data.logoHeightPx : db.settings.logoHeightPx,
		brandSymbol: data.brandSymbol !== void 0 ? data.brandSymbol : db.settings.brandSymbol,
		brandSymbolBg: data.brandSymbolBg !== void 0 ? data.brandSymbolBg : db.settings.brandSymbolBg,
		faviconUrl: data.faviconUrl !== void 0 ? data.faviconUrl : db.settings.faviconUrl,
		appIconUrl: data.appIconUrl !== void 0 ? data.appIconUrl : db.settings.appIconUrl,
		defaultOgImageUrl: data.defaultOgImageUrl !== void 0 ? data.defaultOgImageUrl : db.settings.defaultOgImageUrl,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
		updatedBy: auth.user.name || auth.user.email
	};
	saveCmsDb(db);
	logActivity("settings_updated", "Updated brand logos, favicon, and visual identity configurations", auth.user, "branding");
	return {
		success: true,
		settings: db.settings
	};
});
var getSeoFn_createServerFn_handler = createServerRpc({
	id: "9b286f8c5cf0e33e9b9752f5b92ac29f310947ce7d2b9dd49c6170393dab0ade",
	name: "getSeoFn",
	filename: "src/cms/api.ts"
}, (opts) => getSeoFn.__executeServer(opts));
var getSeoFn = createServerFn({ method: "POST" }).validator((data) => data).handler(getSeoFn_createServerFn_handler, async ({ data }) => {
	if (!verifySignedToken(data.token).valid) throw new Error("Unauthorized");
	return { seo: getCmsDb().seo };
});
var saveSeoFn_createServerFn_handler = createServerRpc({
	id: "5aa0081fbbe699711f2d57b962d196d0b597120234834a8e6a1732160082d8dd",
	name: "saveSeoFn",
	filename: "src/cms/api.ts"
}, (opts) => saveSeoFn.__executeServer(opts));
var saveSeoFn = createServerFn({ method: "POST" }).validator((data) => data).handler(saveSeoFn_createServerFn_handler, async ({ data }) => {
	const auth = verifySignedToken(data.token);
	if (!auth.valid) throw new Error("Unauthorized");
	const db = getCmsDb();
	db.seo[data.pageSlug] = {
		...db.seo[data.pageSlug],
		...data.seo,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
		updatedBy: auth.user.name || auth.user.email
	};
	saveCmsDb(db);
	logActivity("content_updated", `Updated SEO metadata for page (${data.pageSlug})`, auth.user, "seo");
	return {
		success: true,
		seo: db.seo
	};
});
var getContentSectionsFn_createServerFn_handler = createServerRpc({
	id: "330368aec0eb88854442c72cf9b6a1a19941ca92f79d6e74e6692cbe72f66f98",
	name: "getContentSectionsFn",
	filename: "src/cms/api.ts"
}, (opts) => getContentSectionsFn.__executeServer(opts));
var getContentSectionsFn = createServerFn({ method: "POST" }).validator((data) => data).handler(getContentSectionsFn_createServerFn_handler, async ({ data }) => {
	if (!verifySignedToken(data.token).valid) throw new Error("Unauthorized");
	const db = getCmsDb();
	return {
		storeSection: db.storeSection,
		walletSection: db.walletSection,
		dashboardSection: db.dashboardSection,
		securitySection: db.securitySection,
		cardsSection: db.cardsSection,
		trustStrip: db.trustStrip,
		howItWorks: db.howItWorks
	};
});
var saveContentSectionsFn_createServerFn_handler = createServerRpc({
	id: "6222b31e5436a744aec9bd0df724b76294f90448d936fb5d7d0ca836b7ac8db7",
	name: "saveContentSectionsFn",
	filename: "src/cms/api.ts"
}, (opts) => saveContentSectionsFn.__executeServer(opts));
var saveContentSectionsFn = createServerFn({ method: "POST" }).validator((data) => data).handler(saveContentSectionsFn_createServerFn_handler, async ({ data }) => {
	const auth = verifySignedToken(data.token);
	if (!auth.valid) throw new Error("Unauthorized");
	const db = getCmsDb();
	db[data.sectionKey] = data.content;
	saveCmsDb(db);
	logActivity("content_updated", `Updated ${data.sectionKey} content`, auth.user, "content");
	return {
		success: true,
		[data.sectionKey]: db[data.sectionKey]
	};
});
var getSeoHealthReportFn_createServerFn_handler = createServerRpc({
	id: "92fd025702abf56dd3f014421ddf9ef1c6c3a80d44279075086e856b53c9e7d8",
	name: "getSeoHealthReportFn",
	filename: "src/cms/api.ts"
}, (opts) => getSeoHealthReportFn.__executeServer(opts));
var getSeoHealthReportFn = createServerFn({ method: "POST" }).validator((data) => data).handler(getSeoHealthReportFn_createServerFn_handler, async ({ data }) => {
	if (!verifySignedToken(data.token).valid) throw new Error("Unauthorized");
	const db = getCmsDb();
	return { report: auditSeoHealth(db) };
});
var getRedirectsFn_createServerFn_handler = createServerRpc({
	id: "3b8c906e60c9526072f0192fea7dfea22dafb3495114da5be7fadf6933bba965",
	name: "getRedirectsFn",
	filename: "src/cms/api.ts"
}, (opts) => getRedirectsFn.__executeServer(opts));
var getRedirectsFn = createServerFn({ method: "POST" }).validator((data) => data).handler(getRedirectsFn_createServerFn_handler, async ({ data }) => {
	if (!verifySignedToken(data.token).valid) throw new Error("Unauthorized");
	return { redirects: getCmsDb().redirects || [] };
});
var saveRedirectFn_createServerFn_handler = createServerRpc({
	id: "6ce94866ab06c832a1a3f588dda0e317f81932a8211d26448ff8151d377fbab1",
	name: "saveRedirectFn",
	filename: "src/cms/api.ts"
}, (opts) => saveRedirectFn.__executeServer(opts));
var saveRedirectFn = createServerFn({ method: "POST" }).validator((data) => data).handler(saveRedirectFn_createServerFn_handler, async ({ data }) => {
	const auth = verifySignedToken(data.token);
	if (!auth.valid) throw new Error("Unauthorized");
	const db = getCmsDb();
	db.redirects = db.redirects || [];
	const existingIndex = data.redirect.id ? db.redirects.findIndex((r) => r.id === data.redirect.id) : -1;
	let rule;
	if (existingIndex >= 0) {
		rule = {
			...db.redirects[existingIndex],
			sourcePath: data.redirect.sourcePath,
			targetPath: data.redirect.targetPath,
			statusCode: data.redirect.statusCode || 301,
			enabled: data.redirect.enabled,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		db.redirects[existingIndex] = rule;
	} else {
		rule = {
			id: `red_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
			sourcePath: data.redirect.sourcePath,
			targetPath: data.redirect.targetPath,
			statusCode: data.redirect.statusCode || 301,
			enabled: data.redirect.enabled ?? true,
			hitCount: 0,
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		db.redirects.unshift(rule);
	}
	saveCmsDb(db);
	logActivity("content_updated", `Configured redirect rule: ${rule.sourcePath} → ${rule.targetPath} (${rule.statusCode})`, auth.user, "redirect", rule.id);
	return {
		success: true,
		redirects: db.redirects,
		rule
	};
});
var deleteRedirectFn_createServerFn_handler = createServerRpc({
	id: "a827927c4ea48da48091dc4230116eb86684cbffcac322e1941b48e1a8d653b4",
	name: "deleteRedirectFn",
	filename: "src/cms/api.ts"
}, (opts) => deleteRedirectFn.__executeServer(opts));
var deleteRedirectFn = createServerFn({ method: "POST" }).validator((data) => data).handler(deleteRedirectFn_createServerFn_handler, async ({ data }) => {
	const auth = verifySignedToken(data.token);
	if (!auth.valid) throw new Error("Unauthorized");
	const db = getCmsDb();
	db.redirects = (db.redirects || []).filter((r) => r.id !== data.id);
	saveCmsDb(db);
	logActivity("content_updated", `Removed redirect rule ID ${data.id}`, auth.user, "redirect");
	return {
		success: true,
		redirects: db.redirects
	};
});
var getSearchConsoleFn_createServerFn_handler = createServerRpc({
	id: "4f154c98b970f230bf41455a98fd69b549fa5fb2f420c6f1a0a7d23c4aaafa65",
	name: "getSearchConsoleFn",
	filename: "src/cms/api.ts"
}, (opts) => getSearchConsoleFn.__executeServer(opts));
var getSearchConsoleFn = createServerFn({ method: "POST" }).validator((data) => data).handler(getSearchConsoleFn_createServerFn_handler, async ({ data }) => {
	if (!verifySignedToken(data.token).valid) throw new Error("Unauthorized");
	return { searchConsole: getCmsDb().searchConsole || {} };
});
var saveSearchConsoleFn_createServerFn_handler = createServerRpc({
	id: "e091b4b226cae4561ec9f83f4c867fbfb2e8cae3157c208993207256a2736c0d",
	name: "saveSearchConsoleFn",
	filename: "src/cms/api.ts"
}, (opts) => saveSearchConsoleFn.__executeServer(opts));
var saveSearchConsoleFn = createServerFn({ method: "POST" }).validator((data) => data).handler(saveSearchConsoleFn_createServerFn_handler, async ({ data }) => {
	const auth = verifySignedToken(data.token);
	if (!auth.valid) throw new Error("Unauthorized");
	const db = getCmsDb();
	db.searchConsole = {
		...db.searchConsole || {},
		...data.searchConsole,
		lastVerifiedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	saveCmsDb(db);
	logActivity("settings_updated", "Updated Search Console verification & settings", auth.user, "seo");
	return {
		success: true,
		searchConsole: db.searchConsole
	};
});
var getBlogDataFn_createServerFn_handler = createServerRpc({
	id: "9b73ec3f2b9d950ad2d7e0fdc278c89e2b37968d931e06206819ab19305438b2",
	name: "getBlogDataFn",
	filename: "src/cms/api.ts"
}, (opts) => getBlogDataFn.__executeServer(opts));
var getBlogDataFn = createServerFn({ method: "POST" }).validator((data) => data).handler(getBlogDataFn_createServerFn_handler, async ({ data }) => {
	if (!verifySignedToken(data.token).valid) throw new Error("Unauthorized");
	const db = getCmsDb();
	return {
		posts: db.blogPosts || [],
		categories: db.blogCategories || [],
		authors: db.blogAuthors || []
	};
});
var saveBlogPostFn_createServerFn_handler = createServerRpc({
	id: "4600a99dd9a9d6df9c879930cee6be39f13e8a5f6ffb5227ab20097f88beadb8",
	name: "saveBlogPostFn",
	filename: "src/cms/api.ts"
}, (opts) => saveBlogPostFn.__executeServer(opts));
var saveBlogPostFn = createServerFn({ method: "POST" }).validator((data) => data).handler(saveBlogPostFn_createServerFn_handler, async ({ data }) => {
	const auth = verifySignedToken(data.token);
	if (!auth.valid) throw new Error("Unauthorized");
	const db = getCmsDb();
	db.blogPosts = db.blogPosts || [];
	const existingIndex = data.post.id ? db.blogPosts.findIndex((p) => p.id === data.post.id) : -1;
	const baseSlug = data.post.slug?.trim() || data.post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
	const category = (db.blogCategories || []).find((c) => c.id === data.post.categoryId);
	let savedPost;
	if (existingIndex >= 0) {
		savedPost = {
			...db.blogPosts[existingIndex],
			...data.post,
			slug: baseSlug,
			categoryName: category ? category.name : data.post.categoryName || "General",
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		db.blogPosts[existingIndex] = savedPost;
	} else {
		savedPost = {
			id: `post_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
			title: data.post.title,
			slug: baseSlug,
			excerpt: data.post.excerpt || data.post.title,
			content: data.post.content,
			featuredImageUrl: data.post.featuredImageUrl || "/hero-payroxa.jpg",
			featuredImageAlt: data.post.featuredImageAlt || data.post.title,
			authorId: data.post.authorId || "auth-1",
			authorName: data.post.authorName || auth.user.name || "Payroxa Team",
			authorRole: data.post.authorRole || "Editorial",
			categoryId: data.post.categoryId || "cat-1",
			categoryName: category ? category.name : "Payments & Invoicing",
			tags: data.post.tags || ["fintech", "Nigeria"],
			readTimeMinutes: data.post.readTimeMinutes || Math.max(2, Math.ceil(data.post.content.split(/\s+/).length / 200)),
			seoTitle: data.post.seoTitle || `${data.post.title} | Payroxa`,
			metaDescription: data.post.metaDescription || data.post.excerpt || data.post.title,
			canonicalUrl: data.post.canonicalUrl || `https://payroxa.com.ng/resources/${baseSlug}`,
			ogImageUrl: data.post.ogImageUrl || data.post.featuredImageUrl || "/hero-payroxa.jpg",
			status: data.post.status || "draft",
			publishedAt: data.post.publishedAt || (/* @__PURE__ */ new Date()).toISOString(),
			updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			featured: data.post.featured ?? false,
			relatedProduct: data.post.relatedProduct || "payments"
		};
		db.blogPosts.unshift(savedPost);
	}
	saveCmsDb(db);
	logActivity("content_updated", `Saved blog post: ${savedPost.title} (${savedPost.status})`, auth.user, "blog", savedPost.id);
	return {
		success: true,
		post: savedPost,
		posts: db.blogPosts
	};
});
var deleteBlogPostFn_createServerFn_handler = createServerRpc({
	id: "17359ca241eb2c87b5e5c610801c1d88b4af567b90cf1be495b340d1290c1a49",
	name: "deleteBlogPostFn",
	filename: "src/cms/api.ts"
}, (opts) => deleteBlogPostFn.__executeServer(opts));
var deleteBlogPostFn = createServerFn({ method: "POST" }).validator((data) => data).handler(deleteBlogPostFn_createServerFn_handler, async ({ data }) => {
	const auth = verifySignedToken(data.token);
	if (!auth.valid) throw new Error("Unauthorized");
	const db = getCmsDb();
	const target = (db.blogPosts || []).find((p) => p.id === data.id);
	db.blogPosts = (db.blogPosts || []).filter((p) => p.id !== data.id);
	saveCmsDb(db);
	logActivity("content_updated", `Deleted article ${target ? target.title : data.id}`, auth.user, "blog", data.id);
	return {
		success: true,
		posts: db.blogPosts
	};
});
var saveBlogCategoryFn_createServerFn_handler = createServerRpc({
	id: "4649bb5287de4a24f4176f600cf4df1eed7a943bed846f73932058293e4426c7",
	name: "saveBlogCategoryFn",
	filename: "src/cms/api.ts"
}, (opts) => saveBlogCategoryFn.__executeServer(opts));
var saveBlogCategoryFn = createServerFn({ method: "POST" }).validator((data) => data).handler(saveBlogCategoryFn_createServerFn_handler, async ({ data }) => {
	const auth = verifySignedToken(data.token);
	if (!auth.valid) throw new Error("Unauthorized");
	const db = getCmsDb();
	db.blogCategories = db.blogCategories || [];
	const index = db.blogCategories.findIndex((c) => c.id === data.category.id);
	if (index >= 0) db.blogCategories[index] = data.category;
	else db.blogCategories.push(data.category);
	saveCmsDb(db);
	logActivity("content_updated", `Saved blog category: ${data.category.name}`, auth.user, "blog_category");
	return {
		success: true,
		categories: db.blogCategories
	};
});
var deleteBlogCategoryFn_createServerFn_handler = createServerRpc({
	id: "724fc495cfbd3a7f66b2ad14643ebe457c84d09b172c85921984886a30398dc6",
	name: "deleteBlogCategoryFn",
	filename: "src/cms/api.ts"
}, (opts) => deleteBlogCategoryFn.__executeServer(opts));
var deleteBlogCategoryFn = createServerFn({ method: "POST" }).validator((data) => data).handler(deleteBlogCategoryFn_createServerFn_handler, async ({ data }) => {
	if (!verifySignedToken(data.token).valid) throw new Error("Unauthorized");
	const db = getCmsDb();
	db.blogCategories = (db.blogCategories || []).filter((c) => c.id !== data.id);
	saveCmsDb(db);
	return {
		success: true,
		categories: db.blogCategories
	};
});
var saveBlogAuthorFn_createServerFn_handler = createServerRpc({
	id: "a31c8b9e4d2acf54d4a1733d2a5386141e98b40565e060d9683d232d9f2dadf6",
	name: "saveBlogAuthorFn",
	filename: "src/cms/api.ts"
}, (opts) => saveBlogAuthorFn.__executeServer(opts));
var saveBlogAuthorFn = createServerFn({ method: "POST" }).validator((data) => data).handler(saveBlogAuthorFn_createServerFn_handler, async ({ data }) => {
	const auth = verifySignedToken(data.token);
	if (!auth.valid) throw new Error("Unauthorized");
	const db = getCmsDb();
	db.blogAuthors = db.blogAuthors || [];
	const index = db.blogAuthors.findIndex((a) => a.id === data.author.id);
	if (index >= 0) db.blogAuthors[index] = data.author;
	else db.blogAuthors.push(data.author);
	saveCmsDb(db);
	logActivity("content_updated", `Saved blog author: ${data.author.name}`, auth.user, "blog_author");
	return {
		success: true,
		authors: db.blogAuthors
	};
});
var deleteBlogAuthorFn_createServerFn_handler = createServerRpc({
	id: "3506034f112804af63e7583b894a593b3041b6a48cf3a0a5599745c9c6ebd7ef",
	name: "deleteBlogAuthorFn",
	filename: "src/cms/api.ts"
}, (opts) => deleteBlogAuthorFn.__executeServer(opts));
var deleteBlogAuthorFn = createServerFn({ method: "POST" }).validator((data) => data).handler(deleteBlogAuthorFn_createServerFn_handler, async ({ data }) => {
	if (!verifySignedToken(data.token).valid) throw new Error("Unauthorized");
	const db = getCmsDb();
	db.blogAuthors = (db.blogAuthors || []).filter((a) => a.id !== data.id);
	saveCmsDb(db);
	return {
		success: true,
		authors: db.blogAuthors
	};
});
var getPublicPublishedSiteDataFn_createServerFn_handler = createServerRpc({
	id: "f446dbd3ba8b4f64fdb1c1a42a5d3de105380db9742129fd0840dffc1d255b4d",
	name: "getPublicPublishedSiteDataFn",
	filename: "src/cms/api.ts"
}, (opts) => getPublicPublishedSiteDataFn.__executeServer(opts));
var getPublicPublishedSiteDataFn = createServerFn({ method: "GET" }).handler(getPublicPublishedSiteDataFn_createServerFn_handler, async () => {
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
			allSeo: db.seo,
			blogPosts: (db.blogPosts || []).filter((p) => p.status === "published"),
			blogCategories: db.blogCategories || [],
			blogAuthors: db.blogAuthors || [],
			searchConsole: db.searchConsole || {}
		};
	} catch (err) {
		console.error("Error fetching published CMS site data:", err);
		return null;
	}
});
//#endregion
export { createAdminUserFn_createServerFn_handler, deleteAdminUserFn_createServerFn_handler, deleteBlogAuthorFn_createServerFn_handler, deleteBlogCategoryFn_createServerFn_handler, deleteBlogPostFn_createServerFn_handler, deleteMediaAssetFn_createServerFn_handler, deleteRedirectFn_createServerFn_handler, getActivityLogFn_createServerFn_handler, getAdminUsersFn_createServerFn_handler, getAnnouncementsFn_createServerFn_handler, getBlogDataFn_createServerFn_handler, getBusinessTypesFn_createServerFn_handler, getCmsSessionFn_createServerFn_handler, getCmsSettingsFn_createServerFn_handler, getContentSectionsFn_createServerFn_handler, getDashboardOverviewFn_createServerFn_handler, getFaqsFn_createServerFn_handler, getHeroContentFn_createServerFn_handler, getMediaFn_createServerFn_handler, getNavigationFn_createServerFn_handler, getProductsFn_createServerFn_handler, getPublicPublishedSiteDataFn_createServerFn_handler, getRedirectsFn_createServerFn_handler, getSearchConsoleFn_createServerFn_handler, getSeoFn_createServerFn_handler, getSeoHealthReportFn_createServerFn_handler, getTestimonialsFn_createServerFn_handler, loginCmsFn_createServerFn_handler, publishHeroContentFn_createServerFn_handler, saveAnnouncementsFn_createServerFn_handler, saveBlogAuthorFn_createServerFn_handler, saveBlogCategoryFn_createServerFn_handler, saveBlogPostFn_createServerFn_handler, saveBusinessTypesFn_createServerFn_handler, saveContentSectionsFn_createServerFn_handler, saveFaqsFn_createServerFn_handler, saveHeroDraftFn_createServerFn_handler, saveNavigationFn_createServerFn_handler, saveProductsFn_createServerFn_handler, saveRedirectFn_createServerFn_handler, saveSearchConsoleFn_createServerFn_handler, saveSeoFn_createServerFn_handler, saveTestimonialsFn_createServerFn_handler, updateApplicationLinksFn_createServerFn_handler, updateBrandVisualsFn_createServerFn_handler, updateGeneralSettingsFn_createServerFn_handler, updateMediaAssetFn_createServerFn_handler, updateSocialSettingsFn_createServerFn_handler, uploadMediaFn_createServerFn_handler };
