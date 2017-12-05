# DOM CallCount

`dom-callcount` is a tiny library to track calls to the `DOM`. The main use
case is for developers of virtual-dom libraries which want to minimize dom
operations as much as possible.

If you're testing in a real browser you should use a [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) instead. This library is mainly for environments where `MutationObserver` is not available, because the latter is quite hard to polyfill.

This library is heavily inspired by these [utils](https://github.com/ivijs/ivi/blob/bef9db3205e168c00a4e2242ae2c7166b2b7be88/packages/ivi/tests/utils/dom.ts) from [ivi](https://github.com/ivijs/ivi).

## Installation

```bash
# npm
npm install --save-dev dom-callcount

# yarn
yarn add --dev dom-callcount
```

## Usage

Under the hood it works by spying on the `prototype` of `Node` and `Document`.
After the callback is called, these are restored to their previous state and
all spies are removed.

```js
import observe from "dom-callcount";

const result = observe(() => {
  const div = document.createElement("div");
  const text = document.createTextNode("foo");
  div.appendChild(text);
});

console.log(result);
// Logs:
// {
//   createElement: 1,
//   createTextNode: 1,
//   appendChild: 1,
// }
```

## License

MIT, see [License](LICENSE.md).
