export default {
    sleep: async (time) => {
        return new Promise(resolve => {
            setTimeout(function () {
                resolve();
            }, time);
        });
    }
}