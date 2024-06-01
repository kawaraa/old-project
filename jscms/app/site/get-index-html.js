class IndexHTML {
  constructor(html) {
    this.htmlPage = html;
  }

  render(component) {
    return this.htmlPage.replace("COMPONENT", component);
  }
}

module.exports = IndexHTML;
