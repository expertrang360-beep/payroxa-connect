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
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-09-11T15:49:31.218Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-11T15:49:31.219Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/CmsActivityFeed-5xZHjt_m.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"84b-tIxZd8eFp78cg7mWrzpISlGdfVQ\"",
		"mtime": "2026-09-11T15:49:28.711Z",
		"size": 2123,
		"path": "../public/assets/CmsActivityFeed-5xZHjt_m.js"
	},
	"/assets/CmsAuthContext-CSNm8lUA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5af-smSAyKLsOyA2OC7Mnh2GzFWXvGE\"",
		"mtime": "2026-09-11T15:49:28.711Z",
		"size": 1455,
		"path": "../public/assets/CmsAuthContext-CSNm8lUA.js"
	},
	"/assets/CmsCard-db6E82hB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"954-USRp3HShsmRYwiQyBGexxiFMZOQ\"",
		"mtime": "2026-09-11T15:49:28.711Z",
		"size": 2388,
		"path": "../public/assets/CmsCard-db6E82hB.js"
	},
	"/assets/CmsImagePicker-BG-lBS-q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b09-Gv6WzLL2OBKq7OEsLlCZ4XUOTzY\"",
		"mtime": "2026-09-11T15:49:28.711Z",
		"size": 11017,
		"path": "../public/assets/CmsImagePicker-BG-lBS-q.js"
	},
	"/assets/CmsLayout-CHlvKoIY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fd5-Wd2AezhXDC6FCoE5+nO4UPap6sI\"",
		"mtime": "2026-09-11T15:49:28.711Z",
		"size": 8149,
		"path": "../public/assets/CmsLayout-CHlvKoIY.js"
	},
	"/assets/api-DqHmaSMg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b00b-M2h2+kMMRsJ6jT6ho4w93jhUgI0\"",
		"mtime": "2026-09-11T15:49:28.711Z",
		"size": 45067,
		"path": "../public/assets/api-DqHmaSMg.js"
	},
	"/assets/arrow-left-NiI_Cz3s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-TidDucy7cBGd/5sXpyttECDl18M\"",
		"mtime": "2026-09-11T15:49:28.711Z",
		"size": 165,
		"path": "../public/assets/arrow-left-NiI_Cz3s.js"
	},
	"/assets/arrow-right-Do1gApTO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-Fz7A7waXzI+wNy3DVHCIJuZtl+o\"",
		"mtime": "2026-09-11T15:49:28.711Z",
		"size": 165,
		"path": "../public/assets/arrow-right-Do1gApTO.js"
	},
	"/assets/arrow-right-left-Bfjpo2Qy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f8-gb84fZ6UHgFnyshMPXjFxCiOLjk\"",
		"mtime": "2026-09-11T15:49:28.711Z",
		"size": 248,
		"path": "../public/assets/arrow-right-left-Bfjpo2Qy.js"
	},
	"/assets/bell-ring-DkQOWnUw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18d-gclhr7yxoeSiMCCw0BEi5LqL79I\"",
		"mtime": "2026-09-11T15:49:28.711Z",
		"size": 397,
		"path": "../public/assets/bell-ring-DkQOWnUw.js"
	},
	"/assets/book-open-CK-kIifS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"117-NXeOzN/QTbUMv/QSSI1IQNoS1l8\"",
		"mtime": "2026-09-11T15:49:28.711Z",
		"size": 279,
		"path": "../public/assets/book-open-CK-kIifS.js"
	},
	"/assets/briefcase-VwFd0t-v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dc-Sf7Vl+AdcYijQRuH2kYS4Q0KQ2Y\"",
		"mtime": "2026-09-11T15:49:28.711Z",
		"size": 220,
		"path": "../public/assets/briefcase-VwFd0t-v.js"
	},
	"/assets/building-2-CPkca-zZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17f-rMBzQ3cYDcwaqhH+gW+1y3oo7xs\"",
		"mtime": "2026-09-11T15:49:28.711Z",
		"size": 383,
		"path": "../public/assets/building-2-CPkca-zZ.js"
	},
	"/assets/circle-alert-BgOHs0E8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fa-4AZnnl6PRvXzT1HjkvImSl0u3kA\"",
		"mtime": "2026-09-11T15:49:28.711Z",
		"size": 250,
		"path": "../public/assets/circle-alert-BgOHs0E8.js"
	},
	"/assets/circle-question-mark-Ca3-5-8U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f8-XJGAdySfnd2Pi7WMPwVg6VjmtbQ\"",
		"mtime": "2026-09-11T15:49:28.712Z",
		"size": 248,
		"path": "../public/assets/circle-question-mark-Ca3-5-8U.js"
	},
	"/assets/client-TCQbtqM0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"31fe-6aToj3JSfIdo2CMJPQw6X559uNo\"",
		"mtime": "2026-09-11T15:49:28.712Z",
		"size": 12798,
		"path": "../public/assets/client-TCQbtqM0.js"
	},
	"/assets/clock-CXWkCReS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-D/u3qI1m6zqzwD/Vo7Wgu5ch2ak\"",
		"mtime": "2026-09-11T15:49:28.712Z",
		"size": 169,
		"path": "../public/assets/clock-CXWkCReS.js"
	},
	"/assets/cms-admin-BwbmbNvN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12c-idk6z4TaXjS5vY9l+IGd6y4+TDA\"",
		"mtime": "2026-09-11T15:49:28.712Z",
		"size": 300,
		"path": "../public/assets/cms-admin-BwbmbNvN.js"
	},
	"/assets/circle-check-BKKjzvnm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b2-Vcdo9QfxPTbFYKZ6BCZg7f9vLaw\"",
		"mtime": "2026-09-11T15:49:28.711Z",
		"size": 178,
		"path": "../public/assets/circle-check-BKKjzvnm.js"
	},
	"/assets/cms-admin.activity-Ck94EYxf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b97-rhOW57XlaTBsK46F4lX9J9B+Ysw\"",
		"mtime": "2026-09-11T15:49:28.712Z",
		"size": 2967,
		"path": "../public/assets/cms-admin.activity-Ck94EYxf.js"
	},
	"/assets/cms-admin.announcements-71rRHUUl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1594-iDMAAsbrPCHn2AuWgJJjRCalz/4\"",
		"mtime": "2026-09-11T15:49:28.712Z",
		"size": 5524,
		"path": "../public/assets/cms-admin.announcements-71rRHUUl.js"
	},
	"/assets/cms-admin.business-CGoDTiDA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10a7-Sk+KNNXJJlKDLdzqKOXbogmnVzA\"",
		"mtime": "2026-09-11T15:49:28.712Z",
		"size": 4263,
		"path": "../public/assets/cms-admin.business-CGoDTiDA.js"
	},
	"/assets/cms-admin.blog-C2p4cgxQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6ffd-B2EjOyZgkLNAXGDPmSkJGgCNtKU\"",
		"mtime": "2026-09-11T15:49:28.712Z",
		"size": 28669,
		"path": "../public/assets/cms-admin.blog-C2p4cgxQ.js"
	},
	"/assets/cms-admin.content-CtlHX2me.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"190e-4a8rebdPWwGUZ7ewlXnW2eqNntk\"",
		"mtime": "2026-09-11T15:49:28.712Z",
		"size": 6414,
		"path": "../public/assets/cms-admin.content-CtlHX2me.js"
	},
	"/assets/cms-admin.faq-B-dP1wl0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16b5-mM/GwZDwGRQwkHgdD40/XnmUOik\"",
		"mtime": "2026-09-11T15:49:28.712Z",
		"size": 5813,
		"path": "../public/assets/cms-admin.faq-B-dP1wl0.js"
	},
	"/assets/cms-admin.hero-cXtpvnmk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a03-AlKApkvMbDRhqfWO5tDiODi/FuE\"",
		"mtime": "2026-09-11T15:49:28.712Z",
		"size": 10755,
		"path": "../public/assets/cms-admin.hero-cXtpvnmk.js"
	},
	"/assets/cms-admin.index-DFMb-lVc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2099-tipiknKEcuBnueFmpz9yn8cRT5s\"",
		"mtime": "2026-09-11T15:49:28.712Z",
		"size": 8345,
		"path": "../public/assets/cms-admin.index-DFMb-lVc.js"
	},
	"/assets/cms-admin.login-17akwq6f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1629-SAi+z8qCPQxFphIzrhSBeQX/5Rk\"",
		"mtime": "2026-09-11T15:49:28.712Z",
		"size": 5673,
		"path": "../public/assets/cms-admin.login-17akwq6f.js"
	},
	"/assets/cms-admin.marketplace-BlJRNWRI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1305-fwZeucW0ivXg7SvBlLqt47zQq0I\"",
		"mtime": "2026-09-11T15:49:28.712Z",
		"size": 4869,
		"path": "../public/assets/cms-admin.marketplace-BlJRNWRI.js"
	},
	"/assets/cms-admin.media-DSRmxzWT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6b34-MSer9+HLMnm9dw33mCwB8B+KBa8\"",
		"mtime": "2026-09-11T15:49:28.712Z",
		"size": 27444,
		"path": "../public/assets/cms-admin.media-DSRmxzWT.js"
	},
	"/assets/cms-admin.navigation-BaDHxD5F.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13b4-XNsY8LEgWmlmR62jARz0rsnFzDA\"",
		"mtime": "2026-09-11T15:49:28.712Z",
		"size": 5044,
		"path": "../public/assets/cms-admin.navigation-BaDHxD5F.js"
	},
	"/assets/cms-admin.pages-CptIMoz9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d16-P3RLqU6gGZJBkUlIiY5n0gd3te4\"",
		"mtime": "2026-09-11T15:49:28.712Z",
		"size": 3350,
		"path": "../public/assets/cms-admin.pages-CptIMoz9.js"
	},
	"/assets/cms-admin.products-D0e21F7S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3274-YOSn2VbcqacXVDgqQ5Ihkby4+N4\"",
		"mtime": "2026-09-11T15:49:28.712Z",
		"size": 12916,
		"path": "../public/assets/cms-admin.products-D0e21F7S.js"
	},
	"/assets/cms-admin.seo-S-g8t6Tf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9df4-GDZoTEQP7tC/Q4tBA/KR8CuoMmw\"",
		"mtime": "2026-09-11T15:49:28.712Z",
		"size": 40436,
		"path": "../public/assets/cms-admin.seo-S-g8t6Tf.js"
	},
	"/assets/cms-admin.settings.admins-Bl-IIHtj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"231b-GtGtQWXf4MnNip52ilyK957tLeg\"",
		"mtime": "2026-09-11T15:49:28.712Z",
		"size": 8987,
		"path": "../public/assets/cms-admin.settings.admins-Bl-IIHtj.js"
	},
	"/assets/cms-admin.settings.index-D0P1Hc1I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24b5-DzDaYnWyLUHDIx7sXeuUJMBo+IU\"",
		"mtime": "2026-09-11T15:49:28.712Z",
		"size": 9397,
		"path": "../public/assets/cms-admin.settings.index-D0P1Hc1I.js"
	},
	"/assets/cms-admin.settings.links-Cjg36zrk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2969-w74TZpMv+3XZM3cxBvKaNP03JjE\"",
		"mtime": "2026-09-11T15:49:28.712Z",
		"size": 10601,
		"path": "../public/assets/cms-admin.settings.links-Cjg36zrk.js"
	},
	"/assets/cms-admin.settings.social--__egCkF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1226-HmbgMOPnTWh5+/snKk2yZJP4fl8\"",
		"mtime": "2026-09-11T15:49:28.712Z",
		"size": 4646,
		"path": "../public/assets/cms-admin.settings.social--__egCkF.js"
	},
	"/assets/cms-admin.testimonials-Cuh-deNU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1748-m4EIoP4PPLFJ2IMqNsFvn3SbpmA\"",
		"mtime": "2026-09-11T15:49:28.712Z",
		"size": 5960,
		"path": "../public/assets/cms-admin.testimonials-Cuh-deNU.js"
	},
	"/assets/coins-BZ45uoNW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11d-b7kkEFbKCfke+z64d/uHgpyZbRg\"",
		"mtime": "2026-09-11T15:49:28.713Z",
		"size": 285,
		"path": "../public/assets/coins-BZ45uoNW.js"
	},
	"/assets/createLucideIcon-Df10jPhx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2764-FRS5PFZPaPkWjb//+IfPApdjQv8\"",
		"mtime": "2026-09-11T15:49:28.713Z",
		"size": 10084,
		"path": "../public/assets/createLucideIcon-Df10jPhx.js"
	},
	"/assets/credit-card-CC_HfwYx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cf-JzWWmVQ95ZxvNl8aaR54J7hrUcQ\"",
		"mtime": "2026-09-11T15:49:28.713Z",
		"size": 207,
		"path": "../public/assets/credit-card-CC_HfwYx.js"
	},
	"/assets/external-link-BkmK0lN3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-PLoKhJTMxJ9oyU0IS88tzYSKuR0\"",
		"mtime": "2026-09-11T15:49:28.713Z",
		"size": 251,
		"path": "../public/assets/external-link-BkmK0lN3.js"
	},
	"/assets/eye-Xb2bKrKL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100-clM+T7esg3oiOEftGMSRkQpoIwM\"",
		"mtime": "2026-09-11T15:49:28.713Z",
		"size": 256,
		"path": "../public/assets/eye-Xb2bKrKL.js"
	},
	"/assets/eye-off-Bw1GlXDO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ae-OGcLAGG2jqJU+LtAz7tDRws07cI\"",
		"mtime": "2026-09-11T15:49:28.713Z",
		"size": 430,
		"path": "../public/assets/eye-off-Bw1GlXDO.js"
	},
	"/assets/file-spreadsheet-TTmsKaTW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ac-muXCl0X44DOm3TpKvJiMlyncGe4\"",
		"mtime": "2026-09-11T15:49:28.713Z",
		"size": 428,
		"path": "../public/assets/file-spreadsheet-TTmsKaTW.js"
	},
	"/assets/file-text-BSMcqsxt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"181-aobHo18N9MgJWakScup1xYilU1M\"",
		"mtime": "2026-09-11T15:49:28.713Z",
		"size": 385,
		"path": "../public/assets/file-text-BSMcqsxt.js"
	},
	"/assets/globe-Cyz7sp59.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f2-xtxc76QY4M1oeypIEgbY0fB6QW0\"",
		"mtime": "2026-09-11T15:49:28.713Z",
		"size": 242,
		"path": "../public/assets/globe-Cyz7sp59.js"
	},
	"/assets/hero-payroxa-zSxlJuMl.jpg": {
		"type": "image/jpeg",
		"etag": "\"1c7bf-YEQu5MUNiHUq7GA3qPKwYDi8+TQ\"",
		"mtime": "2026-09-11T15:49:28.715Z",
		"size": 116671,
		"path": "../public/assets/hero-payroxa-zSxlJuMl.jpg"
	},
	"/assets/image-Qzq-Qv35.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10d-6DzSp9VVwVjdrocsfDIjR+H4TfA\"",
		"mtime": "2026-09-11T15:49:28.713Z",
		"size": 269,
		"path": "../public/assets/image-Qzq-Qv35.js"
	},
	"/assets/index-ClDEbskC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6d3ff-WdSdGkWg6EQhY3ggob1TSHvHNkU\"",
		"mtime": "2026-09-11T15:49:28.711Z",
		"size": 447487,
		"path": "../public/assets/index-ClDEbskC.js"
	},
	"/assets/landmark-DQYsYWrG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ec-CxXl9Fe0lvQp3/6PGUErvIQeTmA\"",
		"mtime": "2026-09-11T15:49:28.713Z",
		"size": 748,
		"path": "../public/assets/landmark-DQYsYWrG.js"
	},
	"/assets/layers-BSmF_H9C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a5-3v8p8seYkEhdc9T1G36DjQtOXYQ\"",
		"mtime": "2026-09-11T15:49:28.713Z",
		"size": 421,
		"path": "../public/assets/layers-BSmF_H9C.js"
	},
	"/assets/link-2-Dz_Fz7b6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f2-Za+g32oTpMIWdQ4+bE4uVCvP9hI\"",
		"mtime": "2026-09-11T15:49:28.713Z",
		"size": 242,
		"path": "../public/assets/link-2-Dz_Fz7b6.js"
	},
	"/assets/link-CQ8tMezU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"69a3-E42CFBdFQy5l0Tw8r9wcQxHjOBg\"",
		"mtime": "2026-09-11T15:49:28.713Z",
		"size": 27043,
		"path": "../public/assets/link-CQ8tMezU.js"
	},
	"/assets/lock-BvYWK6ak.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ce-SHcbSDzpxU1BXAv/vgdv3GXFcz8\"",
		"mtime": "2026-09-11T15:49:28.713Z",
		"size": 206,
		"path": "../public/assets/lock-BvYWK6ak.js"
	},
	"/assets/mail-D7YeH6_V.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-qo6iGLj+R2EOT68vAhf/Vh7V0T8\"",
		"mtime": "2026-09-11T15:49:28.713Z",
		"size": 213,
		"path": "../public/assets/mail-D7YeH6_V.js"
	},
	"/assets/map-pin-Dq-p-Pr6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-UYjKgwYS2aIK29TceChF0Iv7Aks\"",
		"mtime": "2026-09-11T15:49:28.713Z",
		"size": 259,
		"path": "../public/assets/map-pin-Dq-p-Pr6.js"
	},
	"/assets/marketplace-CYxkF28q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3e10-XudDBFhVqDESLvmJWNwMreSreNQ\"",
		"mtime": "2026-09-11T15:49:28.713Z",
		"size": 15888,
		"path": "../public/assets/marketplace-CYxkF28q.js"
	},
	"/assets/marketplace.product._slug-CYz6Pee3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a94-b8M2KnblK6VUX+Qucb3ADhkWQqE\"",
		"mtime": "2026-09-11T15:49:28.713Z",
		"size": 6804,
		"path": "../public/assets/marketplace.product._slug-CYz6Pee3.js"
	},
	"/assets/marketplace.store._slug-HYCoflSJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1658-XA79rHIOEp2kHlpwOfuYI9cgrco\"",
		"mtime": "2026-09-11T15:49:28.714Z",
		"size": 5720,
		"path": "../public/assets/marketplace.store._slug-HYCoflSJ.js"
	},
	"/assets/marketplace.vendor._id-DcbV5qMf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"162c-46X7DJerS8UWFAauVgndLSuoWOU\"",
		"mtime": "2026-09-11T15:49:28.714Z",
		"size": 5676,
		"path": "../public/assets/marketplace.vendor._id-DcbV5qMf.js"
	},
	"/assets/menu-Cc7_paJW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e2-auIPPJrlVNAgdKZ6q99+iKwBLl4\"",
		"mtime": "2026-09-11T15:49:28.714Z",
		"size": 482,
		"path": "../public/assets/menu-Cc7_paJW.js"
	},
	"/assets/message-square-quote-TOsWJ3Xy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"159-s/KzcWNFoDPHap0Do0cwmEbhuc4\"",
		"mtime": "2026-09-11T15:49:28.714Z",
		"size": 345,
		"path": "../public/assets/message-square-quote-TOsWJ3Xy.js"
	},
	"/assets/package-CPKskfbX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"174-+L6cI6azfjIqXROLupxlPz8xlW4\"",
		"mtime": "2026-09-11T15:49:28.714Z",
		"size": 372,
		"path": "../public/assets/package-CPKskfbX.js"
	},
	"/assets/palette-BndYNTPW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fe-6reM3YuagTAufBoUjVuyyUpaUEE\"",
		"mtime": "2026-09-11T15:49:28.714Z",
		"size": 510,
		"path": "../public/assets/palette-BndYNTPW.js"
	},
	"/assets/payment-links-C6XRmpiO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a32-M25PRy6hYBEkDi3ZRymXEWGm1IU\"",
		"mtime": "2026-09-11T15:49:28.714Z",
		"size": 2610,
		"path": "../public/assets/payment-links-C6XRmpiO.js"
	},
	"/assets/payment-requests-BH29eM__.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9fd-SjoHk21p3WQgQOvxfZke/2sQMzg\"",
		"mtime": "2026-09-11T15:49:28.714Z",
		"size": 2557,
		"path": "../public/assets/payment-requests-BH29eM__.js"
	},
	"/assets/plus-y1iigZHh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-eCdHIkX8+2QOJ1lAlQoBQiQHGec\"",
		"mtime": "2026-09-11T15:49:28.714Z",
		"size": 153,
		"path": "../public/assets/plus-y1iigZHh.js"
	},
	"/assets/qr-code-Dbv4g9rz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28a-n0yFMjGFtdyIrhZnCqghBeYKV/Q\"",
		"mtime": "2026-09-11T15:49:28.714Z",
		"size": 650,
		"path": "../public/assets/qr-code-Dbv4g9rz.js"
	},
	"/assets/radio-C9NQrawT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"36d-VJrjKCMc7459T8ffsxcKAf73qpI\"",
		"mtime": "2026-09-11T15:49:28.714Z",
		"size": 877,
		"path": "../public/assets/radio-C9NQrawT.js"
	},
	"/assets/redirect-Dhm19zUi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f4-ePZWCXP5uehkmkGMkMl5xDch+/Y\"",
		"mtime": "2026-09-11T15:49:28.714Z",
		"size": 500,
		"path": "../public/assets/redirect-Dhm19zUi.js"
	},
	"/assets/icons-ZbVfsMIA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8fe8a-SzbGeM6JYJi7lfOSDJGUPPEgwgU\"",
		"mtime": "2026-09-11T15:49:28.713Z",
		"size": 589450,
		"path": "../public/assets/icons-ZbVfsMIA.js"
	},
	"/assets/refresh-cw-BJhgDiiT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"141-aARHhUZv4rNNtg5znWIf3vwBelI\"",
		"mtime": "2026-09-11T15:49:28.714Z",
		"size": 321,
		"path": "../public/assets/refresh-cw-BJhgDiiT.js"
	},
	"/assets/resources-BWCzfQiA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2518-HYhm4Xzwr5LqRu0bhrz6LJKE7eE\"",
		"mtime": "2026-09-11T15:49:28.714Z",
		"size": 9496,
		"path": "../public/assets/resources-BWCzfQiA.js"
	},
	"/assets/resources._slug-CU3ok9r_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"29e6-7SfXQEVvu3BiE1/L1BQnJJXUIIE\"",
		"mtime": "2026-09-11T15:49:28.714Z",
		"size": 10726,
		"path": "../public/assets/resources._slug-CU3ok9r_.js"
	},
	"/assets/root-DLTE-HSj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20-vSYConOtSP6ciwr9zKsPixNwWmc\"",
		"mtime": "2026-09-11T15:49:28.714Z",
		"size": 32,
		"path": "../public/assets/root-DLTE-HSj.js"
	},
	"/assets/routes-BP3DFJCo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3a88-MGbs34B9JPnzlS4ZbHJr40BYduo\"",
		"mtime": "2026-09-11T15:49:28.714Z",
		"size": 14984,
		"path": "../public/assets/routes-BP3DFJCo.js"
	},
	"/assets/save-C3TD6BLm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"147-ELYhElZrG5unD+JBThTLvi4rLKA\"",
		"mtime": "2026-09-11T15:49:28.714Z",
		"size": 327,
		"path": "../public/assets/save-C3TD6BLm.js"
	},
	"/assets/search-BGswRmuI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-5AruZ1LRlc7WHjZFodUiX3/H38Y\"",
		"mtime": "2026-09-11T15:49:28.714Z",
		"size": 174,
		"path": "../public/assets/search-BGswRmuI.js"
	},
	"/assets/send-BoZ30SPE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-FVB6hlMVrnW7bYEoNMOUqACJ884\"",
		"mtime": "2026-09-11T15:49:28.714Z",
		"size": 290,
		"path": "../public/assets/send-BoZ30SPE.js"
	},
	"/assets/settings-DEpS1BPp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"576-z17mvZAbngq5C6plFTfprKrIGUM\"",
		"mtime": "2026-09-11T15:49:28.714Z",
		"size": 1398,
		"path": "../public/assets/settings-DEpS1BPp.js"
	},
	"/assets/share-2-C9CN2-xh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"165-6YiMwsfPNgtvwwUPKL5fvkw2kPY\"",
		"mtime": "2026-09-11T15:49:28.714Z",
		"size": 357,
		"path": "../public/assets/share-2-C9CN2-xh.js"
	},
	"/assets/shield-check-C5N5gdwN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-wUrvNtFpIzSMmaOjABCIy32SYXc\"",
		"mtime": "2026-09-11T15:49:28.714Z",
		"size": 320,
		"path": "../public/assets/shield-check-C5N5gdwN.js"
	},
	"/assets/shopping-bag-BcA7eniq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"154-RcYcjlwgaKSIrSG+xz9+yRXzGPc\"",
		"mtime": "2026-09-11T15:49:28.714Z",
		"size": 340,
		"path": "../public/assets/shopping-bag-BcA7eniq.js"
	},
	"/assets/sliders-horizontal-5m0-uof9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"54d-2cYWiKuKuUm2/ULpnxZxVt/5lpk\"",
		"mtime": "2026-09-11T15:49:28.714Z",
		"size": 1357,
		"path": "../public/assets/sliders-horizontal-5m0-uof9.js"
	},
	"/assets/sliders-vertical-BQf07Evw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"392-gCAi9dirVbtZLZWCy3mQZFfkcWs\"",
		"mtime": "2026-09-11T15:49:28.714Z",
		"size": 914,
		"path": "../public/assets/sliders-vertical-BQf07Evw.js"
	},
	"/assets/smartphone-D0L7C0PZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"467-CHuzY62fCFf3yBDRuaJlkr1CXxw\"",
		"mtime": "2026-09-11T15:49:28.714Z",
		"size": 1127,
		"path": "../public/assets/smartphone-D0L7C0PZ.js"
	},
	"/assets/sparkles--khH35yM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-rVVqDnqTkjx8Hp3g1SXud5No1Pg\"",
		"mtime": "2026-09-11T15:49:28.714Z",
		"size": 494,
		"path": "../public/assets/sparkles--khH35yM.js"
	},
	"/assets/store-CF6udh1k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f2-gWr6djaQHqntgzAk5k+PTNfIkAM\"",
		"mtime": "2026-09-11T15:49:28.714Z",
		"size": 498,
		"path": "../public/assets/store-CF6udh1k.js"
	},
	"/assets/styles-PKfzNlVj.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1e949-GNK23bvgrWUmM/iXbDkudkIB1rU\"",
		"mtime": "2026-09-11T15:49:28.715Z",
		"size": 125257,
		"path": "../public/assets/styles-PKfzNlVj.css"
	},
	"/assets/transfers-BzGjAeTn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a80-+XMT0M6RYCs7JSmYJk8fi0c4J1Q\"",
		"mtime": "2026-09-11T15:49:28.715Z",
		"size": 2688,
		"path": "../public/assets/transfers-BzGjAeTn.js"
	},
	"/assets/trash-2-BbuCkhC3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148-EMSZjGa015P/tXs7aWytGW+dKgk\"",
		"mtime": "2026-09-11T15:49:28.715Z",
		"size": 328,
		"path": "../public/assets/trash-2-BbuCkhC3.js"
	},
	"/assets/triangle-alert-DNreSXGI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"109-4HcZUfjXFOON0v9xmSy7dZ0qVfY\"",
		"mtime": "2026-09-11T15:49:28.715Z",
		"size": 265,
		"path": "../public/assets/triangle-alert-DNreSXGI.js"
	},
	"/assets/truck-O3bvRuR-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"196-KkWEn1l8eqljWcSxDqLzhor/Yps\"",
		"mtime": "2026-09-11T15:49:28.715Z",
		"size": 406,
		"path": "../public/assets/truck-O3bvRuR-.js"
	},
	"/assets/upload-DKE5Mn8S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2dd-gI9l+nfzqTHRuBFw4UK9JVJjO78\"",
		"mtime": "2026-09-11T15:49:28.715Z",
		"size": 733,
		"path": "../public/assets/upload-DKE5Mn8S.js"
	},
	"/assets/useRouter-LYrDs0pQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-QjXk4hAfhMhEmrfdIH7pIcArZA4\"",
		"mtime": "2026-09-11T15:49:28.715Z",
		"size": 156,
		"path": "../public/assets/useRouter-LYrDs0pQ.js"
	},
	"/assets/user-Bg0IbYNs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19f-rGKJY3WXH+1YkdcjXtwlr2ZPrx8\"",
		"mtime": "2026-09-11T15:49:28.715Z",
		"size": 415,
		"path": "../public/assets/user-Bg0IbYNs.js"
	},
	"/assets/user-plus-CaVsZ0u1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-sv9wJfYvTAuuirugvIbL+6lI65w\"",
		"mtime": "2026-09-11T15:49:28.715Z",
		"size": 310,
		"path": "../public/assets/user-plus-CaVsZ0u1.js"
	},
	"/assets/users-Br79Caw8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-IDMzqpXsiFGSFp03kfptSzL6Uo0\"",
		"mtime": "2026-09-11T15:49:28.715Z",
		"size": 306,
		"path": "../public/assets/users-Br79Caw8.js"
	},
	"/assets/utils-B6KiDbIe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6a7d-iNkBSvaSyIjvZOzWoTvEa49qwcI\"",
		"mtime": "2026-09-11T15:49:28.715Z",
		"size": 27261,
		"path": "../public/assets/utils-B6KiDbIe.js"
	},
	"/assets/wallet-GPLMmc5e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11e-totHjerAoBgYAonLyGOECO1i/4Q\"",
		"mtime": "2026-09-11T15:49:28.715Z",
		"size": 286,
		"path": "../public/assets/wallet-GPLMmc5e.js"
	},
	"/assets/wallet-jGF_Mf9V.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a39-yBWrU5yKqat1srPzKLGIGBs78cY\"",
		"mtime": "2026-09-11T15:49:28.715Z",
		"size": 2617,
		"path": "../public/assets/wallet-jGF_Mf9V.js"
	},
	"/assets/wifi-Bkuktlse.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d0f-WBRDKj0S72SPDL/ml8yyLlWjVew\"",
		"mtime": "2026-09-11T15:49:28.715Z",
		"size": 3343,
		"path": "../public/assets/wifi-Bkuktlse.js"
	},
	"/assets/x-CZ4xqNVG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-lr6Z7U3DzNzSSr0otCm+SHG5BX4\"",
		"mtime": "2026-09-11T15:49:28.715Z",
		"size": 154,
		"path": "../public/assets/x-CZ4xqNVG.js"
	},
	"/assets/zap-kglbNE61.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"106-VY9O9izsC2FNbrJJfqPJCijOWxk\"",
		"mtime": "2026-09-11T15:49:28.715Z",
		"size": 262,
		"path": "../public/assets/zap-kglbNE61.js"
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
