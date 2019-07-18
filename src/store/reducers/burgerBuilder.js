import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    ingredients:null,
    totalPrice: 20,
    error:false,
    building:false
};

const INGREDIENT_PRICES = {
    salad: 20,
    cheese: 30,
    meat: 100,
    bacon: 130
};

const addIngredient=(state,action)=>{
    const updatedIngredient={[action.ingredientName]:state.ingredients[action.ingredientName]+1}
            const updatedIngredients=updateObject(state.ingredients,updatedIngredient);
            const updatedState={
                ingredients:updatedIngredients,
                totalPrice:state.totalPrice+INGREDIENT_PRICES[action.ingredientName],
                building:true
            }
            return updateObject(state,updatedState);  
};

const removeIngredient=(state,action)=>{
    const updatedIng={[action.ingredientName]:state.ingredients[action.ingredientName]-1}
        const updatedIngs=updateObject(state.ingredients,updatedIng);
        const updatedSt={
            ingredients:updatedIngs,
            totalPrice:state.totalPrice-INGREDIENT_PRICES[action.ingredientName],
            building:true
        }
        return updateObject(state,updatedSt);
};

const setIngredients=(state,action)=>{
    return updateObject(state,{
        ingredients:action.ingredients,
        totalPrice:20,
        error:false,
        building:false});
 
};

const fetchFail=(state,action)=>{
    return updateObject(state,{error:true})
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:return addIngredient(state,action);
        case actionTypes.REMOVE_INGREDIENT:return removeIngredient(state,action);
        case actionTypes.SET_INGREDIENT:return setIngredients(state,action);      
        case actionTypes.FETCH_ING_FAILED:return fetchFail(state,action);
        default:return state;
    }
};

export default reducer;