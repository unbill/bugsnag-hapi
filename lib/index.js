const clone = require('@bugsnag/core/lib/clone-client')
const { createReportFromError, getMetaDataFromRequest, buildRequestClient } = require('./utils')

module.exports = {
  pkg: require('../package.json'),
  register: (server, options, next) => {
    const bugsnagClient = options.client
    server.ext({
      type: 'onRequest',
      method: async (request, h) => {
        request.app.bugsnag = { data: {} }
        if (bugsnagClient) {
          let requestClient = bugsnagClient.config.autoCaptureSessions
            ? bugsnagClient.startSession()
            : clone(bugsnagClient)
          request.app.bugsnag.client = buildRequestClient(request, requestClient)
        }
        return h.continue
      }
    })

    server.events.on({ name: 'request', channels: 'error' }, (request, event, tags) => {
      const { bugsnag } = request.app
      if (bugsnag && bugsnag.client) {
        bugsnag.client.notify(
          createReportFromError(event.error, request),
          getMetaDataFromRequest(request)
        )
      }
    })

    if (next) {
      next()
    }
  }
}
