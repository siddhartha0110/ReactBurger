import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState={
    token:null,
    userID:null,
    error:null,
    loading:false,
    authRedirect:"/"
};

const authStart=(state,action)=>{
    return updateObject(state,{error:null,loading:true});  
}

const authSuccess=(state,action)=>{
    return updateObject(state,{
        token:action.idToken,
        userID:action.userID,
        error:null,
        loading:false
    });
}

const authFailure=(state,action)=>{
    return updateObject(state,{
        error:action.error,
        loading:false
    });
};

const logOut=(state,action)=>{
    return updateObject(state,{token:null,userID:null});
};

const setAuthRedirect=(state,action)=>{
    return updateObject(state,{authRedirect:action.path});
};

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.AUTH_START:return authStart(state,action)
        case actionTypes.AUTH_SUCCESS:return authSuccess(state,action) 
        case actionTypes.AUTH_FAILURE:return authFailure(state,action)
        case actionTypes.LOG_OUT:return logOut(state,action)
        case actionTypes.SET_AUTH_REDIRECT:return setAuthRedirect(state,action)
         default:
             return state;   
    }
};

export default reducer;