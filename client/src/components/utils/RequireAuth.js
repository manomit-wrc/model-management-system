import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userAuthToken } from '../../actions/profile';

export default function(ComposedComponent) {
    class Authenticate extends Component {

        componentWillMount() {
            this.props.userAuthToken(this.props.history);
        }

        

        render() {
            return (
              <ComposedComponent {...this.props} />
            );
        }
    }
    function mapStateToProps(state) {
        
        return {
          data: state.profile.data
        };
    }
    return connect(mapStateToProps, { userAuthToken })(Authenticate);
}