require("../__util__/test-init");
var virtualize = require("marko/runtime/vdom/vdom").___virtualize;
var fs = require("fs");
var toHTML = require("../__util__/toHTML");
var createJSDOMModule = require("../__util__/create-jsdom-module");
var autotest = require("../autotest");

autotest("fixtures", ({ test, resolve, snapshot }) => {
    test(() => {
        var inputPath = resolve("input.html");
        if (fs.existsSync(inputPath)) {
            var inputHtml = fs.readFileSync(inputPath, { encoding: "utf8" });

            var document = createJSDOMModule({
                dir: __dirname,
                html: "<html><body>" + inputHtml + "</body></html>"
            }).window.document;
            var domNode = document.body.firstChild;
            var vdomNode = virtualize(domNode);
            var vdomHTML = toHTML(vdomNode);
            snapshot(vdomHTML, {
                suffix: ".html",
                prefix: "virtualized-"
            });
        }
    });
});
