import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Breadcrumb as B, BreadcrumbItem as BI } from 'reactstrap';
import {Link} from 'react-router-dom';
// Định hướng giúp người dùng biết đang ở trang nào
const breadcumbs = {
    '': <Link to="/"><i className="fa fa-home" aria-hidden="true"></i> Trang Chủ</Link>,
    'exams': <Link to="/exams">Kì Thi</Link>,
    'students': <Link to="/students">Sinh viên</Link>,
    'manage': <Link to="/manage">Khóa Học</Link>,
    'subject': <Link to="/subject">Môn Thi</Link>,
    'register-examtime': <Link to="/register-examtime">Đăng Kí Thi</Link>,
    'print-examtime-result': <Link to="/print-examtime-result">In Kết Quả Thi</Link>
}
class BreadCumbs extends Component {

    render() {
        let { pathname } = this.props.location;
        let [home, ...paths] = pathname.split('/');
        let pathnames = [home, ...paths].filter(path => breadcumbs[path])

        return (
            <B>
                {pathnames.map((path, i) => {
                    const breacumb = breadcumbs[path] || null;
                    return <BI key={i} active={i === path.length - 1}>
                        {breacumb}
                    </BI>;
                })}
            </B>
        )
    }
}

export default withRouter(BreadCumbs);