import { JSDOM } from "jsdom";

const dom = new JSDOM();
(global as any).window = dom.window;

(global as any).document = dom.window.document;
(global as any).Document = dom.window.document;
Document.prototype = (dom.window.document as any).__proto__;

(global as any).Node = (dom.window as any)._core.Node;
(global as any).Element = (dom.window as any)._core.Element;
