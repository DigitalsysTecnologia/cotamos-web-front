import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import createPersistedState from 'vuex-persistedstate'


const axios = require('axios');
const urljoin = require('url-join');


function getUrl() {
    return process.env.baseUrl
    // if (window.location.host.indexOf('localhost') != -1) {
    //   return 'http://localhost:8080/api/v1'
    // }
    // else {
    //   return 'https://backend.cotamos.com/gateway/api/v1'
    // }
}

function internalRequest(method, url, data, userToken) {
    let baseUrl = getUrl();

    return axios({
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'apiKey': userToken
        },
        crossdomain: true,
        url: urljoin(baseUrl, url),
        data: data
    }).then(function (res) {
        if (res.data)
            return res.data;

        return null;
    }).catch(function (err) {
        var exception = {};

        if (err.response && err.response.data) {
            exception.data = err.response.data;
            exception.statusCode = err.response.status
        }

        throw exception;
    });
}

function internalDelete(url, data, userToken) {
    return internalRequest('delete', url, null, userToken);
}

function internalGet(url, userToken) {
    return internalRequest('get', url, null, userToken);
}

function internalPost(url, data, userToken) {
    return internalRequest('post', url, data, userToken);
}

function internalPut(url, data, userToken) {
    return internalRequest('put', url, data, userToken);
}


let plugins = []
if (process.browser) {
    let vuexLocalStorage = new VuexPersist({
      key: 'cotamos', // The key to store the state on in the storage provider.
      storage: window.localStorage, // or window.sessionStorage or localForage
    })
    plugins = [vuexLocalStorage.plugin] ;

    console.log('plugins', plugins)
}

// const vuexPersist = new VuexPersist({
//     key: 'cotamos-app',
//     storage: window.localStorage
//   })

const defaultStore = () => {
    return new Vuex.Store({
        plugins: plugins,
        state: {
            userToken: '',
            loading: false,
            proposalList: [],
            isLogged: false
        },
        mutations: {
            setUserToken(state, userToken) {
                state.userToken = userToken
            },
        },
        actions: {
            async getProposalsByFilter({ state }, payload) {
                const result = await internalPost('proposal/list-by-filter', payload, state.userToken);
                state.proposalList = result
            },
            async doLogin({ state }, payload) {
                const loginResult = await internalPost(urljoin('user', 'login'), payload, state.userToken);
                state.userToken = loginResult.token;

                localStorage.setItem('userToken', loginResult.token)
                state.isLogged = true;
                console.log('loginResult', loginResult)
            }
        }
    })
}

export default defaultStore