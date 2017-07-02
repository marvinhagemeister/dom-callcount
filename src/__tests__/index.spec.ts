import { assert as t } from "chai";
import observe from "../";

describe("observe", () => {
  it("should observe dom changes", () => {
    const res = observe(() => {
      const div = document.createElement("div");
      const text = document.createTextNode("foo");
      div.appendChild(text);
    });

    t.deepEqual(res, {
      createElement: 1,
      createElementNS: 0,
      createTextNode: 1,
      appendChild: 1,
      insertBefore: 0,
      replaceChild: 0,
      removeChild: 0,
    });

    const res2 = observe(() => {
      const foo = document.createElementNS("div", "foo");
      const text = document.createTextNode("bar");
      const text2 = document.createTextNode("baz");

      foo.appendChild(text);
      foo.removeChild(text);
      foo.appendChild(text);
      foo.replaceChild(text2, text);
      foo.insertBefore(text, text2);
    });

    t.deepEqual(res2, {
      createElement: 0,
      createElementNS: 1,
      createTextNode: 2,
      appendChild: 2,
      insertBefore: 1,
      replaceChild: 1,
      removeChild: 1,
    });
  });

  it("should reset after callback", () => {
    const res = observe(() => {
      const div = document.createElement("div");
      const text = document.createTextNode("foo");
      div.appendChild(text);
    });

    const div = document.createElement("div");
    const text = document.createTextNode("foo");
    div.appendChild(text);

    t.deepEqual(res, {
      createElement: 1,
      createElementNS: 0,
      createTextNode: 1,
      appendChild: 1,
      insertBefore: 0,
      replaceChild: 0,
      removeChild: 0,
    });
  });
});
