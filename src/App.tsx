import { Outlet } from "react-router";
import CommonLayout from "./components/layouts/CommonLayout";
import ScrollToTop from "./utils/scrollToTop";
import LoadingLayout from "./components/layouts/LoadingLayout";
import { useGtmVirtualPageview } from "./lib/gtm";

function App() {
  useGtmVirtualPageview();
  return (
    <>
      <CommonLayout>
        <ScrollToTop />
        <Outlet />
      </CommonLayout>
      <LoadingLayout />
    </>
  );
}

export default App;
