export const APP_NAVIGATE_EVENT = "app-navigate";

export const navigateTo = (path: string) => {
  const event = new CustomEvent(APP_NAVIGATE_EVENT, { detail: path });
  window.dispatchEvent(event);
};

export const handleScrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export const handleScrollDown = () => {
  window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
};
