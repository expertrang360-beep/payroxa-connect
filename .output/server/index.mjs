globalThis.__nitro_main__ = import.meta.url;
import { i as serve, r as NodeResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
import { i as toEventHandler, n as defineHandler, o as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-11T16:59:07.414Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/CmsActivityFeed-BwtztMVV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cb8-AYvBdjvKTcryxn+MKqSIjNMk5R0\"",
		"mtime": "2026-09-11T16:59:04.655Z",
		"size": 3256,
		"path": "../public/assets/CmsActivityFeed-BwtztMVV.js"
	},
	"/assets/CmsAuthContext-Jlmr_g0l.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"61d-9EccBZ0ZzWAeqbhaP/S29VJ9RuY\"",
		"mtime": "2026-09-11T16:59:04.655Z",
		"size": 1565,
		"path": "../public/assets/CmsAuthContext-Jlmr_g0l.js"
	},
	"/assets/CmsCard-7La4wbls.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ee1-Sq0uousDoTEJK2TgwSTyvGktWcg\"",
		"mtime": "2026-09-11T16:59:04.655Z",
		"size": 3809,
		"path": "../public/assets/CmsCard-7La4wbls.js"
	},
	"/assets/CmsImagePicker-Ddh4QFD1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3fa8-uD7nQ0wz5jN01gY3Gdtm4xSX8nw\"",
		"mtime": "2026-09-11T16:59:04.655Z",
		"size": 16296,
		"path": "../public/assets/CmsImagePicker-Ddh4QFD1.js"
	},
	"/assets/CmsLayout-bXife7jA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2cc4-NY9hda+R2XIS2HQdFeadpcpn9LM\"",
		"mtime": "2026-09-11T16:59:04.655Z",
		"size": 11460,
		"path": "../public/assets/CmsLayout-bXife7jA.js"
	},
	"/assets/api-f5htfMR4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b3a9-4TaVLO1bO9ZLENYK6RAbTPr1Ks0\"",
		"mtime": "2026-09-11T16:59:04.655Z",
		"size": 45993,
		"path": "../public/assets/api-f5htfMR4.js"
	},
	"/assets/arrow-left-BOSk2kqa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-juz3YsG88Bw1IIogbeYOcH3ir70\"",
		"mtime": "2026-09-11T16:59:04.655Z",
		"size": 164,
		"path": "../public/assets/arrow-left-BOSk2kqa.js"
	},
	"/assets/bell-ring-CItrUWyH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18c-Ew1HK9besL+6IVXHEtq2v4GGqdM\"",
		"mtime": "2026-09-11T16:59:04.656Z",
		"size": 396,
		"path": "../public/assets/bell-ring-CItrUWyH.js"
	},
	"/assets/book-open-UZruD-Z1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"116-SO/pmyrOX4s4H1HM3NWc6JWYuvI\"",
		"mtime": "2026-09-11T16:59:04.656Z",
		"size": 278,
		"path": "../public/assets/book-open-UZruD-Z1.js"
	},
	"/assets/briefcase-CLJO_9IM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"db-sQRz1BnY2V8HG720Q3wNl186FZE\"",
		"mtime": "2026-09-11T16:59:04.656Z",
		"size": 219,
		"path": "../public/assets/briefcase-CLJO_9IM.js"
	},
	"/assets/arrow-right-left-BCanjf1T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f7-KyFTrXVncnbqedcwEW1r/xY3LNM\"",
		"mtime": "2026-09-11T16:59:04.655Z",
		"size": 247,
		"path": "../public/assets/arrow-right-left-BCanjf1T.js"
	},
	"/assets/circle-alert-DPDwg6xp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f9-i4k5EinytbbDXYMHp3BjJcEbkZg\"",
		"mtime": "2026-09-11T16:59:04.656Z",
		"size": 249,
		"path": "../public/assets/circle-alert-DPDwg6xp.js"
	},
	"/assets/circle-check-DvnijO5J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b1-BnQtm1e6tClHKVSj6aRgz1K7XB0\"",
		"mtime": "2026-09-11T16:59:04.656Z",
		"size": 177,
		"path": "../public/assets/circle-check-DvnijO5J.js"
	},
	"/assets/circle-question-mark-DeZfAKKk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f7-cHeVERHqAOd5s97prV44g8JWCgE\"",
		"mtime": "2026-09-11T16:59:04.656Z",
		"size": 247,
		"path": "../public/assets/circle-question-mark-DeZfAKKk.js"
	},
	"/assets/client-TCQbtqM0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"31fe-6aToj3JSfIdo2CMJPQw6X559uNo\"",
		"mtime": "2026-09-11T16:59:04.656Z",
		"size": 12798,
		"path": "../public/assets/client-TCQbtqM0.js"
	},
	"/assets/clock-D4-u4ghC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a8-bz3mILLbE0rpG1fGOQDk/bcaLB0\"",
		"mtime": "2026-09-11T16:59:04.656Z",
		"size": 168,
		"path": "../public/assets/clock-D4-u4ghC.js"
	},
	"/assets/building-2-BdA_js15.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17e-Q/RD2vyDYe1R8IOi1zooMLiNsLA\"",
		"mtime": "2026-09-11T16:59:04.656Z",
		"size": 382,
		"path": "../public/assets/building-2-BdA_js15.js"
	},
	"/assets/cms-admin-MFCfmu3v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21a-w7jyS8Mh9K1kn6CTnhGUTrNhpnA\"",
		"mtime": "2026-09-11T16:59:04.656Z",
		"size": 538,
		"path": "../public/assets/cms-admin-MFCfmu3v.js"
	},
	"/assets/cms-admin.activity-bvg5YN_g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1097-O8iFVEH/+M8Yk5je5DzIqwmrDyg\"",
		"mtime": "2026-09-11T16:59:04.656Z",
		"size": 4247,
		"path": "../public/assets/cms-admin.activity-bvg5YN_g.js"
	},
	"/assets/cms-admin.blog-CnENAkMQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a48a-XEWqPfAhoHavKZRvHSwllvjL1L0\"",
		"mtime": "2026-09-11T16:59:04.656Z",
		"size": 42122,
		"path": "../public/assets/cms-admin.blog-CnENAkMQ.js"
	},
	"/assets/cms-admin.business-BfnAp-sS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1758-9GbOB3iOzwgFxjQxir/VBRKSIDs\"",
		"mtime": "2026-09-11T16:59:04.656Z",
		"size": 5976,
		"path": "../public/assets/cms-admin.business-BfnAp-sS.js"
	},
	"/assets/cms-admin.announcements-CswMB15v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e7a-aY2E4gEiMCyHNukfKCTuS0aOTJo\"",
		"mtime": "2026-09-11T16:59:04.656Z",
		"size": 7802,
		"path": "../public/assets/cms-admin.announcements-CswMB15v.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-09-11T16:59:07.414Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/arrow-right-CQVR_0iP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-uqCF6XPAigvqJzfzB6ydgWS3c3s\"",
		"mtime": "2026-09-11T16:59:04.655Z",
		"size": 164,
		"path": "../public/assets/arrow-right-CQVR_0iP.js"
	},
	"/assets/cms-admin.content--6-mioVm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2488-p71ifT26zIXC9px6r5ZpbY1hTlA\"",
		"mtime": "2026-09-11T16:59:04.656Z",
		"size": 9352,
		"path": "../public/assets/cms-admin.content--6-mioVm.js"
	},
	"/assets/cms-admin.faq-DHW7n6NX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20fe-st6rt/e/ClRtcxTuhmG632BO78s\"",
		"mtime": "2026-09-11T16:59:04.656Z",
		"size": 8446,
		"path": "../public/assets/cms-admin.faq-DHW7n6NX.js"
	},
	"/assets/cms-admin.index-CdEOUiAi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3153-/CavU6OIyeSlq5Ek4ags++LmKl0\"",
		"mtime": "2026-09-11T16:59:04.656Z",
		"size": 12627,
		"path": "../public/assets/cms-admin.index-CdEOUiAi.js"
	},
	"/assets/cms-admin.login-BARqHw9M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2114-qva9Ukvry1zLnzz0rVX9+HaimYw\"",
		"mtime": "2026-09-11T16:59:04.656Z",
		"size": 8468,
		"path": "../public/assets/cms-admin.login-BARqHw9M.js"
	},
	"/assets/cms-admin.marketplace-DvcQM4hX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cfd-4kZp8TjSIp0TRL/aS9R9+KgOPO0\"",
		"mtime": "2026-09-11T16:59:04.656Z",
		"size": 7421,
		"path": "../public/assets/cms-admin.marketplace-DvcQM4hX.js"
	},
	"/assets/cms-admin.media-udBSzW9m.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b80-KRFjDmwOPAEB4tSCKN6U8io4yt4\"",
		"mtime": "2026-09-11T16:59:04.656Z",
		"size": 39808,
		"path": "../public/assets/cms-admin.media-udBSzW9m.js"
	},
	"/assets/cms-admin.navigation-CQQkBI43.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b5f-6FsN5ob8nFuc3cRTPl0mKUrZK2M\"",
		"mtime": "2026-09-11T16:59:04.656Z",
		"size": 7007,
		"path": "../public/assets/cms-admin.navigation-CQQkBI43.js"
	},
	"/assets/cms-admin.pages-sbkfFbGD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1284-DC5kxablROM/mVScpovsKLcuHSI\"",
		"mtime": "2026-09-11T16:59:04.656Z",
		"size": 4740,
		"path": "../public/assets/cms-admin.pages-sbkfFbGD.js"
	},
	"/assets/cms-admin.products-B3YDBa4r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"47f6-RdF4lz4TiXvAWKFFWkpBtLC7JwQ\"",
		"mtime": "2026-09-11T16:59:04.656Z",
		"size": 18422,
		"path": "../public/assets/cms-admin.products-B3YDBa4r.js"
	},
	"/assets/cms-admin.settings.admins-r_vS8E0v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"333f-6JlQRUFHQXUD8AeBYsT6AdhaOQg\"",
		"mtime": "2026-09-11T16:59:04.657Z",
		"size": 13119,
		"path": "../public/assets/cms-admin.settings.admins-r_vS8E0v.js"
	},
	"/assets/cms-admin.hero-B1HmzrRJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3a57-EtnJSk3ovFvM4KYZ1Nyz0vHwY3g\"",
		"mtime": "2026-09-11T16:59:04.656Z",
		"size": 14935,
		"path": "../public/assets/cms-admin.hero-B1HmzrRJ.js"
	},
	"/assets/cms-admin.settings.index-Ddw31xqn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3543-cRKSCW10vQC7VRCOeES+Akc3H24\"",
		"mtime": "2026-09-11T16:59:04.657Z",
		"size": 13635,
		"path": "../public/assets/cms-admin.settings.index-Ddw31xqn.js"
	},
	"/assets/cms-admin.seo-2WS8lw2W.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ea76-7pD6KSyf9E06DgcrC3CsmjDrzVw\"",
		"mtime": "2026-09-11T16:59:04.657Z",
		"size": 60022,
		"path": "../public/assets/cms-admin.seo-2WS8lw2W.js"
	},
	"/assets/cms-admin.settings.links-ROSwyNAV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3c60-kS9RYthc1R/7Ngop5WNbboy7FNI\"",
		"mtime": "2026-09-11T16:59:04.657Z",
		"size": 15456,
		"path": "../public/assets/cms-admin.settings.links-ROSwyNAV.js"
	},
	"/assets/cms-admin.settings.social-DyGDtP4Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19d4-88xkesuppxuskXYKWRRj8i4CZvc\"",
		"mtime": "2026-09-11T16:59:04.657Z",
		"size": 6612,
		"path": "../public/assets/cms-admin.settings.social-DyGDtP4Y.js"
	},
	"/assets/coins-WRgE_lYL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11c-/wgnKp+Yac7qrg1/i7j9QvpYlQI\"",
		"mtime": "2026-09-11T16:59:04.657Z",
		"size": 284,
		"path": "../public/assets/coins-WRgE_lYL.js"
	},
	"/assets/credit-card-BTOZynuC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ce-GCqMj5+c5fLLGBC8VEeSs1dlcxo\"",
		"mtime": "2026-09-11T16:59:04.657Z",
		"size": 206,
		"path": "../public/assets/credit-card-BTOZynuC.js"
	},
	"/assets/external-link-DbLUj5vd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fa-1tG9PzbEF3WS2IaRiAqFU1wOQ/g\"",
		"mtime": "2026-09-11T16:59:04.657Z",
		"size": 250,
		"path": "../public/assets/external-link-DbLUj5vd.js"
	},
	"/assets/cms-admin.testimonials-BFxGLfxe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"219d-2ypjr3eePFcyBSI+avOhNunn2bg\"",
		"mtime": "2026-09-11T16:59:04.657Z",
		"size": 8605,
		"path": "../public/assets/cms-admin.testimonials-BFxGLfxe.js"
	},
	"/assets/eye-off-2YDkaiG3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ad-ctcOJFX8ygL8UPtnv0JES1s12t0\"",
		"mtime": "2026-09-11T16:59:04.657Z",
		"size": 429,
		"path": "../public/assets/eye-off-2YDkaiG3.js"
	},
	"/assets/file-spreadsheet-B_TM164c.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ab-bIOtTZ6IUrRZXxLsXzigW0XklYA\"",
		"mtime": "2026-09-11T16:59:04.657Z",
		"size": 427,
		"path": "../public/assets/file-spreadsheet-B_TM164c.js"
	},
	"/assets/file-text-wwLIAWUK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"180-UVwHpOWsRM0GcYGbp7JL7AzDR9Y\"",
		"mtime": "2026-09-11T16:59:04.657Z",
		"size": 384,
		"path": "../public/assets/file-text-wwLIAWUK.js"
	},
	"/assets/globe-CInbh-ha.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f1-2vTMM1P//qW0urE/+SnYoS+k/zM\"",
		"mtime": "2026-09-11T16:59:04.657Z",
		"size": 241,
		"path": "../public/assets/globe-CInbh-ha.js"
	},
	"/assets/eye-CHBG5amh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ff-fBTZbPLRkk4W44oTyPJmdBGKXuM\"",
		"mtime": "2026-09-11T16:59:04.657Z",
		"size": 255,
		"path": "../public/assets/eye-CHBG5amh.js"
	},
	"/assets/hero-payroxa-zSxlJuMl.jpg": {
		"type": "image/jpeg",
		"etag": "\"1c7bf-YEQu5MUNiHUq7GA3qPKwYDi8+TQ\"",
		"mtime": "2026-09-11T16:59:04.660Z",
		"size": 116671,
		"path": "../public/assets/hero-payroxa-zSxlJuMl.jpg"
	},
	"/assets/image-CJ4XbUpK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10c-+cgQNqv1a86VIJ//j1yvKnxPpnA\"",
		"mtime": "2026-09-11T16:59:04.657Z",
		"size": 268,
		"path": "../public/assets/image-CJ4XbUpK.js"
	},
	"/assets/jsx-dev-runtime-D6J2l8dL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6d67-vwVrotOO0chPnu6TsbMiQZ5C3iM\"",
		"mtime": "2026-09-11T16:59:04.657Z",
		"size": 28007,
		"path": "../public/assets/jsx-dev-runtime-D6J2l8dL.js"
	},
	"/assets/landmark-UIfhm5iM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2eb-eFCVAvlhqNfgX6LHWJQA/U2611U\"",
		"mtime": "2026-09-11T16:59:04.658Z",
		"size": 747,
		"path": "../public/assets/landmark-UIfhm5iM.js"
	},
	"/assets/layers-kfyIBADE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a4-Xnwm2M+yIv4XHaJRw1rO20fa2TE\"",
		"mtime": "2026-09-11T16:59:04.658Z",
		"size": 420,
		"path": "../public/assets/layers-kfyIBADE.js"
	},
	"/assets/link-2-CUtzEYFC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f1-msgUgPxgTlNdHATMN04wZCfbZ7M\"",
		"mtime": "2026-09-11T16:59:04.658Z",
		"size": 241,
		"path": "../public/assets/link-2-CUtzEYFC.js"
	},
	"/assets/link-CU_9Kewm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a541-JPMVUgM7OMWdq4Ek5us/S5V3PaA\"",
		"mtime": "2026-09-11T16:59:04.658Z",
		"size": 42305,
		"path": "../public/assets/link-CU_9Kewm.js"
	},
	"/assets/lock-n3kD93P4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cd-IeEfzCpDIMGqYPrwFc63vUAz/WM\"",
		"mtime": "2026-09-11T16:59:04.658Z",
		"size": 205,
		"path": "../public/assets/lock-n3kD93P4.js"
	},
	"/assets/map-pin-D3CW-Kkw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"102-1GWp0PlK4URsZ6uIvsRvjvBy5PU\"",
		"mtime": "2026-09-11T16:59:04.658Z",
		"size": 258,
		"path": "../public/assets/map-pin-D3CW-Kkw.js"
	},
	"/assets/mail-C1k-e4Hf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d4-KLCYjHiJHUMInRARC6CPS2ZdqTs\"",
		"mtime": "2026-09-11T16:59:04.658Z",
		"size": 212,
		"path": "../public/assets/mail-C1k-e4Hf.js"
	},
	"/assets/marketplace-ojnPgmMi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5841-fYgxkpzz5WlMoLd16fNCbjVo+YQ\"",
		"mtime": "2026-09-11T16:59:04.658Z",
		"size": 22593,
		"path": "../public/assets/marketplace-ojnPgmMi.js"
	},
	"/assets/marketplace.product._slug-CWMg6ufM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"291e-scI2sFKlwsyASFUv/O4ZA2d2Q7o\"",
		"mtime": "2026-09-11T16:59:04.658Z",
		"size": 10526,
		"path": "../public/assets/marketplace.product._slug-CWMg6ufM.js"
	},
	"/assets/marketplace.vendor._id-DCKJ6BcU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2117-oZYNxypKVvJRcpLnevGWsuMcxQU\"",
		"mtime": "2026-09-11T16:59:04.658Z",
		"size": 8471,
		"path": "../public/assets/marketplace.vendor._id-DCKJ6BcU.js"
	},
	"/assets/menu-DilplaIA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e1-jOkSlvIuMGeA/Jzj+bSb1DT8ERo\"",
		"mtime": "2026-09-11T16:59:04.658Z",
		"size": 481,
		"path": "../public/assets/menu-DilplaIA.js"
	},
	"/assets/message-square-quote-BJtKgJW-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"158-1zrkKMyvHouUHHHwIrbRHQCY/RA\"",
		"mtime": "2026-09-11T16:59:04.658Z",
		"size": 344,
		"path": "../public/assets/message-square-quote-BJtKgJW-.js"
	},
	"/assets/package-BNLvd3nI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"173-YOu1szGP6jESYHqVjaNGmkTqOR8\"",
		"mtime": "2026-09-11T16:59:04.658Z",
		"size": 371,
		"path": "../public/assets/package-BNLvd3nI.js"
	},
	"/assets/palette-B6kToopQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fd-pAgZejBDRzAz1/5BnAuLZKwi6Qk\"",
		"mtime": "2026-09-11T16:59:04.658Z",
		"size": 509,
		"path": "../public/assets/palette-B6kToopQ.js"
	},
	"/assets/payment-links-Bc019sUw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e30-HTrlqJfLryw+QMgxP7qKOFoEKIw\"",
		"mtime": "2026-09-11T16:59:04.658Z",
		"size": 3632,
		"path": "../public/assets/payment-links-Bc019sUw.js"
	},
	"/assets/qr-code-DZWjdl9I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"289-xYKIhhns2Z7fDV26Rrz5uV8dtcs\"",
		"mtime": "2026-09-11T16:59:04.658Z",
		"size": 649,
		"path": "../public/assets/qr-code-DZWjdl9I.js"
	},
	"/assets/payment-requests-CRwJs1UT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dfe-pJ+Zx9D8LgvQR5tDQq3SYotMzEc\"",
		"mtime": "2026-09-11T16:59:04.658Z",
		"size": 3582,
		"path": "../public/assets/payment-requests-CRwJs1UT.js"
	},
	"/assets/radio-Drq6aJTp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"36c-f+3YyIL/QnsKTlzRxO+L9p6TvKU\"",
		"mtime": "2026-09-11T16:59:04.658Z",
		"size": 876,
		"path": "../public/assets/radio-Drq6aJTp.js"
	},
	"/assets/icons-D8g2dpT0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8fe85-ZQHdu6C0GYGYWP4X15uh89qtk50\"",
		"mtime": "2026-09-11T16:59:04.657Z",
		"size": 589445,
		"path": "../public/assets/icons-D8g2dpT0.js"
	},
	"/assets/plus-CueaY44g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"98-o2lrHdjHjQsT0i+bh7P9m4xTL3M\"",
		"mtime": "2026-09-11T16:59:04.658Z",
		"size": 152,
		"path": "../public/assets/plus-CueaY44g.js"
	},
	"/assets/index-Be6LKRp0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a6120-RebcBRdLx91h3GynR4q9MCYa8hM\"",
		"mtime": "2026-09-11T16:59:04.655Z",
		"size": 680224,
		"path": "../public/assets/index-Be6LKRp0.js"
	},
	"/assets/marketplace.store._slug-Df3iq5DU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"213e-ehKOUvNr4qMyHMYmb3lF0Zn5kXQ\"",
		"mtime": "2026-09-11T16:59:04.658Z",
		"size": 8510,
		"path": "../public/assets/marketplace.store._slug-Df3iq5DU.js"
	},
	"/assets/redirect-Dhm19zUi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f4-ePZWCXP5uehkmkGMkMl5xDch+/Y\"",
		"mtime": "2026-09-11T16:59:04.658Z",
		"size": 500,
		"path": "../public/assets/redirect-Dhm19zUi.js"
	},
	"/assets/refresh-cw-BFhxf_w4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-0PP8rIaKl8hPLhdPL7ao+uUz77c\"",
		"mtime": "2026-09-11T16:59:04.658Z",
		"size": 320,
		"path": "../public/assets/refresh-cw-BFhxf_w4.js"
	},
	"/assets/resources-BjAfFBtK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3820-WSCOG6bol7Cp76AQ426P/wXV8NI\"",
		"mtime": "2026-09-11T16:59:04.658Z",
		"size": 14368,
		"path": "../public/assets/resources-BjAfFBtK.js"
	},
	"/assets/resources._slug-DJ3EsHQt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4138-hZV3MbLSPkJtR4R0pXOsfAFwzi4\"",
		"mtime": "2026-09-11T16:59:04.658Z",
		"size": 16696,
		"path": "../public/assets/resources._slug-DJ3EsHQt.js"
	},
	"/assets/root-DLTE-HSj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20-vSYConOtSP6ciwr9zKsPixNwWmc\"",
		"mtime": "2026-09-11T16:59:04.658Z",
		"size": 32,
		"path": "../public/assets/root-DLTE-HSj.js"
	},
	"/assets/routes-t6dfSIUX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"64e5-qXo5lRokbSaa+/AOtR4QWru5TK0\"",
		"mtime": "2026-09-11T16:59:04.658Z",
		"size": 25829,
		"path": "../public/assets/routes-t6dfSIUX.js"
	},
	"/assets/save-DOFSnukf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"146-kDI59zLIy1+DS4NFtlXT0ZJkGWw\"",
		"mtime": "2026-09-11T16:59:04.659Z",
		"size": 326,
		"path": "../public/assets/save-DOFSnukf.js"
	},
	"/assets/search-DTGhlvd8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ad-fV+wXfeIX04HY9EaLhQ11z2NOs4\"",
		"mtime": "2026-09-11T16:59:04.659Z",
		"size": 173,
		"path": "../public/assets/search-DTGhlvd8.js"
	},
	"/assets/settings-DCXm65by.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"575-TYKDZ2QeKcXPWu5Nkfh92LyJr6k\"",
		"mtime": "2026-09-11T16:59:04.659Z",
		"size": 1397,
		"path": "../public/assets/settings-DCXm65by.js"
	},
	"/assets/shopping-bag-DTnYTVal.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"153-lwN9w+M9Vt7gC7Tm6W8FwBzqsDg\"",
		"mtime": "2026-09-11T16:59:04.659Z",
		"size": 339,
		"path": "../public/assets/shopping-bag-DTnYTVal.js"
	},
	"/assets/sliders-horizontal-Dc2rlvbP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"54c-3xuD4L+5urK3b57a3JLCgCTzcO8\"",
		"mtime": "2026-09-11T16:59:04.659Z",
		"size": 1356,
		"path": "../public/assets/sliders-horizontal-Dc2rlvbP.js"
	},
	"/assets/sliders-vertical-Cqg0RANy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"391-QF/U/G8l1lajrgvoJa5ZosCXpxQ\"",
		"mtime": "2026-09-11T16:59:04.659Z",
		"size": 913,
		"path": "../public/assets/sliders-vertical-Cqg0RANy.js"
	},
	"/assets/smartphone-D0SzV6DP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"466-++e7BPW6e7RT0ojLqk4KbNt5C80\"",
		"mtime": "2026-09-11T16:59:04.659Z",
		"size": 1126,
		"path": "../public/assets/smartphone-D0SzV6DP.js"
	},
	"/assets/sparkles-SCGkvTO5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ed-KrSnuzskAlLRFw726Am3QtoenbU\"",
		"mtime": "2026-09-11T16:59:04.659Z",
		"size": 493,
		"path": "../public/assets/sparkles-SCGkvTO5.js"
	},
	"/assets/store-BjsDwWfd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f1-mkFxh9iM5dK8C8e7zgD3GP306cQ\"",
		"mtime": "2026-09-11T16:59:04.659Z",
		"size": 497,
		"path": "../public/assets/store-BjsDwWfd.js"
	},
	"/assets/transfers-Da895yKK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e7a-VxtBfNgRXXfys2BlFWZLOAHOPds\"",
		"mtime": "2026-09-11T16:59:04.659Z",
		"size": 3706,
		"path": "../public/assets/transfers-Da895yKK.js"
	},
	"/assets/trash-2-m8PSu5fZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"147-x2VnJXYqR3c+3cV8D2nqfrq9aWc\"",
		"mtime": "2026-09-11T16:59:04.659Z",
		"size": 327,
		"path": "../public/assets/trash-2-m8PSu5fZ.js"
	},
	"/assets/triangle-alert-D6t9Nf8q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"108-GQRoYAYiIvsL2NdC5YwxreuIWRM\"",
		"mtime": "2026-09-11T16:59:04.659Z",
		"size": 264,
		"path": "../public/assets/triangle-alert-D6t9Nf8q.js"
	},
	"/assets/send-D1IdWbao.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"121-ItLYixLgseEVre2pI1LW8Vl5MHU\"",
		"mtime": "2026-09-11T16:59:04.659Z",
		"size": 289,
		"path": "../public/assets/send-D1IdWbao.js"
	},
	"/assets/share-2-NpmlL_Dr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"164-j7o/15kXFVHLasWnia0lzlIO33o\"",
		"mtime": "2026-09-11T16:59:04.659Z",
		"size": 356,
		"path": "../public/assets/share-2-NpmlL_Dr.js"
	},
	"/assets/shield-check-CEcABeld.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13f-6sZulyr/nM5AkmrPS6QqBlRU2Fk\"",
		"mtime": "2026-09-11T16:59:04.659Z",
		"size": 319,
		"path": "../public/assets/shield-check-CEcABeld.js"
	},
	"/assets/styles-BqTuYEzs.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1ea98-dypqtv2UrNt1+h2ba61yxt07tU4\"",
		"mtime": "2026-09-11T16:59:04.660Z",
		"size": 125592,
		"path": "../public/assets/styles-BqTuYEzs.css"
	},
	"/assets/truck-D3w5sJIP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"195-+QlQelyof5Qj1qhuZzAPkF4Pumo\"",
		"mtime": "2026-09-11T16:59:04.659Z",
		"size": 405,
		"path": "../public/assets/truck-D3w5sJIP.js"
	},
	"/assets/upload-Cl4CmMmT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2dc-gTRavwSisFgwZBE0uVwNwI0RxTo\"",
		"mtime": "2026-09-11T16:59:04.659Z",
		"size": 732,
		"path": "../public/assets/upload-Cl4CmMmT.js"
	},
	"/assets/useRouter-DpbcHXLp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10a-F25sPy7mqqr6CICBp6OcFt+F9tQ\"",
		"mtime": "2026-09-11T16:59:04.659Z",
		"size": 266,
		"path": "../public/assets/useRouter-DpbcHXLp.js"
	},
	"/assets/user-DMwIQKaF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19e-yUg+FAKc1iQAGSBVFcMOz2zRPkk\"",
		"mtime": "2026-09-11T16:59:04.659Z",
		"size": 414,
		"path": "../public/assets/user-DMwIQKaF.js"
	},
	"/assets/user-plus-BIcoH1v2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"135-Z3oZmaMJA/y5ubQoEg06t2igM3w\"",
		"mtime": "2026-09-11T16:59:04.659Z",
		"size": 309,
		"path": "../public/assets/user-plus-BIcoH1v2.js"
	},
	"/assets/wallet-BOlQAfk5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11d-sUIuytIVqkHQp2U1NuboT1y3wA4\"",
		"mtime": "2026-09-11T16:59:04.659Z",
		"size": 285,
		"path": "../public/assets/wallet-BOlQAfk5.js"
	},
	"/assets/wallet-D_SZgM9C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e30-kv4S4IMWpRF72/dQrNE5K3tPAao\"",
		"mtime": "2026-09-11T16:59:04.659Z",
		"size": 3632,
		"path": "../public/assets/wallet-D_SZgM9C.js"
	},
	"/assets/users-BEjgdRkY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"131-JLtCXgXnBXFddOVGajlccXbrpnc\"",
		"mtime": "2026-09-11T16:59:04.659Z",
		"size": 305,
		"path": "../public/assets/users-BEjgdRkY.js"
	},
	"/assets/wifi-ZqpFgdFN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d0e-+1b0+ekt/iRuFEZJN64qPEzrLNU\"",
		"mtime": "2026-09-11T16:59:04.659Z",
		"size": 3342,
		"path": "../public/assets/wifi-ZqpFgdFN.js"
	},
	"/assets/x-Bho2cgJr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-IB0iBOYuO+pbmxTRwIKsVXiQxEM\"",
		"mtime": "2026-09-11T16:59:04.659Z",
		"size": 153,
		"path": "../public/assets/x-Bho2cgJr.js"
	},
	"/assets/zap-BAbKkSlF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"105-HfOsYSVA1p4RCWU8G1dqR/x+kmQ\"",
		"mtime": "2026-09-11T16:59:04.659Z",
		"size": 261,
		"path": "../public/assets/zap-BAbKkSlF.js"
	},
	"/assets/utils-B6KiDbIe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6a7d-iNkBSvaSyIjvZOzWoTvEa49qwcI\"",
		"mtime": "2026-09-11T16:59:04.659Z",
		"size": 27261,
		"path": "../public/assets/utils-B6KiDbIe.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_0jRgqU = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_0jRgqU
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		middleware.push(...h3App["~middleware"]);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
var tracingSrvxPlugins = [];
//#endregion
//#region node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };
