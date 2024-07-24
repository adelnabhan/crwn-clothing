import { compose, createStore, applyMiddleware } from "redux";
import logger from 'redux-logger';
import { rootReducer } from "./root-reducer";
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from './root-saga';

const sagaMiddleware = createSagaMiddleware();
const middleWares = [process.env.NODE_ENV === 'development' && logger, sagaMiddleware].filter(Boolean);
const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// root reducer
const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, undefined, composedEnhancers);
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);