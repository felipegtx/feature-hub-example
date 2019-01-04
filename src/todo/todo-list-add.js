import $dom from '../helper/dom-factory';

export default {
  id: 'example:todo-list-add',

  dependencies: {
    'example:todo-list': '^1.0'
  },

  create(env) {
    const todoListV1 = env.featureServices['example:todo-list'];

    return {
      attachTo(container) {
        let input = $dom.createInput('New item text').appendChildTo(container);
        $dom
          .createButton('New', () => {
            todoListV1.addText(input.val());
            input.val('').focus();
          })
          .appendChildTo(container);
      }
    };
  }
};
