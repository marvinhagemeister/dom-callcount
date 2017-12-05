import observe from "../";

describe("observe", () => {
  it("should observe dom changes", () => {
    const res = observe(() => {
      const div = document.createElement("div");
      const text = document.createTextNode("foo");
      div.appendChild(text);
    });

    expect(res).toEqual({
      createElement: 1,
      createTextNode: 1,
      appendChild: 1,
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

    expect(res2).toEqual({
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

    expect(res).toEqual({
      createElement: 1,
      createTextNode: 1,
      appendChild: 1,
    });
  });

  it("should track attribute changes", () => {
    const res = observe(() => {
      const div = document.createElement("div");
      div.setAttribute("class", "foo");
      div.removeAttribute("class");
    });

    expect(res).toEqual({
      createElement: 1,
      setAttribute: 1,
      removeAttribute: 1,
    });
  });
});
