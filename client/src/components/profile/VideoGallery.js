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

                            <div className="mb-4"></div>
                            <div className="row">
                            <div className="col-md-4">
                                <Player>
                                    <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
                                </Player>
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