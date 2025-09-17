import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Set focus to the page content for better accessibility after route change
    const mainContent = document.querySelector("main");
    if (mainContent) {
      mainContent.setAttribute("tabIndex", "-1");
      mainContent.focus();
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
