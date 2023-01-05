import {call, put} from "redux-saga/effects";
import { setClothes } from "../../ducks/clothesSlice";

export function* handleGetClothesData(action) {
    try {
        const response = yield fetch('http://www.mocky.io/v2/5e3940013200005e00ddf87e');
        const data = yield response.json();
        yield put(setClothes({...data}));
    } catch(error) {
        console.log(error);
    }
}