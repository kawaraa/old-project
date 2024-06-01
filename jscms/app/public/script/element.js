class Editor {
  constructor(toolsContainer, previewContainer) {
    this.toolsContainer = toolsContainer;
    this.previewContainer = previewContainer;
    // this.previousFocusedElement = previewContainer;
    this.focusedElement = previewContainer;
    this.section = { tag: "", name: "" };
    this.element = { tag: "", type: "", value: "" };
    this.idCounter = 0;
    this.tags = ["input", "time", "audio", "video", "img", "svg", "canvas"];
    this.message =
      "You can't create element inside element like select, input, time, audio, video, img, svg, canvas";
    this.setListener();
  }

  createSection(text = "", order = 0) {
    removeClass(this.focusedElement, "focus");
    this.focusedElement = document.createElement(this.section.tag);
    this.previewContainer.append(this.focusedElement);
    this.focusedElement.setAttribute("id", this.section.name + this.generateId());
    this.focusedElement.setAttribute("class", "new-section");
    getId("editor-sections").style.display = "none";
    this.setListener();
    this.setTools();
    const elementData = { type: this.section.tag, name: this.section.name, text, order };
    // send it to the server
    //
  }

  createElement() {
    const { tag, type, value } = this.element;
    const element = document.createElement(tag);
    element.setAttribute("id", this.generateId());
    element.setAttribute("class", "new-element");
    if (type) element.setAttribute(type, value);
    if (this.isInputElement(this.focusedElement.tagName)) return alert(this.message);
    else this.focusedElement.appendChild(element);

    removeClass(this.focusedElement, "focus");
    this.focusedElement = element;
    getId("editor-elements").style.display = "none";
    this.setListener();
    const elementData = {};
    // send the data to the server
  }

  setListener() {
    addClass(this.focusedElement, "focus");
    this.focusedElement.addEventListener("click", (e) => {
      e.stopPropagation();
      removeClass(this.focusedElement, "focus");
      addClass(e.target, "focus");
      this.focusedElement = e.target;
    });
  }

  updateAttribute({ name, value }) {
    this.focusedElement.setAttribute(name, value);
  }

  updateContent(content) {
    // check iig the "content" is an HTML element or text
    // send it to the server
  }

  updateStyle(style) {
    //
    // send it to the server
  }

  setTools() {
    // set the correct tools based on the focused element "this.focusedElement"
    this.toolsContainer.append();
  }

  isInputElement(tagName) {
    return this.tags.find((tag) => tag === tagName.toLowerCase());
  }
  generateId() {
    this.idCounter += 1;
    return this.idCounter * Math.random() * Math.random() * Math.random() * Math.random() * Math.random();
  }
}

// 'nav', 'main', 'article', 'header', 'aside', 'section', 'footer', 'ol', 'ul', 'div', 'li', 'label', 'strong', 'i'
// 'table'
// 'form'
// 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'
// 'a'
// 'button'
// 'select'
// 'input'
// 'time'
// 'audio'
// 'video'
// 'img'
// 'svg'
// 'canvas'

/* 
Width
Height
Margin-left
Margin-right
Margin-top
Margin-bottom
padding-top
padding-left
padding-right
padding-bottom
background
Color
Position
Top
Left
Right
Bottom
Border
Border-radius
Border-style
Cursor
Display
flex-wrap: wrap
justify-content
font-size
font-family
font-weight
letter-spacing
Text-align
text-decoration
list-style
min-height
min-width
opacity
overflow-y
resize
visibility
word-break
z-index

@media

Arial (sans-serif)
Verdana (sans-serif)
Helvetica (sans-serif)
Tahoma (sans-serif)
Trebuchet MS (sans-serif)
Times New Roman (serif)
Georgia (serif)
Garamond (serif)
Courier New (monospace)
Brush Script MT (cursive)

ul.a {list-style-type: circle;}
ul.b {list-style-type: disc;}
ul.c {list-style-type: square;}
ol.f {list-style-type: decimal;}
ol.g {list-style-type: decimal-leading-zero;}
ol.h {list-style-type: georgian;}
ol.i {list-style-type: hebrew;}
ol.j {list-style-type: hiragana;}
ol.k {list-style-type: hiragana-iroha;}
ol.l {list-style-type: katakana;}
ol.m {list-style-type: katakana-iroha;}
ol.n {list-style-type: lower-alpha;}
ol.o {list-style-type: lower-greek;}
ol.p {list-style-type: lower-latin;}
ol.q {list-style-type: lower-roman;}
ol.r {list-style-type: upper-alpha;}
ol.s {list-style-type: upper-greek;}
ol.t {list-style-type: upper-latin;}
ol.u {list-style-type: upper-roman;}
ol.v {list-style-type: none;}


text-decoration-line: underline solid;
text-decoration-line: underline wavy;
text-decoration-line: underline double;
text-decoration: overline underline wavy;


*/
