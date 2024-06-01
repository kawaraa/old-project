module.exports = {
  entry: ["babel-polyfill", __dirname + "/frontend/react/app.js"],
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env", "@babel/preset-react"] },
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  output: { path: __dirname + "/frontend/public", filename: "bundle.js" },
  resolve: { extensions: ["*", ".js", ".jsx"] },
};
