module.exports = {
  presets: [
   ["@babel/preset-env",{
    "targets": {
      "browsers": [ "last 2 Chrome versions, last 2 Firefox versions" ]
    },
   }],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: [
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread",
    "@babel/proposal-optional-chaining",
    //["@babel/plugin-transform-typescript",{ isTSX: true, allExtensions: true }],
    [
      "import",
      {
        libraryName: "antd",
        libraryDirectory: "es",
        style: true
      }
    ]
  ],
  ignore: ["node_modules/**"],
  env: {
    test: {
      plugins: [
        [
          "import",
          {
            libraryName: "antd",
            libraryDirectory: "lib",
            style: true
          }
        ]
      ]
    }
  }
};
