import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getHomePageDetails } from '../../actions/cms';
import Aux from '../hoc/Aux';
import Carousal from './Carousal';
import ModelGallery from './ModelGallery';
import TopModel from './TopModel';
import Categories from './Categories';
import CallToAction from './CallToAction';
import Reviews from './Reviews';
import Casting from './Casting';
import Portfilio from './Portfolio';
import Trust from './Trust';

class Main extends Component {

    state = {
        banner: [],
        categories: [],
        brands: []
    }

    componentDidMount() {
        this.props.getHomePageDetails();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            banner: nextProps.data.banner,
            categories: nextProps.data.categories,
            brands: nextProps.data.brands
        });
    }

    render() {
        return (
            <Aux>
                <Carousal banner={this.state.banner}/>
                <ModelGallery />
                <TopModel />
                <Categories categories={this.state.categories} />
                <CallToAction />
                <Reviews />
                <Casting />
                <Portfilio />
                <Trust brands={this.state.brands}/>
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      data: state.cms.data
    };
  };
export default connect(mapStateToProps, { getHomePageDetails })(Main);