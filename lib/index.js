const clone = require('@bugsnag/core/lib/clone-client')
const { createReportFromError, getMetaDataFromRequest, buildRequestClient } = require('./utils')

module.exports = {
  pkg: require('./package.json'),
  register: (server, options, next) => {
    const client = options.client
    server.ext({
      type: 'onRequest',
      method: async (request, h) => {
        const requestClient = client.config.autoCaptureSessions
          ? client.startSession()
          : clone(client)
        const bugsnagClient = buildRequestClient(request, requestClient)
        request.app.bugsnag = bugsnagClient
        return h.continue
      }
    })

    server.events.on({ name: 'request', channels: 'error' }, (request, event, tags) => {
      request.app.bugsnag.notify(
        createReportFromError(event.error, request),
        getMetaDataFromRequest(request)
      )
    })

    if (next) {
      next()
    }
  }
}
