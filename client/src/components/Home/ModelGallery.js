import React, { Component } from 'react';
import Lightbox from 'react-images';
import { connect } from 'react-redux';
import { getModelList } from '../../actions/cms'
import _ from 'lodash';

class ModelGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image_gallery: [],
            isLoading: false,
            photoIndex: 0,
            isOpen: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.data.users !== undefined) {
            this.setState({
                image_gallery: nextProps.data.users
            })
        }
       
    }

    componentWillMount() {
        this.props.getModelList();
    }

    render() {
        const { photoIndex, isOpen, image_gallery } = this.state;
        
        return  (
                <div className="model-gallery">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="container-fluid">
                                    <div className="heading">
                                        <h2>Portfolio Gallery</h2>
                                        <h3>The most talented professionals.</h3>
                                    </div>
                                    <br />
                                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active btn btn-purple" id="showall-tab" data-toggle="pill" href="#showall" role="tab" aria-controls="showall"
                                                aria-selected="true">Show All</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link btn btn-purple" id="Cars-tab" data-toggle="pill" href="#Cars" role="tab" aria-controls="Cars" aria-selected="false">Model</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link btn btn-purple" id="City-tab" data-toggle="pill" href="#City" role="tab" aria-controls="City" aria-selected="false">Agency</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link btn btn-purple" id="Forest-tab" data-toggle="pill" href="#Forest" role="tab" aria-controls="Forest" aria-selected="false">Photographer</a>
                                        </li>
                                    </ul>

                                    <div className="tab-content" id="pills-tabContent">
                                        <div className="tab-pane fade show active" id="showall" role="tabpanel" aria-labelledby="showall-tab">
                                            {
                                                _.map(this.state.image_gallery, (img, index) => {
                                                    return (
                                                        <div key={index} className="Portfolio vertical-item gallery-item content-absolute text-center">
                                                            <a href="#!">
                                                                <img className="" src={img.src} alt={img.caption} />
                                                            </a>
                                                            <div className="item-media">
                                                                <div className="media-links">
                                                                    <div className="links-wrap">
                                                                        <a href="" title="" className="p-view prettyPhoto ">
                                                                            <i className="fa fa-user-o"></i>
                                                                        </a>
                                                                        <a href="javascript:void(0)" title="" className="p-link">
                                                                            <i className="fa fa-search"  onClick={() => this.setState({ isOpen: true, photoIndex: 0 })} ></i>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="item-content theme_background">
                                                                <h4 className="item-meta">
                                                                    <a href="model-single.html">{img.caption}</a>
                                                                </h4>
                                                            </div>
                                                        
                                                        </div>
                                                    )
                                                })
                                            }

                                            <Lightbox
                                                currentImage={this.state.photoIndex}
                                                images={this.state.image_gallery}
                                                isOpen={this.state.isOpen}
                                                onClickPrev={() =>
                                                    this.setState({
                                                        photoIndex: (photoIndex + this.state.image_gallery.length - 1) % this.state.image_gallery.length,
                                                    })
                                                }
                                                onClickNext={() =>
                                                    this.setState({
                                                        photoIndex: (photoIndex + 1) % this.state.image_gallery.length,
                                                    })
                                                }
                                                onClose={() => this.setState({ isOpen: false, photoIndex: 0 })}
                                            />
                                           
                                        </div>
                                        <div className="tab-pane fade" id="Cars" role="tabpanel" aria-labelledby="Cars-tab">
                                            <div className="Portfolio vertical-item gallery-item content-absolute text-center">
                                                <a href="#!">
                                                    <img className="" src="/img/gallery/portfolio1.jpg" alt="" />
                                                </a>
                                                <div className="item-media">
                                                    <div className="media-links">
                                                        <div className="links-wrap">
                                                            <a href="" title="" className="p-view prettyPhoto ">
                                                                <i className="fa fa-user-o"></i>
                                                            </a>
                                                            <a href="" title="" className="p-link">
                                                                <i className="fa fa-search"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item-content theme_background">
                                                    <h4 className="item-meta">
                                                        <a href="model-single.html">Isabella Mack</a>
                                                    </h4>
                                                </div>

                                            </div>
                                            <div className="Portfolio vertical-item gallery-item content-absolute text-center">
                                                <a href="#!">
                                                    <img className="" src="/img/gallery/portfolio2.jpg" alt="" />
                                                </a>
                                                <div className="item-media">
                                                    <div className="media-links">
                                                        <div className="links-wrap">
                                                            <a href="" title="" className="p-view prettyPhoto ">
                                                                <i className="fa fa-user-o"></i>
                                                            </a>
                                                            <a href="" title="" className="p-link">
                                                                <i className="fa fa-search"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item-content theme_background">
                                                    <h4 className="item-meta">
                                                        <a href="model-single.html">Isabella Mack</a>
                                                    </h4>
                                                </div>

                                            </div>
                                            <div className="Portfolio vertical-item gallery-item content-absolute text-center">
                                                <a href="#!">
                                                    <img className="" src="/img/gallery/portfolio3.jpg" alt="" />
                                                </a>
                                                <div className="item-media">
                                                    <div className="media-links">
                                                        <div className="links-wrap">
                                                            <a href="" title="" className="p-view prettyPhoto ">
                                                                <i className="fa fa-user-o"></i>
                                                            </a>
                                                            <a href="" title="" className="p-link">
                                                                <i className="fa fa-search"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item-content theme_background">
                                                    <h4 className="item-meta">
                                                        <a href="model-single.html">Isabella Mack</a>
                                                    </h4>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="City" role="tabpanel" aria-labelledby="City-tab">
                                            <div className="Portfolio vertical-item gallery-item content-absolute text-center">
                                                <a href="#!">
                                                    <img className="" src="/img/gallery/portfolio4.jpg" alt="" />
                                                </a>
                                                <div className="item-media">
                                                    <div className="media-links">
                                                        <div className="links-wrap">
                                                            <a href="" title="" className="p-view prettyPhoto ">
                                                                <i className="fa fa-user-o"></i>
                                                            </a>
                                                            <a href="" title="" className="p-link">
                                                                <i className="fa fa-search"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item-content theme_background">
                                                    <h4 className="item-meta">
                                                        <a href="model-single.html">Isabella Mack</a>
                                                    </h4>
                                                </div>

                                            </div>
                                            <div className="Portfolio vertical-item gallery-item content-absolute text-center">
                                                <a href="#!">
                                                    <img className="" src="/img/gallery/portfolio5.jpg" alt="" />
                                                </a>
                                                <div className="item-media">
                                                    <div className="media-links">
                                                        <div className="links-wrap">
                                                            <a href="" title="" className="p-view prettyPhoto ">
                                                                <i className="fa fa-user-o"></i>
                                                            </a>
                                                            <a href="" title="" className="p-link">
                                                                <i className="fa fa-search"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item-content theme_background">
                                                    <h4 className="item-meta">
                                                        <a href="model-single.html">Isabella Mack</a>
                                                    </h4>
                                                </div>

                                            </div>
                                            <div className="Portfolio vertical-item gallery-item content-absolute text-center">
                                                <a href="#!">
                                                    <img className="" src="/img/gallery/portfolio6.jpg" alt="" />
                                                </a>
                                                <div className="item-media">
                                                    <div className="media-links">
                                                        <div className="links-wrap">
                                                            <a href="" title="" className="p-view prettyPhoto ">
                                                                <i className="fa fa-user-o"></i>
                                                            </a>
                                                            <a href="" title="" className="p-link">
                                                                <i className="fa fa-search"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item-content theme_background">
                                                    <h4 className="item-meta">
                                                        <a href="model-single.html">Isabella Mack</a>
                                                    </h4>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="Forest" role="tabpanel" aria-labelledby="Forest-tab">
                                            <div className="Portfolio vertical-item gallery-item content-absolute text-center">
                                                <a href="#!">
                                                    <img className="" src="/img/gallery/portfolio7.jpg" alt="" />
                                                </a>
                                                <div className="item-media">
                                                    <div className="media-links">
                                                        <div className="links-wrap">
                                                            <a href="" title="" className="p-view prettyPhoto ">
                                                                <i className="fa fa-user-o"></i>
                                                            </a>
                                                            <a href="" title="" className="p-link">
                                                                <i className="fa fa-search"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item-content theme_background">
                                                    <h4 className="item-meta">
                                                        <a href="model-single.html">Isabella Mack</a>
                                                    </h4>
                                                </div>

                                            </div>
                                            <div className="Portfolio vertical-item gallery-item content-absolute text-center">
                                                <a href="#!">
                                                    <img className="" src="/img/gallery/portfolio8.jpg" alt="" />
                                                </a>
                                                <div className="item-media">
                                                    <div className="media-links">
                                                        <div className="links-wrap">
                                                            <a href="" title="" className="p-view prettyPhoto ">
                                                                <i className="fa fa-user-o"></i>
                                                            </a>
                                                            <a href="" title="" className="p-link">
                                                                <i className="fa fa-search"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item-content theme_background">
                                                    <h4 className="item-meta">
                                                        <a href="model-single.html">Isabella Mack</a>
                                                    </h4>
                                                </div>

                                            </div>
                                            <div className="Portfolio vertical-item gallery-item content-absolute text-center">
                                                <a href="#!">
                                                    <img className="" src="/img/gallery/portfolio9.jpg" alt="" />
                                                </a>
                                                <div className="item-media">
                                                    <div className="media-links">
                                                        <div className="links-wrap">
                                                            <a href="" title="" className="p-view prettyPhoto">
                                                                <i className="fa fa-user-o"></i>
                                                            </a>
                                                            <a href="" title="" className="p-link">
                                                                <i className="fa fa-search"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item-content theme_background">
                                                    <h4 className="item-meta">
                                                        <a href="model-single.html">Isabella Mack</a>
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

const mapStateToProps = (state) => {
    return {
        data: state.cms.data
    };
};
export default connect(mapStateToProps, { getModelList })(ModelGallery);

