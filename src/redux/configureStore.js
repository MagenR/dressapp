import { configureStore, combineReducers, getDefaultMiddleware} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import clothesReducer from "./ducks/clothesSlice";
import { handleGetClothesData } from "./sagas/handlers/clothes";

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
    clothes : clothesReducer
});

const store = configureStore({
    reducer,
    middleware: [...getDefaultMiddleware({thunk: false}), sagaMiddleware]
});

// Fetch the clothes on storea creation.
sagaMiddleware.run(handleGetClothesData);

export default store;