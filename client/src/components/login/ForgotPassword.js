import React, { PureComponent, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { forgotPassword } from '../../actions/auth';
import LoaderButton from '../utils/LoaderButton';

import { ToastContainer, toast } from 'react-toastify';



const validate = values => {
    const errors = {}
    
    if (!values.email) {
      errors.email = 'Please enter email'
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

class ForgotPassword extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            showMessage: false,
            isLoading: false,
            visible: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
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
        this.setState({ isLoading: true, showMessage: false });
        console.log(this.state)
        this.props.forgotPassword(e);
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

ForgotPassword = connect(mapStateToProps, { forgotPassword })(reduxForm({
    form: 'forgot-password',
    validate
})(ForgotPassword))

export default withRouter(ForgotPassword);