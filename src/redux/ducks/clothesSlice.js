 import { createSlice } from "@reduxjs/toolkit";

 const clothesSlice = createSlice({
    name: "clothes",
    initialState: {
        loading: true,
        pants: [],
        shirts: [],
        shoes: [],
        chosenSets: [],
        currentSet: {
            shirt: null,
            pants: null,
            shoes: null
        }
    },
    reducers: {
        setClothes(state, action) {
            const clothesData = action.payload;

            state.shoes = clothesData.results.filter(cloth => {return  cloth.type === "shoes"});
            state.shirts = clothesData.results.filter(cloth => {return  cloth.type === "shirt"});
            state.pants = clothesData.results.filter(cloth => {return  cloth.type === "pants"});
            state.loading = false;
            //console.log(state.shirts);
            //return {...state, ...state.shoes, ...state.shirts, ...state.pants, ...state.loading};
        },
        addShirt(state, action) {
            state.currentSet.shirt = action.payload;
            console.log(state.currentSet.shirt);
        },
        addShoe(state, action){
            state.currentSet.shoe = action.payload;
            console.log(state.currentSet.shirt);
        }
    }
 });

 export const { setClothes, addShirt, addShoe } = clothesSlice.actions;

 export default clothesSlice.reducer;