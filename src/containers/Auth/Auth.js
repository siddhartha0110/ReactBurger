import React,{Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';

class Auth extends Component{

    state={
        controls:{
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail:true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength:6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp:true
    };

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirect!=="/"){
            this.props.onSetAuthRedirect()
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlname) => {
        const updatedControls = {
            ...this.state.controls,
            [controlname]:{
                ...this.state.controls[controlname],
                value:event.target.value,
                valid:this.checkValidity(event.target.value,this.state.controls[controlname].validation),
                touched:true
            }
        };
        this.setState({controls:updatedControls});
    }

    submitHandler=(event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
    }

    switchAuthHandler=()=>{
        this.setState(prevState=>{
            return{
                isSignUp:!prevState.isSignUp
            };
        })
    }

    render(){

        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form=formElementsArray.map(formele=>(
            <Input
            key={formele.id}
            elementType={formele.config.elementType}
            elementConfig={formele.config.elementConfig}
            value={formele.config.value}
            invalid={!formele.config.valid}
            shouldValidate={formele.config.validation}
            touched={formele.config.touched}
            changed={(event) => this.inputChangedHandler(event, formele.id)} 
            />
            
        ));

        if(this.props.loading){
            form=<Spinner/>; 
        }
        let errorMessage=null;

        if(this.props.error){
            errorMessage=(
                <p className={classes.Auth.p}>{this.props.error.message}</p>
            );
        }   

        let authRedirect=null;
        if(this.props.isAuthenticated){
            authRedirect=<Redirect to={this.props.authRedirect}/>
        }
        return(
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                <Button btnType="Success">SUBMIT</Button>
                </form>
                <p className={classes.Auth.p}><b>You are currently on {this.state.isSignUp?"SIGN UP PAGE":"SIGN IN PAGE"}</b></p>
                <Button 
                clicked={this.switchAuthHandler}
                btnType="Danger">SWITCH TO {this.state.isSignUp? "SIGN IN":"SIGN UP"}</Button>
            </div>
        );
    }
}

const mapStateToProps=state=>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token!==null,
        buildingBurger:state.burgerBuilder.building,
        authRedirect:state.auth.authRedirect
    };
};

const mapDispatchToProps=dispatch=>{
    return{
        onAuth:(email,password,isSignUp)=>dispatch(actions.auth(email,password,isSignUp)),
        onSetAuthRedirect:()=>dispatch(actions.setAuthRedirect("/"))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Auth);