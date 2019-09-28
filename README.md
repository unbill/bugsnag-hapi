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

```

### Register the plugin

Register the plugin with your Hapi server.

```javascript
const buildServer = async () => {
  // Code that initializes your server
  const server = hapi.Server({
    port: 4000,
    // Any other server options go here...
  }

  // **** The important part ****
  // Register the plugin, passing in the client you created earlier
  bugsnagPlugin.register(server, { client: bugsnagClient })

  // Register other things etc...
  onRequest(server)
  onPreResponse(server)
  routes.register(server)

  return server
}
```

### Easily add properties to your bugsnag context

The plugin automatically sets up an object on your Hapi request at:
`request.app.bugsnag`

To access your request contextualized client:
`const bugsnagRequestClient = request.app.bugsnag.client`

At any point where you have access to the request, you can add custom properties that will be reported to bugsnag on error.

```javascript
// Add the current user
request.app.bugsnag.data.user = { id: someObject.userId }

// Add some data to an existing section or create a new section
// In this case creating a new partner section
request.app.bugsnag.data.partner = { id: partnerId, name: 'My partner name' }
```
