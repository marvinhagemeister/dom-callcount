export interface DOMCallCounter {
  createElement: number;
  createElementNS: number;
  createTextNode: number;
  appendChild: number;
  insertBefore: number;
  replaceChild: number;
  removeChild: number;
  // Attributes
  setAttribute: number;
  setAttributeNS: number;
  removeAttribute: number;
  removeAttributeNS: number;
}

export function createCallCounter(): DOMCallCounter {
  return {
    createElement: 0,
    createElementNS: 0,
    createTextNode: 0,
    appendChild: 0,
    insertBefore: 0,
    replaceChild: 0,
    removeChild: 0,
    removeAttribute: 0,
    removeAttributeNS: 0,
    setAttribute: 0,
    setAttributeNS: 0,
  };
}

export function observe(fn: () => void): DOMCallCounter {
  // Save original functions
  const createElement = Document.prototype.createElement;
  const createElementNS = Document.prototype.createElementNS;
  const createTextNode = Document.prototype.createTextNode;
  const appendChild = Node.prototype.appendChild;
  const insertBefore = Node.prototype.insertBefore;
  const replaceChild = Node.prototype.replaceChild;
  const removeChild = Node.prototype.removeChild;
  const setAttribute = Element.prototype.setAttribute;
  const setAttributeNS = Element.prototype.setAttributeNS;
  const removeAttribute = Element.prototype.removeAttribute;
  const removeAttributeNS = Element.prototype.removeAttributeNS;

  const counter = createCallCounter();

  // Patch
  Document.prototype.createElement = function(this: Document) {
    counter.createElement++;
    return createElement.apply(this, arguments);
  };
  Document.prototype.createElementNS = function(this: Document) {
    counter.createElementNS++;
    return createElementNS.apply(this, arguments);
  };
  Document.prototype.createTextNode = function(this: Document) {
    counter.createTextNode++;
    return createTextNode.apply(this, arguments);
  };
  Node.prototype.appendChild = function(this: Node) {
    counter.appendChild++;
    return appendChild.apply(this, arguments);
  };
  Node.prototype.insertBefore = function(this: Node) {
    counter.insertBefore++;
    return insertBefore.apply(this, arguments);
  };
  Node.prototype.replaceChild = function(this: Node) {
    counter.replaceChild++;
    return replaceChild.apply(this, arguments);
  };
  Node.prototype.removeChild = function(this: Node) {
    counter.removeChild++;
    return removeChild.apply(this, arguments);
  };
  Element.prototype.setAttribute = function(this: Element) {
    counter.setAttribute++;
    return setAttribute.apply(this, arguments);
  };
  Element.prototype.setAttributeNS = function(this: Element) {
    counter.setAttributeNS++;
    return setAttributeNS.apply(this, arguments);
  };
  Element.prototype.removeAttribute = function(this: Element) {
    counter.removeAttribute++;
    return removeAttribute.apply(this, arguments);
  };
  Element.prototype.removeAttributeNS = function(this: Element) {
    counter.removeAttributeNS++;
    return removeAttributeNS.apply(this, arguments);
  };

  fn();

  // Restore
  Document.prototype.createElement = createElement;
  Document.prototype.createElementNS = createElementNS;
  Document.prototype.createTextNode = createTextNode;
  Node.prototype.appendChild = appendChild;
  Node.prototype.insertBefore = insertBefore;
  Node.prototype.replaceChild = replaceChild;
  Node.prototype.removeChild = removeChild;
  Element.prototype.setAttribute = setAttribute;
  Element.prototype.setAttributeNS = setAttributeNS;
  Element.prototype.removeAttribute = removeAttribute;
  Element.prototype.removeAttributeNS = removeAttributeNS;

  return counter;
}

export default observe;
