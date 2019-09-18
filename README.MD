# Social Media App - Developer Hub

## Summary
For this project I will build a social media application for developers where you can create a developer profile, share posts and get help from
other developers, using **NODE.JS.js** & **EXPRESS** for the Back-end, **REACT** for the Front-end, **REDUX** for state management, and **MongoDB** as my database.

### Tasks
- [X] Build an API (Node.js and Express).
- [X] Setup Database (mongoDB).
- [X] User SignUp
- [X] Validation (Bcyrpt Password/Hashing)
- [X] Protect Routes with middleware and JWT.
- [X] C.R.U.D (API).
- [ ] Create React App an integrated with back-end (API).
- [ ] Create store with Redux.

## **NodeJS Back-End**

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

### ./package.json
```
"scripts": {
  "start": "node server",
  "api":  "nodemon server",
  "client": "npm start --prefix client",
  "dev": "concurrently \"npm run api\" \"npm run client\""
}
```

## **React Front-End**

### Dependencies (npm i)
- **axios**: Axios is a standalone third party package that is frequently used in React apps for managing network requests and fetching some amount of data. It is a promise-based HTTP client that works both in the browser and in a node.js environment. 
- **react-router-dom**: https://reacttraining.com/react-router/web/guides/quick-start It contains the DOM bindings for React Router. In other words, the router components for websites. With react-router-dom we get an actual implementation of react-router that works specifically on the browser.
- **redux**: is a state management library that makes creating complex apps a little bit easier. Redux can be used with any other JavaScript framework or library, like Angular.
- **react-redux**: is the official Redux UI binding library for React. If you are using Redux and React together, you should also use React Redux to bind these two libraries.
- **redux-thunk**: Is a function that gets called with every action we dispatch. It has the ability to Stop, Modify, or otherwise mess with actions. One of the most popular use for this middleware is for dealing with async actions.
- **redux-devtools-extension**: is for debugging application's state changes. The extension provides power-ups for your Redux development workflow.
- **moment**: is a free and open source JavaScript library that removes the need to use the native JavaScript Date object directly
- **react-moment**: if you're using moment and react together, this library helps you bind them together.
- **uuid**: Universally unique identifier (UUID) is an identifier standard used in software construction. is a 128-bit number used to uniquely identify some object or entity on the Internet.

### Links & Tools
- Font Awesome: `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.css" integrity="sha256-PF6MatZtiJ8/c9O9HQ8uSUXr++R9KBYu4gbNG5511WE="crossorigin="anonymous" />`
- Semantic UI: https://semantic-ui.com/ is a modern front-end development framework, powered by LESS and jQuery. It has a sleek, subtle, and flat design look that provides a lightweight user experience.


### client/package.json
```
"proxy": "http://localhost:4000"
```



