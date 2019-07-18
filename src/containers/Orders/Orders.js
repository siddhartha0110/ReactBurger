import React, { Component } from 'react';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    componentDidMount() {
       this.props.onLoadOrders(this.props.token,this.props.userID);
    }

    render () {
        let ord=<Spinner/>;
        if(this.props.loading){ 
            ord= this.props.orders.map(order => (
                <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ))
        }
        return (
            <div>
               {ord}
            </div>
        );
    }
}

const mapStateToProps=state=>{
    return{
        orders:state.order.orders,
        loading:state.order.loading,
        token:state.auth.token,
        userID:state.auth.userID
    };
};

const mapDispatchToProps=dispatch=>{
    return{
        onLoadOrders:(token,userID)=>dispatch(actions.fetchOrders(token,userID))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));