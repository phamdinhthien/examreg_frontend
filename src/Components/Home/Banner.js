import React, { Component } from 'react';

class Banner extends Component {

    render() {
        return (
            <div className="banner">
            <div className="banner-box">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <h2>Thông Báo Toàn Thể Sinh Viên Hoàn Thành Việc Đăng Kí Thi</h2>
                            <p>Trường Đại Học ABCuni sẽ bắt đầu mở đăng kí thi vào ngày 24/12/2019 đến 30/12/2019.</p>
                        </div>
                        <div className="col-md-4">
                        <a href="#" className="learing-btn" style={{textDecoration:"underline "}}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Đăng Kí Thi Ngay
                        </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default Banner;