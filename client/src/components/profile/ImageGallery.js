import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2'
import { uploadProfileImage } from '../../actions/auth';
import { ClipLoader } from 'react-spinners';
import _ from 'lodash';



class ImageGallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            avatar: '',
            image_gallery: [],
            file: null,
            gallery: [],
            isLoading: false
        }
        this.handleProfileImage = this.handleProfileImage.bind(this);
        this.handleImageGallery = this.handleImageGallery.bind(this);
    }

    componentWillMount() {
        //console.log(this.props.auth.user);
        this.setState({
            avatar: this.props.auth.user.avatar
        });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
        this.setState({ isLoading: false });
        Swal({
            title: 'Profile Image',
            text: 'Image uploaded successfully',
            type: 'success',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.value) {
              window.location.reload();
            }
          })
        }
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
        let file_arr = [];
        _.map(event.target.files, (file, index) => {
            file_arr.push(file);
            arr.push(URL.createObjectURL(file))
        });
        arr.push.apply(arr, this.state.image_gallery)
        file_arr.push.apply(file_arr, this.state.gallery)
        this.setState({
            image_gallery: arr,
            gallery: file_arr
        })
        
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
                                <div className="col-md-6">
                                    <div className="file-field">
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
                                </div>
                            </div>

                            <div className="mb-4"></div>
                            <div className="row">
                                {
                                    _.map(this.state.image_gallery, (img, index) => {
                                        return (
                                            <div className="col-md-4" key={index}>
                                                <div className="file-field">
                                                    <div className="z-depth-1-half mb-4">
                                                        <img src={img} className="img-fluid" alt="example placeholder" />
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

export default connect(mapStateToProps, { uploadProfileImage })(ImageGallery);