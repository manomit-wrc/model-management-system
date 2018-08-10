import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { changePassword } from '../../actions/auth';


const validate = values => {
    const errors = {}
    
    if (!values.old_password) {
        errors.old_password = 'Please enter old password'
    } else if (values.old_password.length < 6) {
        errors.old_password = 'Minimum be 6 characters or more'
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

class ChangePassword extends Component{

    constructor(props) {
        super(props);
        this.state = {
            showMessage: false,
            isLoading: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentWillReceiveProps(nexProps) {
        if(nexProps.data !== undefined) {
            console.log(nexProps.data)
            this.setState({
                showMessage: true,
                isLoading: false
            })
        }
        
    }

    handleSubmit(e) {
        this.setState({ isLoading: true });
        this.props.changePassword(e);
    }

    renderMessage() {
        if(this.state.showMessage === true) {
            if(this.props.data.success === true) {
                return (
                    <div className="alert alert-success change-password">{this.props.data.message}</div>
                );
            }
            else {
                return (
                    <div className="alert alert-danger change-password">{this.props.data.message}</div>
                );
            }
        }
        else {
            return null;
        }
    }

    render(){
        const { handleSubmit } = this.props;

        return(
            <div className="col-md-9">
                <div className="main">
                    <div className="content-box">
                        <form onSubmit={handleSubmit(this.handleSubmit)}>
                            {this.renderMessage()}
                            <div className="md-form">
                                <Field name="old_password" component={renderField} label="Old Password" type="password" />
                            </div>
                            <div className="md-form">
                                <Field name="new_password" component={renderField} label="New Password" type="password" />
                            </div>
                            <div className="md-form">
                                <Field name="confirm_password" component={renderField} label="Confirm Password" type="password" />
                            </div>
                            
                            <div className="md-form">
                                <button className="btn btn-primary waves-effect waves-light" type="submit">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        data: state.auth.data
    }
}

ChangePassword = connect(mapStateToProps, { changePassword })(reduxForm({
    form: 'change-password',
    validate,
    destroyOnUnmount: true
})(ChangePassword))

export default ChangePassword;