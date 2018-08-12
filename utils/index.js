let queryParams = {};

export default {
    sleep: async (time) => {
        return new Promise(resolve => {
            setTimeout(function() {
                resolve();
            }, time);
        });
    },
    saveLandingQueryParams: function(obj) {
        queryParams = obj;
    },
    getLandingQueryParams: function() {
        return queryParams;
    },

}