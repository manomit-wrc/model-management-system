import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { checkActivation, verifyActivation } from '../../actions/auth';

class Activation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            success: null,
            message: null
        }
        this.verifyToken = this.verifyToken.bind(this);
    }

    componentWillMount() {
        let data = {};
        data.activation_id = this.props.match.params.activation_id;
        this.props.checkActivation(data);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if(nextProps.auth.hasOwnProperty('isAuthenticated') && nextProps.auth.isAuthenticated) {
            nextProps.history.push("/profile");
        }
        else {
            this.setState({
                success: nextProps.auth.data.success,
                message: nextProps.auth.data.message
            });
        }
    }

    verifyToken() {
        let data = {};
        data.activation_id = this.props.match.params.activation_id;
        this.props.verifyActivation(data);
    }

    renderMsg() {
        
        if(this.state.success) {
            return(
                <Fragment>
                    <p>{this.state.message}</p>
                    <button onClick={this.verifyToken} className="btn btn-purple waves-effect waves-light" type="button">Verify email address</button>
                </Fragment>
            )
        }
        else {
            return (
                <Fragment>
                    <p>{this.state.message}</p>
                </Fragment>
            );
            
        }
    }

    render() {
        return (
            <main className="main-content">
				
				<div className="profile confirmation">
					<div className="container">
						<div className="card">
							<div className="card-body">
								<div className="toolbar">
									<div className="row">
										<div className="col-md-12">
											<h5>Email Confirmation</h5>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-md-12">
										<div className="main">
											<div className="content-box">
												<div className="row">
													<div className="col-md-12">
														<div className="mail-box">
															<div className="banner">
																<img src="/img/confirmation-bg.jpg" alt="confirmation" />
															</div>
															<div className="bottom">
																<h2>Confirm Your Email</h2>
                                                                {this.renderMsg()}
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					
				</div>
			</main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({ checkActivation, verifyActivation }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Activation);