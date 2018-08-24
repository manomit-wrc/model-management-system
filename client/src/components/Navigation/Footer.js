import React, { Fragment } from 'react';

const Footer = () => (
    <Fragment>
        <footer class="main-footer dark-footer  ">
            <div class="container">
                <div class="row">
                    <div class="col-md-3">
                        <div class="footer-widget fl-wrap">
                            <h3>About Us</h3>
                            <div class="footer-contacts-widget fl-wrap">
                                <p>In ut odio libero, at vulputate urna. Nulla tristique mi a massa convallis cursus. Nulla eu mi magna. Etiam suscipit commodo gravida. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam. </p>
                                <ul  class="footer-contacts fl-wrap">
                                    <li><span><i class="fa fa-envelope-o"></i> Mail :</span><a href="#" target="_blank">yourmail@domain.com</a></li>
                                    <li> <span><i class="fa fa-map-marker"></i> Adress :</span><a href="#" target="_blank">USA 27TH Brooklyn NY</a></li>
                                    <li><span><i class="fa fa-phone"></i> Phone :</span><a href="#">+7(111)123456789</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="footer-widget fl-wrap">
                            <h3>Our Last News</h3>
                            <div class="widget-posts fl-wrap">
                                <ul>
                                    <li class="clearfix">
                                        <a href="#"  class="widget-posts-img"><img src="/images/all/1.jpg" class="respimg" alt="" /></a>
                                        <div class="widget-posts-descr">
                                            <a href="#" title="">Vivamus dapibus rutrum</a>
                                            <span class="widget-posts-date"> 21 Mar 09.05 </span> 
                                        </div>
                                    </li>
                                    <li class="clearfix">
                                        <a href="#"  class="widget-posts-img"><img src="/images/all/1.jpg" class="respimg" alt="" /></a>
                                        <div class="widget-posts-descr">
                                            <a href="#" title=""> In hac habitasse platea</a>
                                            <span class="widget-posts-date"> 7 Mar 18.21 </span> 
                                        </div>
                                    </li>
                                    <li class="clearfix">
                                        <a href="#"  class="widget-posts-img"><img src="/images/all/1.jpg" class="respimg" alt="" /></a>
                                        <div class="widget-posts-descr">
                                            <a href="#" title="">Tortor tempor in porta</a>
                                            <span class="widget-posts-date"> 7 Mar 16.42 </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="footer-widget fl-wrap">
                            <h3>Our  Twitter</h3>
                            <div id="footer-twiit"></div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="footer-widget fl-wrap">
                            <h3>Subscribe</h3>
                            <div class="subscribe-widget fl-wrap">
                                <p>Want to be notified when we launch a new template or an udpate. Just sign up and we'll send you a notification by email.</p>
                                <div class="subcribe-form">
                                    <form id="subscribe">
                                        <input class="enteremail" name="email" id="subscribe-email" placeholder="Email" spellcheck="false" type="text" />
                                        <button type="submit" id="subscribe-button" class="subscribe-button"><i class="fa fa-rss"></i> Subscribe</button>
                                        <label for="subscribe-email" class="subscribe-message"></label>
                                    </form>
                                </div>
                            </div>
                            <div class="footer-widget fl-wrap">
                                <div class="footer-menu fl-wrap">
                                    <ul>
                                        <li><a href="#">Home </a></li>
                                        <li><a href="#">Blog</a></li>
                                        <li><a href="#">Listing</a></li>
                                        <li><a href="#">Contacts</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sub-footer fl-wrap">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="about-widget">
                                        <img src="/images/logo.png" alt="" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="copyright"> &#169; CityBook 2018 .  All rights reserved.</div>
                                </div>
                                <div class="col-md-4">
                                    <div class="footer-social">
                                        <ul>
                                            <li><a href="#" target="_blank" ><i class="fa fa-facebook-official"></i></a></li>
                                            <li><a href="#" target="_blank"><i class="fa fa-twitter"></i></a></li>
                                            <li><a href="#" target="_blank" ><i class="fa fa-chrome"></i></a></li>
                                            <li><a href="#" target="_blank" ><i class="fa fa-vk"></i></a></li>
                                            <li><a href="#" target="_blank" ><i class="fa fa-whatsapp"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        </footer>
        <div class="main-register-wrap modal">
            <div class="main-overlay"></div>
            <div class="main-register-holder">
                <div class="main-register fl-wrap">
            <div class="close-reg"><i class="fa fa-times"></i></div>
            <h3>Sign In <span>City<strong>Book</strong></span></h3>
            <div class="soc-log fl-wrap">
                <p>For faster login or register use your social account.</p>
                <a href="#" class="facebook-log"><i class="fa fa-facebook-official"></i>Log in with Facebook</a>
                <a href="#" class="twitter-log"><i class="fa fa-twitter"></i> Log in with Twitter</a>
            </div>
            <div class="log-separator fl-wrap"><span>or</span></div>
            <div id="tabs-container">
                <ul class="tabs-menu">
                    <li class="current"><a href="#tab-1">Login</a></li>
                    <li><a href="#tab-2">Register</a></li>
                </ul>
                <div class="tab">
                    <div id="tab-1" class="tab-content">
                    <div class="custom-form">
                        <form method="post"  name="registerform">
                            <label>Username or Email Address * </label>
                            <input name="email" type="text" value="" /> 
                            <label >Password * </label>
                            <input name="password" type="password" value="" /> 
                            <button type="submit"  class="log-submit-btn"><span>Log In</span></button> 
                            <div class="clearfix"></div>
                            <div class="filter-tags">
                                <input id="check-a" type="checkbox" name="check" />
                                <label for="check-a">Remember me</label>
                            </div>
                        </form>
                        <div class="lost_password">
                            <a href="#">Lost Your Password?</a>
                        </div>
                    </div>
                    </div>
                    <div class="tab">
                    <div id="tab-2" class="tab-content">
                        <div class="custom-form">
                            <form method="post"   name="registerform" class="main-register-form" id="main-register-form2">
                                <label >First Name * </label>
                                <input name="name" type="text"  value="" /> 
                                <label>Second Name *</label>
                                <input name="name2" type="text" value="" />
                                <label>Email Address *</label>
                                <input name="email" type="text" value="" />                                              
                                <label >Password *</label>
                                <input name="password" type="password"  value="" /> 
                                <button type="submit"     class="log-submit-btn"  ><span>Register</span></button> 
                            </form>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>

        <a class="to-top"><i class="fa fa-angle-up"></i></a>
    </Fragment>
);

export default Footer;