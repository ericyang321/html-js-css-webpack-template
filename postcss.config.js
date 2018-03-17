const autoprefixer = require('autoprefixer');
const minifier = require('cssnano');

const isProd = process.env.NODE_ENV === 'production';
const plugins = [];

if (isProd) {
  plugins.push(autoprefixer);
  plugins.push(
    minifier({
      discardComments: {
        removeAll: true,
      },
    }),
  );
}

module.exports = {
  plugins,
};
