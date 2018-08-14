import React from 'react';
import _ from 'lodash';





const Carousal = ({ banner }) => (
    
    <div id="carousel-example-1" className="carousel slide carousel-fade" data-ride="carousel" data-interval="false">
        <ol className="carousel-indicators">
            
            {
            _.map(banner, (b, index) => {
                return (
                    <li key={index} data-target="#carousel-example-1" data-slide-to={index} className={"" + (index === 0 ? 'active' : '')}></li>
                )
            })
            }
        </ol>
        

        
        <div className="carousel-inner" role="listbox">
            
            {
                _.map(banner, (b, index) => {
                    return (
                        <div key={index} className={"carousel-item " + (index === 0 ? "active" : "" )} style={{backgroundImage: `url(${b.image})`}}>
                            <div className="view">
                                <div className="full-bg-img flex-center mask rgba-indigo-light white-text">
                                    <ul className="animated fadeInUp col-md-12 list-unstyled list-inline">
                                        <li>
                                            <h1 className="font-weight-bold text-uppercase">{b.title_1}</h1>
                                        </li>
                                        <li>
                                            <p className="font-weight-bold text-uppercase py-4">{b.title_2}</p>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#" className="btn btn-purple btn-lg btn-rounded mr-0">I want to be a model</a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#" className="btn btn-elegant btn-lg btn-rounded ml-0">I want to be hire model</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            
            
            

        </div>
        
        <a className="carousel-control-prev" href="#carousel-example-1" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true">
                <i aria-hidden="true" className="fa fa-angle-left"></i>
            </span>
            <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carousel-example-1" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true">
                <i aria-hidden="true" className="fa fa-angle-right"></i>
            </span>
            <span className="sr-only">Next</span>
        </a>
        
    </div>
);

export default Carousal;