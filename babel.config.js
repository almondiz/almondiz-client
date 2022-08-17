module.exports = (api) => {
  api.cache(true);
  
  const presets = [
    ["@babel/preset-env"],
    ["@babel/preset-react"],
  ];

  const plugins = [
    "babel-plugin-react-scoped-css",
    
    // only develoment
    "react-refresh/babel",
  ];

  return {
    presets,
    plugins,
  }
}