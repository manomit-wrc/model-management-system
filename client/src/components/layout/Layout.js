import React, { Component } from 'react';
import Aux from '../hoc/Aux';
import Header from '../partials/Header';
import Footer from '../partials/Footer';

class Layout extends Component {
    render() {
        return (
            <Aux>
                <Header />
                {this.props.children}
                <Footer />
            </Aux>
        );
    }
}

export default Layout;