import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup, getIndustries } from '../../actions/auth';
import LoaderButton from '../utils/LoaderButton';
import _ from 'lodash';
import { Alert } from 'reactstrap';


const validate = values => {
    const errors = {}
    if (!values.first_name) {
      errors.first_name = 'Please enter first name'
    } else if (values.first_name.length < 2) {
      errors.first_name = 'Minimum be 2 characters or more'
    }
    if (!values.last_name) {
        errors.last_name = 'Please enter last name'
      } else if (values.last_name.length < 2) {
        errors.last_name = 'Minimum be 2 characters or more'
      }
    if (!values.email) {
      errors.email = 'Please enter email'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
    if (!values.password) {
        errors.password = 'Please enter password'
    } else if (values.password.length < 6) {
        errors.password = 'Minimum be 6 characters or more'
    }

    if (!values.confirm_password) {
        errors.confirm_password = 'Please enter confirm password'
    } else if (values.confirm_password.length < 6) {
        errors.confirm_password = 'Minimum be 6 characters or more'
    }
    if(values.password !== values.confirm_password) {
        errors.confirm_password = 'Password and confirm password must be same'
    }
    if(!values.industry) {
        errors.industry = 'Please select who you are';
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

const renderSelectField = ({ input, label, meta: { touched, error, warning }, children }) => (
    <Fragment>
        <select {...input} className="form-control">
          <option value="">Please select who you are</option>  
          {children}
        </select>
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
    </Fragment>
)

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showMessage: false,
            isLoading: false,
            visible: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.props.getIndustries();
    }

    componentWillReceiveProps(nexProps) {
        if(nexProps.data !== undefined) {
            this.setState({
                showMessage: true,
                isLoading: false,
                visible: true
            })
        }
        
    }

    handleSubmit(e) {
        this.setState({ isLoading: true });
        this.props.signup(e);
    }
    
    renderMessage() {
        if(this.state.showMessage === true) {
            if(this.props.data.success === true) {
                return (
                    
                    <Alert color="success" isOpen={this.state.visible} toggle={() => this.setState({ visible: false })}>
                        <h4 className="alert-heading">Congratulation!</h4>
                        <p>
                        Your registration has been completed successfully. Please check your email to verify your registration
                        </p>
                    </Alert>
                );
            }
            else {
                return (
                    <Alert color="danger" isOpen={this.state.visible} toggle={() => this.setState({ visible: false })}>
                        {this.props.data.message}
                    </Alert>
                );
            }
        }
        else {
            return null;
        }
    }
    render() {

        const { handleSubmit, touched, error, warning } = this.props;
        

        return (
            <div className="common-form-box register-box">
       
                <div className="common-form-box-tile">
                    <div className="row justify-content-md-center">

                        
                        <div className="col-md-5">

                            <div className="card mx-xl-5">
                                <div className="card-body">

                                    
                                    <div className="form-header deep-blue-gradient rounded">
                                        <h3 className="my-3">
                                            Register
                                        </h3>
                                    </div>

                                  <form onSubmit={handleSubmit(this.handleSubmit)}>  
                                    {this.renderMessage()}
                                    <div className="md-form font-weight-light">
                                        
                                        <Field name="first_name" component={renderField} label="First Name" type="text" />
                                    </div>
                                    
                                    <div className="md-form font-weight-light">
                                        
                                        <Field name="last_name" component={renderField} label="Last Name" type="text" />
                                    </div>
                                    
                                    <div className="md-form font-weight-light">
                                        <Field name="email" component={renderField} label="Email" type="email" />
                                    </div>

                                    
                                    <div className="md-form font-weight-light">
                                        <Field name="password" component={renderField} label="Password" type="password" />
                                    </div>
                                    
                                    <div className="md-form font-weight-light">
                                        <Field name="confirm_password" component={renderField} label="Confirm Password" type="password" />
                                    </div>

                                    <div className="md-form font-weight-light">
                                        <Field name="industry" component={renderSelectField}>
                                        { 
                                            _.map(this.props.industries, (ind, index) => {
                                                return <option key={index} value={ind._id}>{ind.name}</option>
                                            })
                                        }
                                        </Field>
                                    </div>
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
                                    
                                    
                                    <p className="font-small grey-text d-flex justify-content-end mt-3">Already have an account?
                                        
                                        <Link to="/login" className="blue-text ml-1">Login</Link>
                                    </p>
                                </div>

                            </div>

                        </div>
                        

                    </div>
                </div>

            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.auth.data,
        industries: state.auth.industries
    };
}

Signup = connect(mapStateToProps, { signup, getIndustries })(reduxForm({
    form: 'signup',
    validate,
    destroyOnUnmount: true
})(Signup))

export default Signup;