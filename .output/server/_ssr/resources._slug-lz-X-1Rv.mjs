import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as siteConfig } from "./FinalCTA-c-S2hXna.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resources._slug-lz-X-1Rv.js
var $$splitComponentImporter = () => import("./resources._slug-Tp43TcOx.mjs");
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
