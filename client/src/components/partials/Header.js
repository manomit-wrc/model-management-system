import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <header>
        <div className="header-top">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="left-address">
                            <ul>
                                <li>
                                    <i className="fa fa-phone"></i> +1 800 833 9780 </li>
                                <li>
                                    <i className="fa fa-map-marker"></i> New York, Anne Street, bl. 43 </li>
                                <li>
                                    <i className="fa fa-calendar"></i> Mon-Sat: 08:00-22:00 </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="right-social pull-right">
                            <ul>
                                <li>Find us on:</li>
                                <li>
                                    <a target="_blank" href="">
                                        <i className="fa fa-facebook-f"></i>
                                    </a>
                                </li>
                                <li>
                                    <a target="_blank" href="">
                                        <i className="fa fa-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a target="_blank" href="">
                                        <i className="fa fa-instagram"></i>
                                    </a>
                                </li>
                                <li>
                                    <a target="_blank" href="">
                                        <i className="fa fa-youtube-play"></i>
                                    </a>
                                </li>
                                <li>
                                    <a target="_blank" href="">
                                        <i className="fa fa-linkedin"></i>
                                    </a>
                                </li>
                                <li>
                                    <a target="_blank" href="">
                                        <i className="fa fa-google-plus"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#search">
                                        <i className="fa fa-search"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="search">
            <button type="button" className="close">
                ×
            </button>
            <form>
                <input type="search" value="" placeholder="type keyword(s) here" />
                <button type="submit" className="btn btn-purple">Search</button>
            </form>
        </div>
        
        <div className="header-bottom">
            <div className="container">
                <div className="row">
                    <div className="col-md-2">
                        <div className="logo">
                            <Link to="/">
                                <img src="/img/logo.png" alt="logo" />  
                            </Link>
                            
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="menu pull-right">
                            <nav className="navbar navbar-expand-lg navbar-dark">
                                <button aria-label="Toggle navigation" aria-expanded="false" aria-controls="navbarSupportedContent-3" data-target="#navbarSupportedContent-3"
                                    data-toggle="collapse" type="button" className="navbar-toggler">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div id="navbarSupportedContent-3" className="collapse navbar-collapse">
                                    <ul className="navbar-nav mr-auto">
                                        <li className="nav-item active">
                                            <a href="profile.html" className="nav-link waves-effect waves-light">
                                                Profile
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            
                                            <Link to="/signup" className="nav-link waves-effect waves-light">Sign Up</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/login" className="nav-link waves-effect waves-light">Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <a href="jobs-list.html" className="nav-link waves-effect waves-light">
                                                Jobs List
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="models-list.html" className="nav-link waves-effect waves-light">
                                                Models
                                            </a>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a aria-expanded="false" aria-haspopup="true" data-toggle="dropdown" id="navbarDropdownMenuLink-3" className="nav-link dropdown-toggle waves-effect waves-light">Castings
                                            </a>
                                            <div aria-labelledby="navbarDropdownMenuLink-3" className="dropdown-menu dropdown-default">
                                                <a href="#" className="dropdown-item waves-effect waves-light">See all castings</a>
                                                <a href="#" className="dropdown-item waves-effect waves-light">Post casting</a>
                                                <a href="#" className="dropdown-item waves-effect waves-light">Learn more</a>
                                            </div>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a aria-expanded="false" aria-haspopup="true" data-toggle="dropdown" id="navbarDropdownMenuLink-3" className="nav-link dropdown-toggle waves-effect waves-light">Rankings
                                            </a>
                                            <div aria-labelledby="navbarDropdownMenuLink-3" className="dropdown-menu dropdown-default">
                                                <a href="#" className="dropdown-item waves-effect waves-light">See all rankings</a>
                                                <a href="#" className="dropdown-item waves-effect waves-light">Top female model influencers</a>
                                                <a href="#" className="dropdown-item waves-effect waves-light">Sexiest female models</a>
                                                <a href="#" className="dropdown-item waves-effect waves-light">Sexiest male models</a>
                                                <a href="#" className="dropdown-item waves-effect waves-light">Top male model influencers</a>
                                                <a href="#" className="dropdown-item waves-effect waves-light">classNameiest redhead models</a>
                                                <a href="#" className="dropdown-item waves-effect waves-light">Best brunette models</a>
                                                <a href="#" className="dropdown-item waves-effect waves-light">Coolest blonde models</a>
                                                <a href="#" className="dropdown-item waves-effect waves-light">Top lingerie models</a>
                                                <a href="#" className="dropdown-item waves-effect waves-light">Coolest tattoo models</a>
                                                <a href="#" className="dropdown-item waves-effect waves-light">Top tall female models</a>
                                                <a href="#" className="dropdown-item waves-effect waves-light">Best petite models</a>
                                                <a href="#" className="dropdown-item waves-effect waves-light">Top images of the month</a>
                                            </div>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a aria-expanded="false" aria-haspopup="true" data-toggle="dropdown" id="navbarDropdownMenuLink-3" className="nav-link dropdown-toggle waves-effect waves-light">Industry members
                                            </a>
                                            <div aria-labelledby="navbarDropdownMenuLink-3" className="dropdown-menu dropdown-default">
                                                <a href="#" className="dropdown-item waves-effect waves-light">Photographers</a>
                                                <a href="#" className="dropdown-item waves-effect waves-light">Model agencies</a>
                                                <a href="#" className="dropdown-item waves-effect waves-light">Fashion Stylists</a>
                                                <a href="#" className="dropdown-item waves-effect waves-light">Hair and Make Up Artists</a>
                                                <a href="#" className="dropdown-item waves-effect waves-light">Industry professionals</a>
                                            </div>
                                        </li>
                                        <li className="nav-item dropdown profile-dropdown">
                                            <a aria-expanded="false" aria-haspopup="true" data-toggle="dropdown" id="navbarDropdownMenuLink-3" className="nav-link dropdown-toggle waves-effect waves-light">
                                                <img src="/img/model-avatar.jpg" className="rounded-circle" alt="" />
                                            </a>
                                            <div aria-labelledby="navbarDropdownMenuLink-3" className="dropdown-menu dropdown-default">
                                                <h4>
                                                    Sneha Roy
                                                </h4>
                                                <a href="#" className="dropdown-item waves-effect waves-light">Success stories</a>
                                                <a href="#" className="dropdown-item waves-effect waves-light">modelStyle</a>
                                                <a href="#" className="dropdown-item waves-effect waves-light">myNews</a>
                                                <a href="#" className="dropdown-item waves-effect waves-light">Blog</a>
                                                <a href="#" className="dropdown-item waves-effect waves-light">Modeling advice</a>
                                                <a href="#" className="dropdown-item waves-effect waves-light">Fresh Faces</a>
                                                <a href="#" className="dropdown-item waves-effect waves-light">Apps</a>
                                                <a href="#" className="dropdown-item waves-effect waves-light">About us</a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
);

export default Header;