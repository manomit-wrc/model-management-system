import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { login } from '../../actions/auth';
import LoaderButton from '../utils/LoaderButton';


const validate = values => {
    const errors = {}
    
    if (!values.email) {
      errors.email = 'Please enter email'
    } 
    if (!values.password) {
        errors.password = 'Please enter password'
    } 
    return errors
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <Fragment>
        <label className="">{label}</label>
        <input {...input} type={type} className="form-control" />
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
    </Fragment>
    
)

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showMessage: false,
            isLoading: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        console.log(this.props);
        if (this.props.auth.isAuthenticated) {
          this.props.history.push('/profile');
        }
      }
    
      componentWillReceiveProps(nextProps) {
        this.setState({
            showMessage: true,
            isLoading: false
        });
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/profile');
        }
    
       
    }


    handleSubmit(e) {
        this.setState({ isLoading: true });
        this.props.login(e);
    }

    renderMessage() {
        if(this.state.showMessage === true) {
            if(this.props.auth.isAuthenticated === false) {
                
                if(this.props.auth.user.success === false) {
                    return (
                        <div className="alert alert-danger login">{this.props.auth.user.message}</div>
                    );
                }
                
            }
            
        }
        else {
            return null;
        }
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="common-form-box login-box">
        
                <div className="common-form-box-tile">
                    <div className="row justify-content-md-center">

                       
                        <div className="col-md-5">

                            <div className="card mx-xl-5">
                                <div className="card-body">

                                    
                                    <div className="form-header deep-blue-gradient rounded">
                                        <h3 className="my-3">
                                            Login
                                        </h3>
                                    </div>

                                    <form onSubmit={handleSubmit(this.handleSubmit)}>  
                                        {this.renderMessage()}
                                        <div className="md-form font-weight-light">
                                            <Field name="email" component={renderField} label="Email" type="email" />
                                        </div>

                                    
                                        <div className="md-form font-weight-light">
                                            <Field name="password" component={renderField} label="Password" type="password" />
                                        </div>

                                    <p className="font-small blue-text d-flex justify-content-start">Forgot <a href="#" className="blue-text ml-1"> Password?</a></p>

                                    <div className="text-center mt-4">
                                        <LoaderButton
                                            type="submit"
                                            isLoading={this.state.isLoading}
                                            text="Submit"
                                            loadingText="Loading..."
                                        />
                                    </div>
                                    </form> 

                                </div>

                                
                                <div className="modal-footer text-center">
                                   
                                    <button type="button" className="btn btn-fb">
                                        <i className="fa fa-facebook pr-1"></i>  Facebook Login
                                    </button>
                                
                                    <button type="button" className="btn btn-gplus waves-effect waves-light">
                                        <i className="fa fa-google-plus pr-1"></i>  Google + Login
                                    </button>
                                    <p className="font-small grey-text d-flex justify-content-end mt-3">Not a member? <Link to="/signup" className="blue-text ml-1">Register</Link></p>
                                </div>

                            </div>

                        </div>
                        

                    </div>
                </div>

            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
}

Login = connect(mapStateToProps, { login })(reduxForm({
    form: 'login',
    validate,
    destroyOnUnmount: true
})(Login))

export default withRouter(Login);