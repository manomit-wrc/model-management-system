import React from 'react';

const Sidebar = () => (
    <div className="col-md-3">
        <div className="sidebar">
            <ul>
                <li className="active">
                    <a href="profile.html">
                        <i className="material-icons">
                            person
                        </i>

                        Basic Information
                    </a>
                </li>
                <li>
                    <a href="profile2.html">
                        <i className="material-icons">
                            info
                        </i>
                        Additional Details
                    </a>
                </li>
                <li>
                    <a href="profile3.html">
                        <i className="material-icons">
                            add_a_photo
                        </i>
                        Images
                    </a>
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
                <li>
                    <a href="profile7.html">
                        <i className="material-icons">
                            lock
                        </i>
                        Change Password
                    </a>
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

export default Sidebar;