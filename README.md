# DOM CallCount

// TODO

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
//   createElementNS: 0,
//   createTextNode: 1,
//   appendChild: 1,
//   insertBefore: 0,
//   replaceChild: 0,
//   removeChild: 0,
// }
```

### Usage with [jsdom](https://github.com/tmpvar/jsdom)

Using `dom-callcount` with [jsdom](https://github.com/tmpvar/jsdom) requires
a little setup beforehand.

```js
import { JSDOM } from "jsdom";

const dom = new JSDOM();
global.window = dom.window;
global.document = window.document;

// Shim global Document which is available in browsers
global.Document = document;
Document.prototype = document.__proto__;

// Same for `Node`. Note that we are using a private api here!
// There is unfortunately not another way to do this.
global.Node = window._core.Node;
```

## License

MIT, see [License](LICENSE.md).
