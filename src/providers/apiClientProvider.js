const axios = require('axios')
const urlJoin = require('url-join')

const baseUrl = 'http://localhost:4444/api/v1'

function internalRequest (method, url, data) {
  return axios({
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    url: urlJoin(baseUrl, url),
    data: data
  }).then(function (res) {
    if (res.data) {
      return res.data
    }

    return null
  }).catch(function (err) {
    var exception = null

    if (err.response && err.response.data) {
      exception = err.response.data
    }

    throw exception
  })
}

function internalDelete (url, data) {
  return internalRequest('delete', url, null)
}

function internalGet (url) {
  return internalRequest('get', url, null)
}

function internalPost (url, data) {
  return internalRequest('post', url, data)
}

function internalPut (url, data) {
  return internalRequest('put', url, data)
}

class ApiClient {
  login (login, password) {
    var payload = {
      login: login,
      password: password
    }

    return internalPost('/user/login', payload)
  }
  checkSession (sessionId) {
    var payload = {
      sessionId: sessionId
    }
    return internalPost('/session/check', payload)
  }
  createChatBotLog (chatBotLog) {
    return internalPost('/chatBotLog/create', chatBotLog)
  }
  getAddressByZipCode (zipCode) {
    return internalGet('/address/byZipCode/' + zipCode)
  }
  createCompany (company) {
    return internalPost('/company/create', company)
  }
  getNearCompaniesByFilter (filter) {
    return internalPost('/company/near', filter)
  }
  getAllCompanies () {
    return internalGet('/company/list')
  }
  updateUser (user) {
    return internalPost('/user/update', user)
  }
  updateCompany (company) {
    return internalPost('/company/update', company)
  }
  createHealthPlan (company) {
    return internalPost('/healthPlan/create', company)
  }
  getHospitalById () {
    return internalGet('/hospital/:hospitalId')
  }
  generateProposal (product) {
    return internalGet('/proposal/generate?product=' + product)
  }
  deleteUserById (userId) {
    return internalDelete('/user/' + userId)
  }
  getUserById (userId) {
    return internalGet('/user/' + userId)
  }
  createHospital (hospital) {
    return internalPost('/hospital/create', hospital)
  }
  updateHospital (hospital) {
    return internalPost('/hospital/update', hospital)
  }
  updateProposal (proposal) {
    return internalPut('/proposal', proposal)
  }
  createUser (user) {
    return internalPost('/user/create', user)
  }
  getHospitalsByFilter (filter) {
    return internalPost('/hospital/filter', filter)
  }
  getProposalsByFilter (filter) {
    return internalPost('/proposal/filter', filter)
  }
  getUsersByFilter (filter) {
    return internalPost('/user/filter', filter)
  }
}

export default new ApiClient()
