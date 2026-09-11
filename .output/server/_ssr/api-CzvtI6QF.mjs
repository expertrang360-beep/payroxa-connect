import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-CHsEIZ_E.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-CzvtI6QF.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var loginCmsFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("e7fa160ff3d08412930de6a314a4c0fb3318f4bf61686cebc7ed1231d19a71fb"));
var getCmsSessionFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("5475a5eb2180554fd282592cda8268a4854d8dc6534b2a2b95d090767a0b8235"));
var getDashboardOverviewFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("5812131ecd9dbe0849f89e52d015bbc84c1124ca52e75d39e1dddbcc2ee7222b"));
var getCmsSettingsFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("7b554e1e0728d4b66b29518ecdad0c2288348ece9eaec122036f13d440c4dd62"));
var updateGeneralSettingsFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("5320d17f90587982d6412d465e8e5d2c44e9dd55b8327de4754d0ac4563a77e9"));
var updateApplicationLinksFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("ebcd51adf54d90924e50e305a1594bc9b7581fde4eae7b37250551ac646e3a34"));
var updateSocialSettingsFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("b2bcf481f59891dbd7b8e48eed678bde6e753984294684b8dfdb037a04a0cdb5"));
var getAdminUsersFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("4f38ec5edc388241db6444c40389e208adc005c2b4acdb2c36c429bbe403c39d"));
var createAdminUserFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("332d3eab4085eea5cf14d6276a619b9f8d765d4fdda5fddfd09b922425ee08d3"));
var deleteAdminUserFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("5767259dff2722431dc82c75987c9e55f09ca5255abfe62f8c0305d7311ddfb6"));
var getActivityLogFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("a2cc8d82ec0c9be054d07ebbe67ccb9a7ceba49f1147a3da803d8790494f5709"));
var getHeroContentFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("6a0f744ca7f4177a5af720885f6c8a74db65e9f63fc12017e1dce6e5a7e90744"));
var saveHeroDraftFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("58544f0f060a79caa1e23ddceb7ddfd3ce8bd68d251255b6cd24eb6f87df39b3"));
var publishHeroContentFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("2e741dd695f492e05ceb3c2c8b744cdd02e242c8712c38d40961236be6e96ec8"));
var getProductsFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("4eedf9ba9a53b4d7d19bcbbf124021d1c19931b93ab776ace2a9c7d4dc7060eb"));
var saveProductsFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("4f05aa94c74c60ed519ef51ec161f118c9e8f5945dce4980724586aa80c5159e"));
var getFaqsFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("a2d40e7586c69dc680fec3529d8813b96f05d889f8ad333449a5e7cc7f7dc86c"));
var saveFaqsFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("f175152d5c3cac5d55e6138f78e680e53507c16bc15e24cb8dd757dcb83dd006"));
var getTestimonialsFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("6db9d20fa87bf315831e7d6ba03577184919424f39f138808333251faaf1e0d0"));
var saveTestimonialsFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("2972081ef20e2528e162996b87709e5bcdf0514b996e245d48d5c7ecd0e8d6b8"));
var getBusinessTypesFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("d9e9e58594192eae6e703e7a0015e8d8545f450e0f857e1f7671c86173858f45"));
var saveBusinessTypesFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("d840dbecef3d006ffb0ae8ebcc54162eaabd1e566ba900bbbc7b9f281e7225b3"));
var getNavigationFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("6d63964aa60b41c14dc781b2b20db5e452b921e53bdb8ff9dcb7d4574a050c83"));
var saveNavigationFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("e0d3f7302c6cb958baef56821299fb908988fa2092959cc34fd2aa8347b81ae9"));
var getAnnouncementsFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("199b2939571c90e625a29d2647444bcde6249d234f87752cb0ed51d75ac3e9b0"));
var saveAnnouncementsFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("70767e4c6029bdbf1f009157e5067ba4b0b42e9be56352d38e976343d43add96"));
var getMediaFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("2af562f34b509d68ac46758f4894c25613ca9990364e906e4ab02cc839fc79b5"));
var uploadMediaFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("c4a34fec0cbf72e0f10b8ddaab64a68a793f9d42944b45bc29a944b8b4b88b5d"));
var updateMediaAssetFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("4b899dfa574de4423bed984210bc5e69036a722d1f3ba196cf46cc23f4b614d8"));
var deleteMediaAssetFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("d1afabb44024404484e74ca72c606bc9878e37931aa640fe8e0f45e96fe9c56c"));
var updateBrandVisualsFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("f09a44d58559c789fc8022f16c49b7047c19ed62795fe5469e1938f313090879"));
var getSeoFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("9b286f8c5cf0e33e9b9752f5b92ac29f310947ce7d2b9dd49c6170393dab0ade"));
var saveSeoFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("5aa0081fbbe699711f2d57b962d196d0b597120234834a8e6a1732160082d8dd"));
var getContentSectionsFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("330368aec0eb88854442c72cf9b6a1a19941ca92f79d6e74e6692cbe72f66f98"));
var saveContentSectionsFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("6222b31e5436a744aec9bd0df724b76294f90448d936fb5d7d0ca836b7ac8db7"));
var getSeoHealthReportFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("92fd025702abf56dd3f014421ddf9ef1c6c3a80d44279075086e856b53c9e7d8"));
var getRedirectsFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("3b8c906e60c9526072f0192fea7dfea22dafb3495114da5be7fadf6933bba965"));
var saveRedirectFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("6ce94866ab06c832a1a3f588dda0e317f81932a8211d26448ff8151d377fbab1"));
var deleteRedirectFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("a827927c4ea48da48091dc4230116eb86684cbffcac322e1941b48e1a8d653b4"));
var getSearchConsoleFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("4f154c98b970f230bf41455a98fd69b549fa5fb2f420c6f1a0a7d23c4aaafa65"));
var saveSearchConsoleFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("e091b4b226cae4561ec9f83f4c867fbfb2e8cae3157c208993207256a2736c0d"));
var getBlogDataFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("9b73ec3f2b9d950ad2d7e0fdc278c89e2b37968d931e06206819ab19305438b2"));
var saveBlogPostFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("4600a99dd9a9d6df9c879930cee6be39f13e8a5f6ffb5227ab20097f88beadb8"));
var deleteBlogPostFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("17359ca241eb2c87b5e5c610801c1d88b4af567b90cf1be495b340d1290c1a49"));
var saveBlogCategoryFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("4649bb5287de4a24f4176f600cf4df1eed7a943bed846f73932058293e4426c7"));
createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("724fc495cfbd3a7f66b2ad14643ebe457c84d09b172c85921984886a30398dc6"));
var saveBlogAuthorFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("a31c8b9e4d2acf54d4a1733d2a5386141e98b40565e060d9683d232d9f2dadf6"));
createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("3506034f112804af63e7583b894a593b3041b6a48cf3a0a5599745c9c6ebd7ef"));
var getPublicPublishedSiteDataFn = createServerFn({ method: "GET" }).handler(createSsrRpc("f446dbd3ba8b4f64fdb1c1a42a5d3de105380db9742129fd0840dffc1d255b4d"));
//#endregion
export { saveBlogCategoryFn as A, saveSeoFn as B, getSeoFn as C, publishHeroContentFn as D, loginCmsFn as E, saveHeroDraftFn as F, updateMediaAssetFn as G, updateApplicationLinksFn as H, saveNavigationFn as I, updateSocialSettingsFn as K, saveProductsFn as L, saveBusinessTypesFn as M, saveContentSectionsFn as N, saveAnnouncementsFn as O, saveFaqsFn as P, saveRedirectFn as R, getSearchConsoleFn as S, getTestimonialsFn as T, updateBrandVisualsFn as U, saveTestimonialsFn as V, updateGeneralSettingsFn as W, getMediaFn as _, deleteRedirectFn as a, getPublicPublishedSiteDataFn as b, getAnnouncementsFn as c, getCmsSessionFn as d, getCmsSettingsFn as f, getHeroContentFn as g, getFaqsFn as h, deleteMediaAssetFn as i, saveBlogPostFn as j, saveBlogAuthorFn as k, getBlogDataFn as l, getDashboardOverviewFn as m, deleteAdminUserFn as n, getActivityLogFn as o, getContentSectionsFn as p, uploadMediaFn as q, deleteBlogPostFn as r, getAdminUsersFn as s, createAdminUserFn as t, getBusinessTypesFn as u, getNavigationFn as v, getSeoHealthReportFn as w, getRedirectsFn as x, getProductsFn as y, saveSearchConsoleFn as z };
