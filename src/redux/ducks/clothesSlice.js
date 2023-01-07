 import { createSlice } from "@reduxjs/toolkit";
 import sortByProperties from "../../components/SortByProperties";

// Properties to sort by the returned list.
const sortProperties = ['brand', 'name']; 

 const clothesSlice = createSlice({
    name: "clothes",
    initialState: {
        pants: [],
        shirts: [],
        shoes: [],
        chosenSets: [],
        currentSet: {
            shirts: null,
            pants: null,
            shoes: null
        }
    },
    reducers: {
        setClothes(state, action) {
            // Get the list from saga, sort it once by the properties for future renders.
            const clothesData = sortByProperties(action.payload.results, sortProperties);
            state.shoes = clothesData.filter(cloth => {return  cloth.type === "shoes"});
            state.shirts = clothesData.filter(cloth => {return  cloth.type === "shirt"});
            state.pants = clothesData.filter(cloth => {return  cloth.type === "pants"});
        },
        addClothing(state, action) {
            state.currentSet[action.payload.clothingType] = action.payload.clothing;
        },
        removeClothing(state, action) {
                state.chosenSets.push(state.currentSet);
                state.currentSet.shirts = null,
                state.currentSet.pants = null,
                state.currentSet.shoes = null
            }
        }
        
 });

 export const { setClothes, removeClothing, addClothing } = clothesSlice.actions;

 export default clothesSlice.reducer;