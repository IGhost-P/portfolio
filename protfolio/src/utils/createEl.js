export const createEl = (tag, className, text = null) => {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = text;

  return element;
};
