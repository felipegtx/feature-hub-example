
const AppService = {
  id: 'my-services:my-service-one',

  optionalDependencies: {
    featureServices: { 's2:async-ssr-manager': '^1.0.0' },
  },

  create: (env) => {
    const asyncSsrManager = env.featureServices['s2:async-ssr-manager'];
    const _isServer = !!asyncSsrManager;
    const _rederSide = (_isServer) ? 'server' : 'client';

    return {
    	'1.0.0': () => ({
        featureService: {
          isServer : () => _isServer,
          log : (message) => {
            console.log(`[${_rederSide}] Hi from ${message}`);
          },
        },
    	}),
    };
  },
};


module.exports = AppService;
