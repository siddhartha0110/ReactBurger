export const updateObject=(oldObject,newState)=>{
    return{
        ...oldObject,
        ...newState
    };
};