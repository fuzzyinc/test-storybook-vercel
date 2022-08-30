const webpack = require('webpack');

module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  },
  webpackFinal: (config) => {
    config.plugins.forEach((plugin, idx) => {
      if (plugin instanceof webpack.IgnorePlugin) {
        const originalExcludes = plugin.options.resourceRegExp.source;
        plugin.options.resourceRegExp = new RegExp(`${originalExcludes}|.*middleware\.ts`)
      }
    });

    console.log(config.plugins);

    return config;
  }
}
