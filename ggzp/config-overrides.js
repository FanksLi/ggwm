const { override, fixBabelImports, addLessLoader } = require('customize-cra');
module.exports = function override(config, env) {
  // do stuff with the webpack config...
  return config;
};
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    // style: 'css',
	style: true
  }),
  addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: { '@brand-primary': '#1da57a', "@brand-primary-tap": "#1DA57A", },
      },
  }),
);