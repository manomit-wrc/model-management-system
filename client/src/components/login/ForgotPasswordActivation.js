import React, { PureComponent, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { checkActivation, verifyActivation } from '../../actions/auth';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { changePasswordFP } from '../../actions/auth';
import LoaderButton from '../utils/LoaderButton';
import { ToastContainer, toast } from 'react-toastify';



const validate = values => {
    const errors = {}
    
    if (!values.email) {
      errors.email = 'Please enter email'
    }
    
    if (!values.new_password) {
        errors.new_password = 'Please enter new password'
    } else if (values.new_password.length < 6) {
        errors.new_password = 'Minimum be 6 characters or more'
    }

    if (!values.confirm_password) {
        errors.confirm_password = 'Please enter confirm password'
    } else if (values.confirm_password.length < 6) {
        errors.confirm_password = 'Minimum be 6 characters or more'
    }
    if(values.new_password !== values.confirm_password) {
        errors.confirm_password = 'New password and confirm password must be same'
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

class ForgotPasswordActivation extends PureComponent {

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
        let data = {};
        //this.props.checkActivation(data);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if(nextProps.data !== undefined) {
            this.setState({
                showMessage: true,
                isLoading: false,
                visible: true
            })
        }
        
    }

    verifyToken() {
        let data = {};
        
    }

    handleSubmit(e) {
        this.setState({ isLoading: true, showMessage: false });
        console.log(this.state)
        this.props.changePasswordFP(e);
        console.log(this.state)
        
    }

    renderMessage() {
        
        if(this.state.showMessage === true) {
            if(this.props.data!==null && this.props.data.success === true) {
                    toast.error(this.props.data.message, {
                        position: toast.POSITION.TOP_CENTER
                    })
                    
            }else if(this.props.data!==null && this.props.data.success === false){
                toast.error(this.props.data.message, {
                    position: toast.POSITION.TOP_CENTER
                })
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
                                        <div className="clearfix center">
                                            <h3 className="my-3 float-left">
                                                Forgot Password
                                            </h3>
                                            <a className="btn-floating btn-lg purple-gradient float-left" href="/"><i className="fa fa-home"></i></a>
                                            
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit(this.handleSubmit)}>  
                                        {this.renderMessage()}
                                        <ToastContainer />
                                        <div className="form-group">
                                            <Field name="email" component={renderField} label="Email" type="email" />
                                        </div>
                                        <div className="form-group">
                                            <Field name="new_password" component={renderField} label="New Password" type="password" />
                                        </div>
                                        <div className="form-group">
                                            <Field name="confirm_password" component={renderField} label="Confirm Password" type="password" />
                                        </div>

                                    <p className="font-small blue-text d-flex justify-content-start"><a href="/login" className="blue-text ml-1"> Login </a></p>

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
        data: state.auth.data
    };
}



export default connect(mapStateToProps, { changePasswordFP, })(reduxForm({
    form: 'change-password-fp',
    validate
})(ForgotPasswordActivation));