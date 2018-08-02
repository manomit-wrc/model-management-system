import React from 'react';

const Footer = () => (
    <footer>
        <div className="footer_section">
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-sm-6 col-xs-6">
                        <div className="footer-sec">
                            <h3>Company Profile</h3>
                            <a href="index.html">
                                <img src="/img/logo.png" alt="" />
                            </a>
                            <p>Modelapp.com is an exciting model platform for new faces, aspiring models and professional models.
                                Our model network connects individuals with reputable agencies and photographers around the
                                world. Modeling industry professionals use our services regularly to find models and discover
                                new talent.</p>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-6">
                        <div className="footer-sec seconds">
                            <h3>Quick Links</h3>
                            <ul>
                                <li>
                                    <a href="">Models</a>
                                </li>
                                <li>
                                    <a href="">Agencies</a>
                                </li>
                                <li>
                                    <a href="">Photographers</a>
                                </li>
                                <li>
                                    <a href="">Castings</a>
                                </li>
                                <li>
                                    <a href="">Book a model</a>
                                </li>
                                <li>
                                    <a href="">Model memberships</a>
                                </li>
                                <li>
                                    <a href="">Photographer memberships</a>
                                </li>
                                <li>
                                    <a href="">Blog</a>
                                </li>
                                <li>
                                    <a href="">FAQ</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-6">
                        <div className="footer-sec seconds">
                            <h3>Disclaimers</h3>
                            <ul>
                                <li>
                                    <a href="about.html">About us</a>
                                </li>
                                <li>
                                    <a href="">Company details</a>
                                </li>
                                <li>
                                    <a href="">Pages</a>
                                </li>
                                <li>
                                    <a href="">Contact us</a>
                                </li>
                                <li>
                                    <a href="privacy.html">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="terms-of-use.html">Terms of use</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-6">
                        <div className="footer-sec">
                            <h3>Contact Us</h3>
                            <ul>
                                <li>
                                    <i className="fa fa-envelope"></i>
                                    <a href="#" target="_blank">support@modelapp.com</a>
                                </li>
                                <li>
                                    <i className="fa fa-phone"></i>1-888-998-9980</li>
                            </ul>

                            <div className="social-box">
                                <ul>
                                    <li>
                                        <a title="Facebook" href="https://www.facebook.com" target="_blank">
                                            <i className="fa fa-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a title="Twitter" href="https://twitter.com" target="_blank">
                                            <i className="fa fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a title="Linkedin" href="https://www.linkedin.com" target="_blank">
                                            <i className="fa fa-linkedin"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a title="Skype" href="tel:1-888-998-9980">
                                            <i className="fa fa-skype"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a title="Instagram" href="https://instagram.com" target="_blank">
                                            <i className="fa fa-instagram"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="copyright">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <p>Copyright &copy; 2011-2018 Model App.com
                            <span>|</span>All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;