// get babel runtime version
const package = require('./package.json');
const runtimeVersion = package.dependencies['@babel/runtime-corejs3'].replace('^', '');

module.exports = {
  presets: [
    ['@babel/env', {
        modules: false,
        bugfixes: true,
    }],
    ['@babel/typescript', {
        onlyRemoveTypeImports: true,
        allowDeclareFields: true,
    }],
  ],
  plugins: [
    ['@babel/proposal-decorators', { legacy: true }],
    ['@babel/proposal-class-properties', { loose: true }],
    ['@babel/proposal-object-rest-spread'],
    ['@babel/proposal-nullish-coalescing-operator'],
    ['@babel/proposal-optional-chaining'],
    ['@babel/transform-runtime', {
      version: runtimeVersion,
      proposals: true,
    }],
    ['polyfill-corejs3', {
      method: 'usage-pure',
    }]    
  ],
  ignore: ['src/@types', /[/\\]core-js/, /@babel[/\\]runtime/],
};


// [
//   '@babel/transform-runtime',
//   {
//     version: runtimeVersion,
//     corejs: 3,
//     proposals: true,
//     helpers: true,
//     useESModules: true,
//   },
// ],