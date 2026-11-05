
import { loadHeader } from "./components/header.js";
import { loadFooter } from "./components/footer.js";

const headerContainer = document.querySelector("#site-header");
const footerContainer = document.querySelector("#site-footer");

const isPagesPage = window.location.pathname.includes("/pages/");

if (headerContainer) {
    loadHeader(headerContainer, isPagesPage);
}

if (footerContainer) {
    loadFooter(footerContainer, isPagesPage);
}
