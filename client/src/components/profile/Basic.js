import React, { Component } from 'react';

class Basic extends Component {
    render() {
        return (
            <div className="col-md-9">
                <div className="main">
                    <div className="content-box">
                        <form>
                            <div className="md-form">
                                <input type="text" id="" className="form-control" />
                                <label htmlFor="">First Name</label>
                            </div>
                            <div className="md-form">
                                <input type="text" id="" className="form-control" />
                                <label htmlFor="">Last Name</label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="defaultInline1" name="inlineDefaultRadiosExample" />
                                <label className="custom-control-label" htmlFor="defaultInline1">Male</label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="defaultInline2" name="inlineDefaultRadiosExample" />
                                <label className="custom-control-label" htmlFor="defaultInline2">Female</label>
                            </div>
                            <div className="materialSelect">
                                <ul className="select">
                                    <li data-selected="true"> Select Category</li>
                                    <li data-value="0">First option</li>
                                    <li data-value="1">Second option</li>
                                    <li data-value="2">Third option</li>
                                </ul>
                                <div className="message">Please select something</div>
                            </div>
                            <div className="materialSelect">
                                <ul className="select">
                                    <li data-selected="true"> Select Discipline</li>
                                    <li data-value="0">First option</li>
                                    <li data-value="1">Second option</li>
                                    <li data-value="2">Third option</li>
                                </ul>
                                <div className="message">Please select something</div>
                            </div>
                            <div className="md-form">
                                <input type="text" id="" className="form-control" />
                                <label htmlFor="">Age</label>
                            </div>
                            <div className="md-form">
                                <input type="text" id="" className="form-control" />
                                <label htmlFor="">Height</label>
                            </div>
                            <div className="materialSelect">
                                <ul className="select">
                                    <li data-selected="true"> Select Language</li>
                                    <li data-value="0">First option</li>
                                    <li data-value="1">Second option</li>
                                    <li data-value="2">Third option</li>
                                </ul>
                                <div className="message">Please select something</div>
                            </div>
                            <div className="md-form">
                                <textarea type="text" id="" className="md-textarea form-control" rows="3"></textarea>
                                <label htmlFor="">Description</label>
                            </div>
                            <div className="md-form">
                                <input type="text" id="" className="form-control" />
                                <label htmlFor="">Mobile Number</label>
                            </div>
                            <div className="md-form">
                                <textarea type="text" id="" className="md-textarea form-control" rows="3"></textarea>
                                <label htmlFor="">Address</label>
                            </div>
                            <div className="materialSelect">
                                <ul className="select">
                                    <li data-selected="true"> Select Industry Type</li>
                                    <li data-value="0">First option</li>
                                    <li data-value="1">Second option</li>
                                    <li data-value="2">Third option</li>
                                </ul>
                                <div className="message">Please select something</div>
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

export default Basic;