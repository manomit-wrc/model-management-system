import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ClipLoader, RingLoader } from 'react-spinners';
import ReactImageVideoLightbox from 'react-image-video-lightbox';
import { 
    uploadPortfolioVideo, 
    userDetails, 
    removePortfolioVideo 
} from '../../actions/auth';
import _ from 'lodash';


class VideoGallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            avatar: '',
            video_gallery: [],
            isLoading: false,
            videoIndex: 0,
            isOpen: false,
            visible: false
        }
        this.handleVideoGallery = this.handleVideoGallery.bind(this);
        this.removeVideo = this.removeVideo.bind(this);
    }

    componentWillMount() {
        this.setState({ visible: true })
        this.props.userDetails();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.setState({ 
                isLoading: false,
                visible: false,
                video_gallery: nextProps.auth.user_details.videos
            });
        
        }
    }

    removeVideo(video) {
        let data = {};
        data.videoUri = video;
        this.props.removePortfolioVideo(data);
    }

    handleVideoGallery(event) {
        
        let arr = [];
        _.map(event.target.files, (file, index) => {
            arr.push({
                url: URL.createObjectURL(file),
                altTag: `Video-${index}`,
                type: 'video'
            })
        });
        arr.push.apply(arr, this.state.video_gallery)
        this.setState({
            video_gallery: arr,
            isLoading: true
        })
        this.props.uploadPortfolioVideo(event.target.files);
        
    }

    render() {
        const { videoIndex } = this.state;
        return (
            <div className="col-md-9">
            {
                this.state.visible ? (
                    <div style={{width:'100%', height: '100%', textAlign: 'center'}}>
                        <RingLoader
                        size={150}
                        color={'#44C2F7'}
                        loading={true}
                        />
                    </div>
                ) : null
            }
                <div className="main">
                    <div className="content-box">
                        <form>
                            
                            
                            <p>Upload videos</p>
                            

                            <div className="file-field">
                                <div className="d-flex justify-content-start">
                                    <div className="btn btn-mdb-color btn-rounded float-left waves-effect waves-light">
                                        <span>Choose file</span>
                                        <input type="file" multiple onChange={this.handleVideoGallery} accept="video/mp4" />
                                    </div>
                                    <ClipLoader
                                        color={'#44C2F7'} 
                                        loading={this.state.isLoading} 
                                    />
                                </div>
                            </div>

                            
                            <div className="row">

                                {
                                    _.map(this.state.video_gallery, (video, index) => {
                                        return (
                                            <div key={index} className="Portfolio vertical-item gallery-item content-absolute text-center"
                                            
                                            >
                                                <a href="#!">
                                                    
                                                    <video width="100%" height="100%" controls>
                                                        <source src={video.url} type="video/mp4" />
                                                    </video>
                                                </a>
                                                <div className="item-media">
                                                    <div className="media-links">
                                                        <div className="links-wrap">
                                                            <a href="javascript:void(0)" title="" className="p-view prettyPhoto ">
                                                                <i onClick={() => this.removeVideo(video)}
                                                                 className="fa fa-close"></i>
                                                            </a>
                                                            <a href="javascript:void(0)" title="" className="p-link">
                                                                <i className="fa fa-search"
                                                                onClick={() => this.setState({ isOpen: true, videoIndex: index })}
                                                                ></i>
                                                            </a>
                                                
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        )
                                    })
                                }

                                {
                                    this.state.isOpen &&
                                    <ReactImageVideoLightbox
                                        data={this.state.video_gallery}
                                        startIndex={0}
                                        showResourceCount={true}
                                        onCloseCallback={() => { this.setState({ isOpen: false }); }} />
                                }
                            
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { 
    uploadPortfolioVideo, 
    userDetails,
    removePortfolioVideo
})(VideoGallery);