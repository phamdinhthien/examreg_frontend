import React, { Component } from 'react';

class Footer extends Component {

    render() {
        return (
            <div className="footer">
                <div className="container-fluid">
                    <div className="row">
                            <div className="col-md-4">
                                <h3> Về ABCuni </h3>
                                <a>About Us</a><br></br>
                                <a>Policies</a><br></br>
                                <a>Contact</a><br></br>
                                <a>FAQs</a><br></br>    
                            </div>
                            <div className="col-md-4">
                                <h3>Liên Hệ</h3>
                                <p><i className="fa fa-phone" ></i> : +84 9678999</p>
                                <p><i className="fa fa-envelope"></i> : support@ABCuniversity.edu.vn</p>
                                <p><i className="fa fa-home"></i> : Hà Nội, Việt Nam</p>

                            </div>
                            <div className="col-md-4">
                                <h3>Bản Đồ  </h3>
                                <div className="mapouter"><div className="gmap_canvas"><iframe width={310} height={209} id="gmap_canvas" src="https://maps.google.com/maps?q=VNU&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} /><a href="https://www.embedgooglemap.net/blog/divi-discount-code-elegant-themes-coupon/">divi discount code is</a></div><style dangerouslySetInnerHTML={{__html: ".mapouter{position:relative;text-align:right;height:209px;width:310px;}.gmap_canvas {overflow:hidden;background:none!important;height:209px;width:310px;}" }} /></div>
                            </div>
                        </div>
                    </div>
                    <div> <hr></hr></div>
                    </div>

                    )
                }
            }
            
export default Footer;