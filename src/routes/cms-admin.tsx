import { createFileRoute, Outlet } from "@tanstack/react-router";
import { CmsAuthProvider } from "@/cms/context/CmsAuthContext";
import { CmsLayout } from "@/cms/components/CmsLayout";

export const Route = createFileRoute("/cms-admin")({
  component: CmsRouteLayout,
});

function CmsRouteLayout() {
  return (
    <CmsAuthProvider>
      <CmsLayout>
        <Outlet />
      </CmsLayout>
    </CmsAuthProvider>
  );
}
