import { createStore,applyMiddleware } from 'redux';
import createSagaMiddleware,{END} from 'redux-saga';

import rootReducers from '../reducers/rootReducers'
const {logger} = require('redux-logger');
const sagaMiddleware = createSagaMiddleware();
const middlewares = [];
middlewares.push(sagaMiddleware);
/* global __DEV__  */
if (__DEV__) {
    middlewares.push(logger);
}
const crateStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
export default function configureStore(initialState) {
    const store = crateStoreWithMiddleware(rootReducers,initialState);
    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);
    return store;

}
// const store = createStore(
//     rootReducers,
//     applyMiddleware(createSagaMiddleware(helloSaga()))
// )