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

function patch(obj: any, key: string, counter: DOMCallCounter, restore: any[]) {
  const source = (obj.prototype as any)[key];
  (obj.prototype as any)[key] = function(this: any) {
    (counter as any)[key]++;
    return source.apply(this, arguments);
  };

  restore.push(() => ((obj.prototype as any)[key] = source));
}

export type Attr = keyof Document | keyof Node | keyof Element;

export function observe(fn: () => void): DOMCallCounter {
  const doc: Attr[] = ["createElement", "createElementNS", "createTextNode"];
  const el: Attr[] = [
    "appendChild",
    "insertBefore",
    "replaceChild",
    "removeChild",
    "setAttribute",
    "setAttributeNS",
    "removeAttribute",
    "removeAttributeNS",
  ];

  const restore: any[] = [];
  const counter = createCallCounter();

  for (const key of doc) {
    patch(Document, key, counter, restore);
  }

  for (const key of el) {
    patch(Element, key, counter, restore);
  }

  fn();

  restore.forEach(x => x());

  return counter;
}

export default observe;
