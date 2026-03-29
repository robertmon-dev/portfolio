export const APP_NAVIGATE_EVENT = "app-navigate";

export const navigateTo = (path: string) => {
  const event = new CustomEvent(APP_NAVIGATE_EVENT, { detail: path });
  window.dispatchEvent(event);
};
