import React, { Component } from 'react';
import { Player } from 'video-react';


class VideoGallery extends Component {
    render() {
        return (
            <div className="col-md-9">
                <div className="main">
                    <div className="content-box">
                        <form>
                            
                            
                            <p>Upload videos</p>
                            

                            <div className="file-field">
                                <div className="d-flex justify-content-start">
                                    <div className="btn btn-mdb-color btn-rounded float-left waves-effect waves-light">
                                        <span>Choose file</span>
                                        <input type="file" multiple />
                                    </div>
                                    
                                </div>
                            </div>

                            
                            <div className="row">
                            
                                <div className="Portfolio vertical-item gallery-item content-absolute text-center">
                                    <a href="javascript:void(0)">
                                        <video width="100%" height="100%" controls>
                                            <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" type="video/mp4" />
                                        </video>
                                    </a>
                                    <div className="item-media">
                                        <div className="media-links">
                                            <div className="links-wrap">
                                                <a href="javascript:void(0)" title="" className="p-view prettyPhoto ">
                                                    <i className="fa fa-close"></i>
                                                </a>

                                                <a href="javascript:void(0)" title="" className="p-link">
                                                    <i className="fa fa-search"></i>
                                                </a>
                                                
                                            </div>
                                        </div>
                                    </div>
                                                    
                                </div>
                            
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default VideoGallery;