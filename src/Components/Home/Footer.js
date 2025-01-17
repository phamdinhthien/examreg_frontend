import React, { Component } from 'react';

class Footer extends Component {

    render() {
        return (
            // Footer của trang web hiển thị một số thông tin cơ bản về chính sách, nội quy của trường ABCuni
            <div className="footer">
                <div className="container-fluid">
                    <div className="row">
                            {/* Chính sách của nhà trường */}
                            <div className="col-md-4">
                                <h3> Về ABCuni </h3>
                                <img src="https://img.icons8.com/doodle/100/000000/brick.png"></img><br></br>
                                <a>Chính sách</a><br></br>
                                <a>Liên Lạc</a><br></br>
                                <a>Trung Tâm Phát Ứng Dụng</a><br></br>  
                            </div>
                            {/* Các liên hệ */}
                            <div className="col-md-4">
                                <h3>Liên Hệ</h3>
                                <p><i className="fa fa-phone" ></i> : +84 9678999</p>
                                <p><i className="fa fa-envelope"></i> : support@ABCuniversity.edu.vn</p>
                                <p><i className="fa fa-home"></i> : Hà Nội, Việt Nam</p>

                            </div>
                            {/* Vị trí của trường trên bản đồ */}
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