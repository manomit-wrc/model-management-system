import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/auth';
import Aux from '../hoc/Aux';
import Header from '../partials/Header';
import Footer from '../partials/Footer';

class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            user: {}
        }
        this.loggedOut = this.loggedOut.bind(this);
    }

    componentWillMount() {
        console.log(this.props);
        this.setState({
            isAuthenticated: this.props.auth.isAuthenticated !== undefined ? this.props.auth.isAuthenticated : false,
            user: this.props.auth.user !== undefined ? this.props.auth.user : {}
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
                {this.props.children}
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

export default connect(mapStateToProps, { logoutUser})(Layout);