import React, { Component } from 'react';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    componentDidMount() {
       this.props.onLoadOrders();
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
        loading:state.order.loading
    };
};

const mapDispatchToProps=dispatch=>{
    return{
        onLoadOrders:()=>dispatch(actions.fetchOrders())
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));