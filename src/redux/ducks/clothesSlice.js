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
        },
        addShirt(state, action) {
            state.currentSet.shirt = action.payload;
            console.log(state.currentSet.shirt);
        },
        addShoe(state, action) {
            state.currentSet.shoes = action.payload;
            console.log(state.currentSet.shoes);
        },
        addPants(state, action) {
            state.currentSet.pants = action.payload;
            console.log(state.currentSet.pants);
        },
        removeClothing(state, action) {
                state.chosenSets.push(state.currentSet);
                state.currentSet.shirt = null,
                state.currentSet.pants = null,
                state.currentSet.shoes = null
            }
        }
        
 });

 export const { setClothes, addShirt, addPants, addShoe, removeClothing } = clothesSlice.actions;

 export default clothesSlice.reducer;