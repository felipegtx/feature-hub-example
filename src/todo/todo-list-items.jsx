import * as React from 'react';
import styles from './todo-list.scss';

class TodoListDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {items: []};

    this.remove = this.remove.bind(this);
    this.setState = this.setState.bind(this);
  }

  componentWillMount() {
    this.props.list.subscribe(() =>
      this.setState({
        items: this.props.list.items
      })
    );
  }

  remove(item) {
    this.props.list.remove(item);
  }

  render() {
    let items = this.state.items;

    if (items.length === 0) {
      return 'Nothing to display';
    }

    return (
      <div className={styles.list}>
        {items.map((item, i) => (
          <div key={i}>
            <label>{item.text}</label>
            <button onClick={() => this.remove(item)}>X</button>
          </div>
        ))}
      </div>
    );
  }
}

export default {
  id: 'example:todo-list-items',

  dependencies: {
    'example:todo-list': '^1.0'
  },

  create(env) {
    const todoListV1 = env.featureServices['example:todo-list'];

    return {
      render: () => <TodoListDisplay list={todoListV1} />
    };
  }
};
