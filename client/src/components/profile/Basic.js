import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import LoaderButton from '../../components/utils/LoaderButton';
import { userDetails, getIndustries } from '../../actions/auth';


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


const renderField = ({ input, label, type, value, meta: { touched, error, warning } }) => (
    <Fragment>
        <label className="">{label}</label>
        <input {...input} type={type} className="form-control" value={value} />
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
        <select {...input} className="form-control">
          <option value="">Please select who you are</option>  
          {children}
        </select>
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
    </Fragment>
)

class Basic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount() {
        this.props.getIndustries();
    }
    componentDidMount() {
        this.props.userDetails();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ user: nextProps.auth.user_details})
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
                            <div className="md-form">
                                <Field name="first_name" component={renderField} label="First Name" type="text" value="Manomit" />
                            </div>
                            <div className="md-form">
                                <Field name="last_name" component={renderField} label="Last Name" type="text" value="Manomit" />
                            </div>
                            <div className="md-form">
                                
                                <Field name="description" component={renderTextArea} label="About Me" value="" />
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="defaultInline1" name="inlineDefaultRadiosExample" />
                                <label className="custom-control-label" htmlFor="defaultInline1">Male</label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="defaultInline2" name="inlineDefaultRadiosExample" />
                                <label className="custom-control-label" htmlFor="defaultInline2">Female</label>
                            </div>
                            <div className="md-form">
                                <Field name="industry" component={renderSelectField}>
                                    { 
                                        _.map(this.props.industries, (ind, index) => {
                                            return <option key={index} value={ind._id}>{ind.name}</option>
                                        })
                                    }
                                </Field>
                            </div>
                            
                            
                            
                            <div className="md-form">
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
        auth: state.auth,
        industries: state.auth.industries
    }
}

Basic = connect(mapStateToProps, { userDetails, getIndustries })(reduxForm({
    form: 'basic_profile',
    validate,
    destroyOnUnmount: true
})(Basic))

export default Basic;