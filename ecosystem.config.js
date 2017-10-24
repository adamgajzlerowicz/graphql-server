module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
        {
            name: 'graphql',
            script: 'server.js',
            interpreter: 'babel-node'
        }
    ]
};
