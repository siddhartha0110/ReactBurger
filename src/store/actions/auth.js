import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart=()=>{
    return{
        type:actionTypes.AUTH_START
    };
};

export const authSuccess=(token,userID)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        userID:userID
    };
};

export const authFail=(error)=>{
    return{
        type:actionTypes.AUTH_FAILURE,
        error:error
    };
};

export const logOut=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return{
        type:actionTypes.LOG_OUT
    };
};

export const checkAuth=(expirationTime)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logOut());
        },expirationTime*1000);
    };
};

export const auth=(email,password,isSignUp)=>{
    return dispatch=>{
        dispatch(authStart());
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAeQlC8yMJLnXPdGKtezHQEd7nxjcfS4J0';
        if(!isSignUp){
            url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAeQlC8yMJLnXPdGKtezHQEd7nxjcfS4J0';
        }
        axios.post(url,authData)
        .then(response=>{
            console.log(response);
            const expirationDate=new Date(new Date().getTime()+response.data.expiresIn*1000);
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('userId',response.data.localId);
            dispatch(authSuccess(response.data.idToken,response.data.localId));
            dispatch(checkAuth(response.data.expiresIn));
        })
        .catch(err=>{
            dispatch(authFail(err.response.data.error));
        });
    };
};

export const setAuthRedirect=(path)=>{
    return{
        type:actionTypes.SET_AUTH_REDIRECT,
        path:path
    };
};

export const authCheckState=()=>{
    return dispatch=>{
        const token=localStorage.getItem('token');
        if(!token){
            dispatch(logOut());
        }
        else{
            const expirationDate=new Date(localStorage.getItem('expirationDate'));
            if(expirationDate<new Date()){
                dispatch(logOut());
            }
            else{
                const userId=localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(checkAuth((expirationDate.getTime()-new Date().getTime())/1000));
            }
            
        }
    };
};