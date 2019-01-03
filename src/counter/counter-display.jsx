import * as React from 'react';

const {useEffect, useState} = React;

function CounterDisplay({counter}) {
  const [count, setCount] = useState(counter.count);

  useEffect(() => counter.subscribe(() => setCount(counter.count)), [counter]);

  return <div>{count}</div>;
}

export default {
  id: 'example:counter-display',

  dependencies: {
    'example:counter': '^1.0'
  },

  create(env) {
    const counterV1 = env.featureServices['example:counter'];

    return {
      render: () => <CounterDisplay counter={counterV1} />
    };
  }
};
