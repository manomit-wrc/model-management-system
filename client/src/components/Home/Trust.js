import React from 'react';
import OwlCarousel from 'react-owl-carousel2';
import _ from 'lodash';
const Trust = ({ brands }) => (
    <div className="trust">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="heading">
                        <h2>Modeling for everyone</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    
                    <div className="trust-slider owl-carousel owl-theme">
                        {
                            _.map(brands, (brand, index) => {
                                return(
                                    <div className="item" key={index}>
                                        <img src={brand.image} />
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Trust;
