import React, { Component } from 'react';

class Card extends Component {

    render() {
        return (
            <div className="container-home">

                <div className="box-home">
                    <div className="home">

                        <div className="face face1">
                            <div className="content">
                                <img src="https://img.icons8.com/wired/64/000000/paper-plane.png"></img>
                                <h3>Đăng Kí Học</h3>
                            </div>
                        </div>
                        <div className="face face2">
                            <div className="content">
                                <p>Chào mừng đến với VNUni</p>
                                <a href="#">Chọn Môn</a>
                            </div>
                        </div>
                    </div>
                    <div className="home">
                        <div className="face face1">
                            <div className="content">
                            <img src="https://img.icons8.com/wired/64/000000/learning.png"></img>
                                <h3>Đăng Kí Thi</h3>
                            </div>
                        </div>
                        <div className="face face2">
                            <div className="content">
                                <p>Các ca thi để lựa chọn .</p>
                                <a href="#">Chọn Lịch</a>
                            </div>
                        </div>
                    </div>
                    <div className="home">
                        <div className="face face1">
                            <div className="content">
                                <img src="https://img.icons8.com/carbon-copy/100/000000/administrative-tools.png"></img>
                                <h3>Đã Đăng Kí</h3>
                            </div>
                        </div>
                        <div className="face face2">
                            <div className="content">
                                <p>Các môn thi đã đăng kí.</p>
                                <a href="#">In Kết Quả</a>
                            </div>
                        </div>
                    </div>
                    <div className="home">
                        <div className="face face1">
                            <div className="content">
                                <img src="https://img.icons8.com/wired/64/000000/report-card.png"></img>
                                <h3>Bảng Điểm</h3>
                            </div>
                        </div>
                        <div className="face face2">
                            <div className="content">
                                <p>Tổng hợp điểm học phần.</p>
                                <a href="#">Xem Điểm</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card;