import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseSuccess=(id,orderData)=>{
    return{
        type:actionTypes.PURCHASE_SUCCESS,
        orderId:id,
        orderData:orderData
    };
};

export const purchaseFail=(error)=>{
    return{
        type:actionTypes.PURCHASE_FAILURE,
        error:error
    };
};

export const purchaseStart=()=>{
    return{
        type:actionTypes.PURCHASE_START,
    };
};

export const purchaseBurger=(orderData)=>{
    return dispatch=>{
        dispatch(purchaseStart());
        axios.post( '/orders.json', orderData )
        .then( response => {
            dispatch(purchaseSuccess(response.data.name,orderData));
        } )
        .catch( error => {
            dispatch(purchaseFail(error));
        } );
    };
};

export const purchaseInit=()=>{
    return{
        type:actionTypes.PURCHASE_INIT
    };
};

export const fetchOrdersSuccess=(orders)=>{
    return{
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    };
};

export const fetchOrdersFail=(error)=>{
    return{
        type:actionTypes.FETCH_ORDERS_FAILURE,
        error:error
    };
};

export const fetchOrdersStart=()=>{
    return{
        type:actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders=()=>{
    return dispatch=>{
        dispatch(fetchOrdersStart());
        axios.get('/orders.json')
    .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
            fetchedOrders.push({
                ...res.data[key],
                id: key
            });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
    })
    .catch(err => {
        dispatch(fetchOrdersFail(err));
    });
    }
    
}