import React from 'react'
import "./Midbanner.css";
import { FcShop, FcShipped, FcOnlineSupport } from 'react-icons/fc';

export default function Midbanner() {
    return (
        <div id="resources" className="offset mt-5">
            <div className="background">
                <div className="row dark text-center">{/*Dark row*/}
                    <div className="col-12">{/*col-12*/}
                        <h3 className="heading">Why From Us ?</h3>
                        <div className="heading-underline" />
                    </div>{/*END of col-12*/}
                    <div className="col-md-4">
                        <h3>Our Shop</h3>
                        <div className="feature">
                            <FcShop size={80} />
                        </div>
                        <p className="lead">We Keep The Best Stocks Ever</p>
                    </div>{/*END of React Col*/}
                    <div className="col-md-4">
                        <h3>100% Delivery</h3>
                        <div className="feature">
                            <FcShipped size={80} />
                        </div>
                        <p className="lead">Just Order From Anywhere</p>
                    </div>{/*END of Bootstrap Col*/}
                    <div className="col-md-4">
                        <h3>Customer Service</h3>
                        <div className="feature">
                            <FcOnlineSupport size={80} />
                        </div>
                        <p className="lead">Best Service then Other 24/7</p>
                    </div>{/*END of CSS Col*/}
                </div>{/*END of row*/}
            </div>
        </div>

    )
}
