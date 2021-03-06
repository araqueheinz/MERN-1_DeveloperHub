# Express, Scripts & all Dependencies.

### Dependencies (npm i)

- **express**: is a layer built on the top of the Node.js that helps manage a server and routes.
- **express-validator**: is an Express middleware library that you can incorporate in your apps for server-side data validation.
- **bcryptjs**: allows us to build a password security platform that scales with computation power and always hashes every password with a salt.
- **config**: allows developers to configure their applications in an XML block instead of hard-coding values inside their scripts or in JSON objects.
- **gravatar**: is an image that follows you from site to site appearing beside your name when you do things like comment or post on a blog.
- **jsonwebtoken**: is a compact and self-contained way for securely transmitting information between parties as a JSON object.
- **mongoose**: is an object data modeling (ODM) library that provides a rigorous modeling environment for your data.
- **request**: is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects by default.

### Dev Dependencies (npm i --save-dev)
- **nodemon**: is a development dependency that monitors for any changes in your Node.js application and automatically restarts the server.
- **concurrently**: Concurrently is an npm package that allows you to run multiple commands one after another.
- **eslint**: ESLint is an open source project created to provide a pluggable linting utility for JavaScript.
- **eslint-config-airbnb-base**: This package provides Airbnb's base JS .eslintrc as an extensible shared config.Our default export contains all of our ESLint rules, including ECMAScript 6+. It requires `eslint` and `eslint-plugin-import`.
- **eslint-plugin-import**: eslint-plugin-import is a peer dependency for eslint-config-airbnb-base.

### Usage:
- **eslint, eslint-config-airbnb-base, eslint-plugin-import**: create a `.eslintrc.js` with the following contents: 
```
module.exports = { "extends": "airbnb-base", }
```
and a `.eslintignore`:
```
node_modules
.env
```

### Scripts
```
"start": "node server",
"api":  "nodemon server"
```