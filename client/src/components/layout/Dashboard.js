import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../hoc/Aux';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import InnerBanner from '../partials/InnerBanner';
import Toolbar from '../partials/Toolbar';
import Sidebar from '../partials/Sidebar';

class Dashboard extends Component {

    componentWillReceiveProps(nextProps) {
        alert("Next Props");
        console.log(nextProps);
    }

    render() {
        return (
            <Aux>
                <Header />
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
        user: state.profile.data
    }
}
export default connect(mapStateToProps, null)(Dashboard);