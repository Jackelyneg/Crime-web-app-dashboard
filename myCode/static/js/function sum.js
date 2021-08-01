function sum(a, b) {
    return Promise(function (resolve, reject) {
        setTimeout(function () {
            if (typeof a !== "number" || typeof b !== "number") {
            return reject(new TypeError("Inputs must be numbers"));
        }
        resolve(a + b);
    }, 1000);
});
}
var myPromise = sum(10,5);
myPromise.then(function (result) {
    document.write(" 10 + 5: ", result);
    return sum(null, "foo");
}).then(function () {
}).catch(function(err) {
    console.error(err);
});