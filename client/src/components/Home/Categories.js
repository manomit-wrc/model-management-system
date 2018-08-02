import React from 'react';
import _ from 'lodash';

const Categories = ({ categories }) => (
    <div className="categories-all">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="heading">
                        <h2>Categories</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                {
                    _.map(categories, (cat, index) => {
                        return (
                            <div className="col-md-3" key={index}>
                                <div className="card">
                                    <div className="view">
                                        <img alt="photo" className="card-img-top" src={cat.image} />
                                    </div>
                                    <div className="card-body">
                                        <span className="badge badge-secondary my-2">{cat.is_new === true ? 'NEW': ''}</span>
                                        
                                        <h4 className="card-title font-weight-bold">{cat.name}</h4>
                            
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                
            </div>
        </div>
    </div>
);

export default Categories;