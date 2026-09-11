import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as siteConfig } from "./FinalCTA-BWKZzTI8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resources._slug-BIZcVy2P.js
var $$splitComponentImporter = () => import("./resources._slug-CLdUCHro.mjs");
var Route = createFileRoute("/resources/$slug")({
	head: ({ params }) => {
		return {
			meta: [{
				name: "robots",
				content: "index, follow"
			}],
			links: [{
				rel: "canonical",
				href: `${siteConfig.websiteUrl}/resources/${params.slug}`
			}]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
