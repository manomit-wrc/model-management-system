import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import SuperSelectField from 'material-ui-superselectfield';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import Slider from 'react-rangeslider';
import _ from 'lodash';
import LoaderButton from '../../components/utils/LoaderButton';
import { getAdditionalMasters, getAdditionalDetails, updateAdditionalDetails } from '../../actions/profile';
import { RingLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';




const validate = values => {
    const errors = {}
    if (values.discipline && values.discipline.length === 0 || (values.discipline === undefined)) {
        errors.discipline = 'Please select one or more discipline'
    }
    if(values.catalog && values.catalog.length === 0 || (values.catalog === undefined)) {
        errors.catalog = 'Please select one or more category';
    }
    if(!values.ethnicity) {
        errors.ethnicity = "Please select your enthncity"
    }
    if(!values.eye) {
        errors.eye = "Please select your eye color"
    }
    if(!values.hair_color) {
        errors.hair_color = "Please select your hair color"
    }

    if(!values.age) {
        errors.age = "Please enter your age"
    }
    if(values.age && isNaN(values.age)) {
        errors.age = "Should be number";
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

const renderMultiSelectField = ({ input, onselect, hintText, meta: { touched, error, warning }, children }) => (
    <Fragment>
        <div className={touched && error ? "has-danger": ""}>
            
            <SuperSelectField
                {...input}
                multiple
                checkPosition='left'
                className="form-control"
                hintText={hintText}
                onSelect={onselect}
                style={{ minWidth: 150, marginTop: 40 }}
                                menuCloseButton={<FlatButton label='close' hoverColor='lightSalmon' />}
                >
                {children}
            </SuperSelectField>
            {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </Fragment>
)




class Additional extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading:false,
            visible: false,
            weight: 40,
            height: 152,
            heap: 36,
            chest: 34,
            showMessage: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleWeight = this.handleWeight.bind(this);
        this.handleHeight = this.handleHeight.bind(this);
        this.handleHeap = this.handleHeap.bind(this);
        this.handleChest = this.handleChest.bind(this);
    }
    
    componentWillMount() {
        this.setState({ visible: true })
        this.props.getAdditionalDetails();
        this.props.getAdditionalMasters();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.initialized) {
           
            this.setState({ 
                visible: false,
                height: nextProps.additional_details !== undefined ? parseInt(nextProps.additional_details.height): 152,
                weight: nextProps.additional_details !== undefined ? parseInt(nextProps.additional_details.weight): 40, 
                heap: nextProps.additional_details !== undefined ? parseInt(nextProps.additional_details.heap): 36,
                chest: nextProps.additional_details !== undefined ? parseInt(nextProps.additional_details.chest): 34
            })
        }
        if(nextProps.submitSucceeded && nextProps.data !== undefined) {
            this.setState({
                showMessage: true,
                isLoading: false
            })
        }
        
    }


    handleSubmit(e) {
        
        let data = {};
        data.ethnicity = e.ethnicity;
        data.age = e.age;
        data.dress = e.dress;
        data.catalog = e.catalog;
        data.discipline = e.discipline;
        data.eye = e.eye;
        data.hair_color = e.hair_color;
        data.height = this.state.height;
        data.weight = this.state.weight;
        data.heap = this.state.heap;
        data.chest = this.state.chest;
        
        this.props.updateAdditionalDetails(data);
        this.setState({ isLoading: true })
        
    }

    handleWeight = value => {
        this.setState({
          weight: value
        })
      };


    handleHeight = value => {
        this.setState({
            height: value
        })
    };

    handleHeap = value => {
        this.setState({
            heap: value
        })
    }
    handleChest = value => {
        this.setState({
            chest: value
        })
    }

    handleSelection = (values, name) => console.log(values, name);

    renderMessage() {
        if(this.state.showMessage === true) {
            
            if(this.props.data.success === true) {
                toast.success(this.props.data.message, {
                    position: toast.POSITION.TOP_CENTER
                })
            }
            else {
                toast.error(this.props.data.message, {
                    position: toast.POSITION.TOP_CENTER
                })
            }
            this.setState({
                showMessage: false
            });
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
                            <ToastContainer />
                            <div className="form-group">
                            <Field name="discipline" 
                                component={renderMultiSelectField} 
                                hintText="Please select one or more disciplines"
                                onselect={this.handleSelection.bind(this)}
                            >
                                    { 
                                        _.map(this.props.additional_masters.discipline, (ind, index) => {
                                            return <div key={ind._id} label={ind.name} value={ind._id}>{ind.name}</div>
                                        })
                                    }
                            </Field>  
                            
                            </div>
                            <div className="form-group">
                            <Field name="catalog" 
                                component={renderMultiSelectField} 
                                hintText="Please select one or more categories"
                                onselect={this.handleSelection.bind(this)}
                            >
                                    { 
                                        _.map(this.props.additional_masters.catalog, (ind, index) => {
                                            return <div key={ind._id} label={ind.name} value={ind._id}>{ind.name}</div>
                                        })
                                    }
                            </Field>  
                            
                            </div>
                            <div className="form-group">
                                <Field name="ethnicity" component={renderSelectField} label="Please select ethnticity">
                                    { 
                                        _.map(this.props.additional_masters.ethnicity, (ind, index) => {
                                            return <option key={index} value={ind._id}>{ind.name}</option>
                                        })
                                    }
                                </Field>
                            </div>
                            <div className="form-group">
                                <Field name="eye" component={renderSelectField} label="Please select your eye color">
                                    { 
                                        _.map(this.props.additional_masters.eyes, (ind, index) => {
                                            return <option key={index} value={ind._id}>{ind.name}</option>
                                        })
                                    }
                                </Field>
                            </div>
                            <div className="form-group">
                                <Field name="hair_color" component={renderSelectField} label="Please select your hair color">
                                    { 
                                        _.map(this.props.additional_masters.hair_color, (ind, index) => {
                                            return <option key={index} value={ind._id}>{ind.name}</option>
                                        })
                                    }
                                </Field>
                            </div>
                            
                            <div className="form-group">
                                <Field name="age" component={renderField} label="Your age" type="number" />
                            </div>

                            <div className="form-group">
                                <label>Your weight ( Kg )</label>
                                <Slider
                                    name="weight"
                                    min={0}
                                    max={100}
                                    value={this.state.weight}
                                    onChange={this.handleWeight}
                            />
                            </div>

                            <div className="form-group">
                                <label>Your height ( Cm )</label>
                                <Slider
                                    name="height"
                                    min={0}
                                    max={250}
                                    value={this.state.height}
                                    onChange={this.handleHeight}
                            />
                            </div>
                            <div className="form-group">
                                <label>Your heap ( Cm )</label>
                                <Slider
                                    name="heap"
                                    min={0}
                                    max={50}
                                    value={this.state.heap}
                                    onChange={this.handleHeap}
                            />
                            </div>

                            <div className="form-group">
                                <label>Your chest ( Cm )</label>
                                <Slider
                                    name="chest"
                                    min={0}
                                    max={50}
                                    value={this.state.chest}
                                    onChange={this.handleChest}
                            />
                            </div>

                            <div className="form-group">
                                <Field name="dress" component={renderField} label="Your dress" type="text" />
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
        initialValues: state.profile.additional_details,
        additional_details: state.profile.additional_details,
        additional_masters: state.profile.additional_masters,
        data: state.profile.data
    }
}

Additional = connect(mapStateToProps, { 
    getAdditionalDetails, 
    getAdditionalMasters,
    updateAdditionalDetails
})(reduxForm({
    form: 'additional_profile',
    validate,
    enableReinitialize: true
})(Additional))

export default Additional;