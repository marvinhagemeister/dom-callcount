export type Attr = keyof Document | keyof Node | keyof Element | keyof Text;
export type Counter = Record<Attr, number>;

const allowed = [
  "createElement",
  "createElementNS",
  "createTextNode",
  "appendChild",
  "insertBefore",
  "replaceChild",
  "removeChild",
  "setAttribute",
  "setAttributeNS",
  "removeAttribute",
  "removeAttributeNS",
  "nodeValue",
  "textContent",
  "className",
  "id",
  "innerHTML",
  "addEventListener",
  "removeEventListener",
];

function patch(
  obj: any,
  key: string,
  counter: Record<string, number>,
  restore: any[],
) {
  let source: any;
  try {
    source = (obj.prototype as any)[key];
  } catch (err) {
    return;
  }

  (obj.prototype as any)[key] = function(this: any) {
    if (counter[key] === undefined) {
      counter[key] = 0;
    }
    counter[key]++;
    return source.apply(this, arguments);
  };

  restore.push(() => ((obj.prototype as any)[key] = source));
}

export function observe(fn: () => void): Partial<Counter> {
  const restore: any[] = [];
  const counter: Partial<Counter> = {};

  for (const key of allowed) {
    patch(Document, key, counter as any, restore);
  }

  for (const key of allowed) {
    patch(Element, key, counter as any, restore);
  }

  for (const key of allowed) {
    patch(Text, key, counter as any, restore);
  }

  fn();

  restore.forEach(x => x());

  return counter;
}

export default observe;
