// Import createStore & applyMiddleware functions from redux library
import { createStore, applyMiddleware } from 'redux';

// Import composeWithDevTools functions from redux-devtools-extension
import { composeWithDevTools } from 'redux-devtools-extension';

// Import redux-thunk middleware
import thunk from 'redux-thunk';

// Import our rootReducer
import rootReducer from './reducers';

const initialState = {};

// Declare the createStore as a variable with reducers and applyMiddleware function with thunk
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk))); 

export default store;
