import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Aux from '../hoc/Aux';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import InnerBanner from '../partials/InnerBanner';
import Toolbar from '../partials/Toolbar';
import Sidebar from '../partials/Sidebar';
import { logoutUser } from '../../actions/auth';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            user: {}
        }
        this.loggedOut = this.loggedOut.bind(this);
    }
    
    
    componentWillMount() {
        
        this.setState({
            isAuthenticated: this.props.auth.isAuthenticated,
            user: this.props.auth.user
        });
    }

    loggedOut() {
        
        this.props.logoutUser();
    }

    render() {
        return (
            <Aux>
                <Header 
                    isAuthenticated={this.state.isAuthenticated}
                    user={this.state.user}
                    logout={this.loggedOut}
                />
                <main className="main-content">
                    <InnerBanner />
                    <div className="profile">
                        <div className="container">
                            <div className="card">
                                <div className="card-body">
                                    <Toolbar />
                                    <div className="row">
                                        <Sidebar />
                                        {this.props.children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps, { logoutUser })(Dashboard);