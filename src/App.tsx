import { Outlet } from "react-router";
import CommonLayout from "./components/layouts/CommonLayout";
import ScrollToTop from "./utils/scrollToTop";
import LoadingLayout from "./components/layouts/LoadingLayout";
import GTMListener from "./components/layouts/GTMListener";

function App() {
  return (
    <>
      <CommonLayout>
        <ScrollToTop />
        <GTMListener />
        <Outlet />
      </CommonLayout>
      <LoadingLayout />
    </>
  );
}

export default App;
