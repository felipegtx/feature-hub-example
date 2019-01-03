export default (function() {
  function DOMElementProxy(ele) {
    return {
      innerHTML: function(str) {
        ele.innerHTML = str;
        return this;
      },
      click: function(what) {
        ele.onclick = what;
        return this;
      },
      val: function(str) {
        if (typeof str === 'undefined') {
          return ele.value;
        }
        ele.value = str;
        return this;
      },
      attr: function(key, value) {
        ele[key] = value;
        return this;
      },
      type: function(str) {
        ele.type = str;
        return this;
      },
      focus: function() {
        ele.focus();
        return this;
      },
      ele: function() {
        return ele;
      },
      appendChildTo: function(parent) {
        parent.appendChild(ele);
        return this;
      }
    };
  }

  return {
    create: function(elementType) {
      const ele =
        typeof elementType === 'string'
          ? document.createElement(elementType)
          : elementType;
      return new DOMElementProxy(ele);
    },
    createButton: function(text, delegate) {
      return this.create('button')
        .innerHTML(text)
        .click(delegate);
    },
    createInput: function(strPlaceholder) {
      return this.create('input')
        .type('text')
        .attr('placeholder', strPlaceholder);
    }
  };
})();
