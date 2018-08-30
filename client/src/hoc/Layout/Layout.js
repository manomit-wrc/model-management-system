import React, { Component, Fragment } from 'react';
import Header from '../../components/Navigation/Header';
import Footer from '../../components/Navigation/Footer';

class Layout extends Component {

    render() {
        return (
            <Fragment>
                <Header />
                {this.props.children}
                <Footer />
            </Fragment>
        );
    }
}

export default Layout;