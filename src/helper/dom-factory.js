export default (function() {

  /**
   * Properly manipulates the a give DOM element in a cross-browser safe way
   * 
   * @param {DOMElement} ele The DOM element instance manipulated by this instance
   * 
   * @see https://github.com/torokmark/design_patterns_in_typescript/tree/master/facade
   */
  function DOMElementFacade(ele) {
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

  /**
   * Creates a new instance of the facade object that handles the DOM iteraction 
   * 
   * @see https://github.com/torokmark/design_patterns_in_typescript/tree/master/factory_method
   */
  return {
    create: function(elementType) {
      const ele =
        typeof elementType === 'string'
          ? document.createElement(elementType)
          : elementType;
      return new DOMElementFacade(ele);
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
