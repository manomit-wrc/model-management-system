import React from 'react';

const CallToAction = () => (
    <div className="calltoaction">
        <div className="bg-transparency"></div>
        <div className="container">
            <div className="row">
                <div className="action-box">
                    <h2>Do You want to be a Model?</h2>
                    <p>If you are 5ft 8in and above women and think you have what it takes to be a model send us headshot and
                        full length shot along with your age, contact details, height, bust, waist and hip measurements.</p>
                    <form className="form-inline">
                        <div className="md-form my-0">
                            <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
                        </div>
                        <button className="btn btn-outline-white btn-md my-2 my-sm-0 ml-3" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
);

export default CallToAction;