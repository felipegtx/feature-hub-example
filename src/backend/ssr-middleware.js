const { createDocumentHtml } = require('./ssr-document');
const renderApp = require('./feature-app-integrator-node');

module.exports = function ssrMiddleware(fallback, port) {
  return async function execute(req, res, next) {
    if (req.originalUrl !== '/') {
      fallback(req, res, next);
      return;
    }

    try {
      const {
        html: appHtml,
        serializedStates,
        urlsForHydration,
      } = await renderApp({ req, port });

      res.send(
        createDocumentHtml(
          `<div id="my-app">${appHtml}</div>`,
          serializedStates,
          urlsForHydration,
        ),
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error responding to SSR request:', error);
      fallback(req, res, next);
    }
  };
};
