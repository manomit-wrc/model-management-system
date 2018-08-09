import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    uploadProfileImage, 
    uploadPortfolioImage, 
    userDetails, 
    removePortfolioImage 
} from '../../actions/auth';
import { ClipLoader } from 'react-spinners';
import _ from 'lodash';
import { showLoading, hideLoading } from 'react-redux-loading-bar'



class ImageGallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            avatar: '',
            image_gallery: [],
            file: null,
            isLoading: false
        }
        this.handleProfileImage = this.handleProfileImage.bind(this);
        this.handleImageGallery = this.handleImageGallery.bind(this);
        this.removeImage = this.removeImage.bind(this);
    }

    componentWillMount() {
        this.props.userDetails();
        this.setState({
            avatar: this.props.auth.user.avatar
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if(nextProps.auth.isAuthenticated) {
        this.setState({ 
            isLoading: false,
            image_gallery: nextProps.auth.user_details.images
        });
        
        }
    }

    removeImage(image) {
        let data = {};
        data.imageUri = image;
        this.props.removePortfolioImage(data);
    }

    handleProfileImage(event) {

        this.setState({
            avatar: URL.createObjectURL(event.target.files[0]),
            isLoading: true
        });
        
        this.props.uploadProfileImage(event.target.files[0]);
        
    }

    handleImageGallery(event) {
        
        let arr = [];
        _.map(event.target.files, (file, index) => {
            arr.push(URL.createObjectURL(file))
        });
        arr.push.apply(arr, this.state.image_gallery)
        this.setState({
            image_gallery: arr,
            isLoading: true
        })
        this.props.uploadPortfolioImage(event.target.files);
        
    }

    render() {
        return (
            <div className="col-md-9">
                <div className="main">
                    <div className="content-box">
                        <form>
                            <p>Choose your profile image</p>
                            <div className="file-field">
                                <div className="d-flex justify-content-start">
                                    <div className="btn btn-mdb-color btn-rounded float-left waves-effect waves-light">
                                        <span>Choose file</span>
                                        <input type="file" onChange={this.handleProfileImage} />
                                        
                                    </div>
                                    <br />
                                    <ClipLoader
                                        color={'#44C2F7'} 
                                        loading={this.state.isLoading} 
                                    />
                                </div>
                            </div>
                            <div className="mb-4"></div>
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="file-field profile-img">
                                        <div className="z-depth-1-half mb-4">
                                            <img src={this.state.avatar} className="img-fluid" alt="example placeholder" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3"></div>
                            <hr className="custom-hr" />
                            <div className="mb-4"></div>
                            <p>Create a gallery ( Upload multiple images )</p>
                            

                            <div className="file-field">
                                <div className="d-flex justify-content-start">
                                    <div className="btn btn-mdb-color btn-rounded float-left waves-effect waves-light">
                                        <span>Choose file</span>
                                        <input type="file" multiple onChange={this.handleImageGallery} />
                                    </div>
                                    <ClipLoader
                                        color={'#44C2F7'} 
                                        loading={this.state.isLoading} 
                                    />
                                </div>
                            </div>

                            <div className="mb-4"></div>
                            <div className="row">
                                {
                                    _.map(this.state.image_gallery, (img, index) => {
                                        return (
                                            <div className="col-md-3" key={index}>
                                                <div className="file-field portfolio-img">
                                                    <div className="z-depth-1-half mb-4">
                                                    
                                                        <img src={img} className="img-fluid" alt="example placeholder" />
                                                        <div className="middle">
                                                            
                                                            <span className="spn-text">
                                                                <i onClick={() => this.removeImage(img)}
                                                                className="fa fa-close" 
                                                                style={{fontSize: '48px', color: '#FF0000'}} 
                                                                aria-hidden="true">
                                                                </i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
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
    uploadProfileImage, 
    uploadPortfolioImage, 
    userDetails,
    removePortfolioImage
})(ImageGallery);