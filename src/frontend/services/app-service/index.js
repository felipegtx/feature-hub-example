
const AppService = {
  id: 'my-services:my-service-one',

  optionalDependencies: {
    featureServices: { 's2:async-ssr-manager': '^1.0.0' },
  },

  create: (env) => {
    const asyncSsrManager = env.featureServices['s2:async-ssr-manager'];
    const _isServer = !!asyncSsrManager;
    const _rederSide = (_isServer) ? 'server' : 'client';
    const signatures = {};

    return {
      '1.0.0': () => ({
        featureService: {
          isServer: () => _isServer,
          log: (message) => {
            console.log(`[${_rederSide}] Hi from ${message}`);
          },
          subscribeTo: (topic, myId, deleg) => {
            const data = { myId, deleg };
            if (!signatures[topic]) {
              signatures[topic] = [ data ];
            } else {
              signatures[topic].push(data);
            }
          },
          notify: (topic, myId, data) => {
            const target = signatures[topic];
            if (target) {
              target.forEach(i => {
                if (i.myId !== myId) {
                  i.deleg(myId, data);
                }
              });
            }
          },
        },
      }),
    };
  },
};


module.exports = AppService;
