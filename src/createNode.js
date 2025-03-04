const addStyles = (node, style) =>
  Object.keys(style).map((key) => (node.style[key] = style[key]));
const addAttributes = (node, attributes) => {
  const { style, ...rest } = attributes;

  if (style) addStyles(node, style);

  Object.keys(rest).forEach((property) => {
    node[property] = rest[property];
  });
};
export const createNode = (nodeName, attributes, textContent) => {
  const node = document.createElement(nodeName);

  node.textContent = textContent;
  addAttributes(node, attributes);

  return node;
};
