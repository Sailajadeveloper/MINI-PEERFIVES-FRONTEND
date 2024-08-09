const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
    plugins: [
        new NodePolyfillPlugin()
    ],
    fallback : {
        "crypto": require.resolve("crypto-browserify"),
        'os':false,
    }
}