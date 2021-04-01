const withTM = require('next-transpile-modules')(['three', '@react-three/drei']);

module.exports = withTM({
    webpack(config, { isServer }) {
        if (isServer) {
            require('./scripts/generate-sitemap');
        }
        return config;
    }
});
