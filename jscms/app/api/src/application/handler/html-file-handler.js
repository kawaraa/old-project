const fs = require("fs");

class HtmlFileHandler {
  constructor() {
    this.publicDir = process.cwd() + "/site/page/";
  }

  deleteFile(name) {
    fs.unlinkSync(publicDir + name + ".html");
  }

  updateFile(elementData, name) {
    fs.writeFileSync(publicDir + name + ".html", this.renderElements(elementData));
  }

  renderAttributes(attributes) {
    let str = " ";
    for (let key in attributes) str += `${key}="${attributes[key]}" `;
    return str;
  }

  renderElements(element) {
    return `<${element.type} ${this.renderAttributes(element.attributes)}>${
      !element.children[0]
        ? element.text
        : element.text + element.children.reduce((init, child) => init + this.renderElements(child), "")
    }</${element.type}>`;
  }
}

module.exports = HtmlFileHandler;
