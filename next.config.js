  
const withTM = require('next-transpile-modules')(['three', '@react-three/drei']);

//refer to this once they update to @react-three/fiber and see what can be used
//https://github.com/pmndrs/react-three-next
//prob also install @react-three/postprocessing 
//^refer to the package.json

module.exports = withTM({
    webpack(config, { isServer }) {
        if (isServer) {
            require('./scripts/generate-sitemap');
        }
        return config;
    }
});