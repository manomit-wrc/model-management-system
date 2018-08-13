import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import LoaderButton from '../../components/utils/LoaderButton';
import { 
    userDetails, 
    getIndustries, 
    getCountries,
    getStates 
} from '../../actions/auth';


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
    return errors
}


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    
    <Fragment>
        <label className="">{label}</label>
        <input {...input} type={type} className="form-control"/>
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
    </Fragment>
    
)

const renderTextArea = ({ input, label, value, meta: { touched, error, warning } }) => (
    <Fragment>
        <label className="">{label}</label>
        <textarea {...input} className="md-textarea form-control" rows="3">{value}</textarea>
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
    </Fragment>
)

const renderSelectField = ({ input, label, meta: { touched, error, warning }, children }) => (
    <Fragment>
        <label>{label}</label>
        <select {...input} className="form-control">
          {children}
        </select>
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
    </Fragment>
)

class Basic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading:false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
    
    componentWillMount() {
        this.props.userDetails();
        this.props.getIndustries();
        this.props.getCountries();
        let data = {};
        data.country = "5b4f4c85a8b5d36b2eda9cad";
        this.props.getStates(data);
    }

    handleSubmit(e) {
        
    }

    
    render() {
        
        const { handleSubmit } = this.props;
        
        
        return (
            <div className="col-md-9">
                <div className="main">
                    <div className="content-box">
                        <form onSubmit={handleSubmit(this.handleSubmit)}>
                           
                            <div>
                                <Field name="first_name" component={renderField} label="First Name" type="text" />
                            </div>
                            <div>
                                <Field name="last_name" component={renderField} label="Last Name" type="text" />
                            </div>
                            <div>
                                
                                <Field name="description" component={renderTextArea} label="About Me"/>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="defaultInline1" name="inlineDefaultRadiosExample" />
                                <label className="custom-control-label" htmlFor="defaultInline1">Male</label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="defaultInline2" name="inlineDefaultRadiosExample" />
                                <label className="custom-control-label" htmlFor="defaultInline2">Female</label>
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
                                <Field name="city" component={renderField} label="City" type="text" value="" />
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
        states: state.auth.states
    }
}

Basic = connect(mapStateToProps, { 
    userDetails, 
    getIndustries, 
    getCountries,
    getStates 
})(reduxForm({
    form: 'basic_profile',
    validate,
    destroyOnUnmount: true
})(Basic))

export default Basic;