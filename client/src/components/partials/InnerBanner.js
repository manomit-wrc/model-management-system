import React from 'react';

const InnerBanner = () => (
    <div className="inner-banner">
        <div className="overlay"></div>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="caption">
                        <h2>profile</h2>
                    </div>
                    <div className="bc-icons">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a className="white-text" href="index.html">
                                    <i className="material-icons mr-2">home</i>
                                    Home
                                </a>
                            </li>
                            <li className="breadcrumb-item active">
                                <i className="material-icons mr-2">
                                    person
                                </i>
                                Basic Information
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default InnerBanner;