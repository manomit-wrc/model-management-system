import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import LoaderButton from '../../components/utils/LoaderButton';
import { 
    userDetails, 
    getIndustries, 
    getCountries,
    getStates,
    updateUserDetails 
} from '../../actions/auth';
import { RingLoader } from 'react-spinners'



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
    if (!values.description) {
        errors.description = 'Please enter description'
    }
    if(!values.industry) {
        errors.industry = 'Please select who you are';
    }
    if(!values.location) {
        errors.location = "Please enter your address"
    }
    if(!values.country) {
        errors.country = "Please select your country"
    }
    if(!values.state) {
        errors.state = "Please select your state"
    }

    if(!values.city) {
        errors.city = "Please enter your city"
    }
    if(!values.pincode) {
        errors.pincode = "Please enter your pincode"
    }
   
    if(values.pincode && values.pincode.length !== 6) {
        
        errors.pincode = "Should have 6 digits";
    }
    if(values.pincode && isNaN(values.pincode)) {
        errors.pincode = "Should be number";
    }
    if(!values.phone_number) {
        errors.phone_number = "Please enter your mobile no";
    }
    if(values.phone_number && values.phone_number.length !== 10) {
        errors.phone_number = "Should have 10 digits";
    }
    if(values.phone_number && isNaN(values.phone_number)) {
        errors.phone_number = "Should be number";
    }
   
    return errors
}


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    
    <Fragment>
        <div className={touched && error ? "has-danger": ""}>
            <label className="">{label}</label>
            <input {...input} type={type} className={"form-control " + (touched && error ? "form-control-danger": "") }/>
            {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </Fragment>
    
)

const renderTextArea = ({ input, label, value, meta: { touched, error, warning } }) => (
    <Fragment>
        <div className={touched && error ? "has-danger": ""}>
            <label className="">{label}</label>
            <textarea {...input} className="md-textarea form-control" rows="3">{value}</textarea>
            {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </Fragment>
)

const renderSelectField = ({ input, label, meta: { touched, error, warning }, children }) => (
    <Fragment>
        <div className={touched && error ? "has-danger": ""}>
            <label>{label}</label>
            
            <select {...input} className={"form-control " + (touched && error ? "form-control-danger": "") }>
            <option value="">Please select</option>
            {children}
            </select>
            {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </Fragment>
)

const renderRadio = ({ input, label, type, id, meta: { touched, error, warning }, children }) => (
    <Fragment>
        <div className={touched && error ? "has-danger": ""}>
            
            <input {...input} id={id} type={type} className={"custom-control-input " + (touched && error ? "form-control-danger": "") }/>
            <label className="custom-control-label" htmlFor={id}>{label}</label>
            {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </Fragment>
)

class Basic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading:false,
            showMessage: false,
            visible: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
    
    componentWillMount() {
        
        this.setState({ visible: true })

        this.props.userDetails();
        this.props.getIndustries();
        this.props.getCountries();
        let data = {};
        data.country = "5b4f4c85a8b5d36b2eda9cad";
        this.props.getStates(data);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.initialized === true) {
            this.setState({ visible: false });
        }
    }

    handleSubmit(e) {
        this.setState({ isLoading: true });
        this.props.updateUserDetails(e);
    }

    

    renderMessage() {
        if(this.state.showMessage === true) {
            if(this.props.data.success === true) {
                return (
                    <div className="alert alert-success alert-dismissible">
                            
                        {this.props.data.message}
                    </div>
                );
            }
            else {
                return (
                    <div className="alert alert-danger alert-dismissible">
                            
                     {this.props.data.message}
                    </div>
                );
            }
        }
        else {
            return null;
        }
    }

    
    render() {
        const { handleSubmit } = this.props;
       
        return (
            <div className="col-md-9">
            {
                this.state.visible ? (
                    <div style={{width:'100%', height: '100%', textAlign: 'center'}}>
                        <RingLoader
                        size={150}
                        color={'#44C2F7'}
                        loading={true}
                        />
                    </div>
                ) : null
            }
                 
                <div className="main">
                    <div className="content-box">
                        <form onSubmit={handleSubmit(this.handleSubmit)}>
                            {this.renderMessage()}
                            <div className="form-group">
                                <Field name="first_name" component={renderField} label="First Name" type="text" />
                            </div>
                            <div>
                                <Field name="last_name" component={renderField} label="Last Name" type="text" />
                            </div>
                            <div>
                                
                                <Field name="description" component={renderTextArea} label="About Me"/>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                
                                <Field name="gender" component={renderRadio} label="Male" id="defaultInline1" type="radio" value="M" />
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <Field name="gender" component={renderRadio} label="Female" id="defaultInline2" type="radio" value="F" />
                            </div>
                            <div>
                                <Field name="phone_number" component={renderField} label="Mobile No" type="text" />
                            </div>
                            <div>
                                
                                <Field name="location" component={renderTextArea} label="Location"/>
                            </div>
                            <div>
                                <Field name="industry" component={renderSelectField} label="Please select who you are">
                                    { 
                                        _.map(this.props.industries, (ind, index) => {
                                            return <option key={index} value={ind._id}>{ind.name}</option>
                                        })
                                    }
                                </Field>
                            </div>

                            <div>
                                <Field name="country" id="country" ref="country" component={renderSelectField} label="Select Country">
                                    { 
                                        _.map(this.props.countries, (ind, index) => {
                                            return <option key={index} value={ind._id}>{ind.name}</option>
                                        })
                                    }
                                </Field>
                            </div>

                            <div>
                                <Field name="state" id="state" component={renderSelectField} label="Select State">
                                    { 
                                        _.map(this.props.states, (ind, index) => {
                                            return <option key={index} value={ind._id}>{ind.name}</option>
                                        })
                                    }
                                </Field>
                            </div>

                            <div>
                                <Field name="city" component={renderField} label="City" type="text"  />
                            </div>

                             <div>
                                <Field name="pincode" component={renderField} label="Pincode" type="text" />
                            </div>
                            
                            
                            
                            <div>
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
        )
    }
}


const mapStateToProps = (state) => {
    return {
        initialValues: state.auth.user_details,
        auth: state.auth,
        industries: state.auth.industries,
        countries: state.auth.countries,
        states: state.auth.states,
        data: state.auth.data
    }
}

Basic = connect(mapStateToProps, { 
    userDetails, 
    getIndustries, 
    getCountries,
    getStates,
    updateUserDetails 
})(reduxForm({
    form: 'basic_profile',
    validate,
    enableReinitialize: true
})(Basic))

export default Basic;