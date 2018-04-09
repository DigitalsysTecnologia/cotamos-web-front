const ApiClient = require('@cotamos/cotamos-api-client')

function getBaseUrl () {
  switch (window.location.host) {
    case 'www.cotamos.com':
      return 'https://backend.cotamos.com/api/v1'
    default:
      return 'http://localhost:3000/api/v1'
  }
}

export default new ApiClient({url: getBaseUrl()})
