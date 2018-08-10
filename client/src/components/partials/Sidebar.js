import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Sidebar extends Component {

    

    render() {
        
        return (
            <div className="col-md-3">
                <div className="sidebar">
                    <ul>
                        <li className={"" + (this.props.pathName === "/profile" ? 'active' : '')}>
                            
                            <Link to="/profile">
                                <i className="material-icons">
                                        person
                                </i>
                                Basic Information
                            </Link>
                        </li>
                        <li className={"" + (this.props.pathName === "/profile2" ? 'active' : '')}>
                            <a href="profile2.html">
                                <i className="material-icons">
                                    info
                                </i>
                                Additional Details
                            </a>
                        </li>
                        <li className={"" + (this.props.pathName === "/images" ? 'active' : '')}>
                            <Link to="/images">
                                <i className="material-icons">
                                add_a_photo
                                </i>
                                Images
                            </Link>
                            
                        </li>
                        <li>
                            <a href="profile4.html">
                                <i className="material-icons">
                                    video_call
                                </i>
                                Videos
                            </a>
                        </li>
                        <li>
                            <a href="profile5.html">
                                <i className="material-icons">
                                    group_add
                                </i>
                                Invite People
                            </a>
                        </li>
                        <li>
                            <a href="profile6.html">
                                <i className="material-icons">
                                    plus_one
                                </i>
                                Followers
                            </a>
                        </li>
                        <li className={"" + (this.props.pathName === "/change-password" ? 'active' : '')}>
                            <Link to="/change-password">
                                <i className="material-icons">
                                    lock
                                </i>
                                Change Password
                            </Link>
                            
                        </li>
                        <li>
                            <a href="profile8.html">
                                <i className="material-icons">
                                    subscriptions
                                </i>
                                Subscription Status
                            </a>
                        </li>
                        <li>
                            <a href="profile9.html">
                                <i className="material-icons">
                                    calendar_today
                                </i>
                                Bookings
                            </a>
                        </li>
                        <li>
                            <a href="profile10.html">
                                <i className="material-icons">
                                    settings
                                </i>
                                Settings
                            </a>
                        </li>
                        <li>
                            <a href="profile11.html">
                                <i className="material-icons">
                                    business_center
                                </i>
                                Jobs
                            </a>
                        </li>
                        <li>
                            <a href="login.html">
                                <i className="material-icons">
                                    exit_to_app
                                </i>
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default withRouter(Sidebar);