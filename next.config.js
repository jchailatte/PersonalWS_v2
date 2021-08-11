const withTM = require('next-transpile-modules')(['three']);

module.exports = withTM({
    webpack(config, { isServer }) {
        if (isServer) {
            require('./scripts/generate-sitemap');
        }
        return config;
    },
    eslint: {
        ignoreDuringBuilds: true
    }
});