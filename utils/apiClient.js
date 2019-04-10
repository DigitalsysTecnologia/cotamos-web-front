"use strict";

const axios = require("axios");
const urljoin = require("url-join");
const localStore = require("./localStorage");

function getUrl() {
  if (process.browser) {
    switch (window.location.hostname) {
      case "localhost":
        return "https://backend-homolog.cotamos.com/api/v1";
      case "www.cotamos.com":
        return "https://backend.cotamos.com/api/v1";
      case "homolog.cotamos.com":
        return "https://backend-homolog.cotamos.com/api/v1";
      case "dev.cotamos.com":
        return "https://backend-homolog.cotamos.com/api/v1";
    }
  }
  return process.env.baseUrl;
}

function internalRequest(method, url, data) {
  let baseUrl = getUrl();
  let apiKey = "";

  apiKey = localStore.userToken;

  return axios({
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      apiKey: apiKey
    },
    crossdomain: true,
    url: urljoin(baseUrl, url),
    data: data
  })
    .then(function(res) {
      if (res.data) return res.data;

      return null;
    })
    .catch(function(err) {
      var exception = {};

      if (err.response && err.response.data) {
        exception.data = err.response.data;
        exception.statusCode = err.response.status;
      }

      throw exception;
    });
}

function internalDelete(url, data) {
  return internalRequest("delete", url, null);
}

function internalGet(url) {
  return internalRequest("get", url, null);
}

function internalPost(url, data) {
  return internalRequest("post", url, data);
}

function internalPut(url, data) {
  return internalRequest("put", url, data);
}

class ApiClient {
  createUser(user) {
    return internalPost("user", user);
  }

  createChatBotLog(chatBotLog) {
    return internalPost("chatBotLog", chatBotLog);
  }

  generateProposal(productCode, isSimulation) {
    let queryParams = [];
    queryParams.push(`product=${productCode}`);

    if (isSimulation) {
      queryParams.push("simulation=true");
    }

    return internalGet(`proposal/generate/?${queryParams.join("&")}`);
  }

  getProposalsByFilter(filter) {
    return internalPost("proposal/list-by-filter", filter);
  }

  async getAllStates() {
    return await internalGet(`state/all`);
  }

  createPartner(partner) {
    return internalPost("partner", partner);
  }

  updatePartner(partner) {
    return internalPut("partner", partner);
  }

  getProposalById(proposalId) {
    return internalGet(`proposal/get/${proposalId}`);
  }

  getAddressByZipCode(zipCode) {
    return internalGet(urljoin("address", "by-zipcode", `?zipCode=${zipCode}`));
  }

  addProposalEvent(event) {
    return internalPost("proposal-event", event);
  }

  getEventsByProposal(proposalId) {
    return internalGet(urljoin("proposal-event", `?proposalId=${proposalId}`));
  }

  async login(login, password) {
    const payload = {
      login: login,
      password: password
    };
    const result = await internalPost(urljoin("user", "login"), payload);
    localStore.userToken = result.token;
    localStore.userId = result.userId;

    return internalPost(urljoin("user", "login"), payload);
  }
  updateProposal(proposal) {
    return internalPut(urljoin("proposal"), proposal);
  }

  setNextState(proposal, nextState) {
    const payload = {
      proposalId: proposal._id,
      nextState: nextState
    };
    return internalPost(urljoin("proposal", "set-next-state"), payload);
  }
  getServiceArea(proposalId) {
    return internalGet(urljoin("proposal", "get-service-area", proposalId));
  }
  async checkSession(token) {
    const payload = {
      token: token
    };

    return internalPost(urljoin("user-token", "check-session"), payload);
  }

  getAllUsers() {
    return internalGet("user");
  }

  getAllCompanies() {
    return internalGet("company");
  }

  getCurrentUser() {
    return internalGet(urljoin("user", localStore.userId));
  }

  getUserById(userId) {
    return internalGet(urljoin("user", userId));
  }

  checkAvailabilityForProduct(product, zipCode) {
    const payload = {
      product: product,
      zipCode: zipCode
    };
    return internalPost(urljoin("product", "check-availability"), payload);
  }

  getCompanyById(companyId) {
    return internalGet(urljoin("company", companyId));
  }

  updateCompany(company) {
    return internalPut("company", company);
  }

  updateUser(user) {
    return internalPut("user", user);
  }

  createCompany(company) {
    return internalPost("company", company);
  }
  
   listPartner() {
    return internalGet("partner/list");
  }


  getAllProducts() {
    return internalGet("product");
  }

  getAllProfessions() {
    return internalGet("profession");
  }
}

export default new ApiClient();
