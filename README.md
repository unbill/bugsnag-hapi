# bugsnag-hapi

Hapi plugin to support Bugsnag. Modeled from their Express and Koa middleware.

## Setup

### Set up your Bugsnag client

```javascript

// Just some example options here...
const options = {
  apiKey = "234sdfsd3434rfdf34r34rf"
  autoCaptureSessions: true,
  notifyReleaseStages: ["production", "sandbox", "staging"],
  releaseStage: "staging",
  filters: ['password', 'authorization']
}

// Create your bugsnag client however you like
const bugsnagClient = bugsnag(options)
}
```

### Register the plugin

Register the plugin with you Hapi server.

```javascript
const buildServer = async () => {
  // Code that initialized your server goes here...
  const server = hapi.Server({
    port: 4000,
    // Any other options go here etc...
  }

  // Register the plugin, passing in the client you created earlier
  bugsnagPlugin.register(server, { client: bugsnagClient })
  // Register other things etc...
  onRequest(server)
  onPostAuth(server)
  onPreResponse(server)

  routes.register(server)

  return server
}
```
