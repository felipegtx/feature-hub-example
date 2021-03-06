module.exports = {
  createDocumentHtml(bodyHtml, serializedStates, urlsForHydration) {
    const serializedStatesScript = serializedStates
      ? `<script type="x-feature-hub/serialixzed-states">${serializedStates}</script>`
      : '';

    const urlsForHydrationScript = urlsForHydration && urlsForHydration.length
      ? `<script type="x-feature-hub/urls-for-hydration">${JSON.stringify(
        Array.from(urlsForHydration),
      )}</script>`
      : '';

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>My App</title>
        <style>
          body { 
            font-family: monospace
          }
          hr { 
            border-style: dashed;
            color: #e0e0e0;
          }
        </style>
      </head>
      <body>
        ${bodyHtml}
        ${serializedStatesScript}
        ${urlsForHydrationScript}
        <script src="integrator.js"></script>
      </body>
      </html>
    `;
  },
};
