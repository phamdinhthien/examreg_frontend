import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Breadcrumb as B, BreadcrumbItem as BI } from 'reactstrap';
import {Link} from 'react-router-dom';

const breadcumbs = {
    '': <Link to="/"><i className="fa fa-home" aria-hidden="true"></i> Trang Chủ</Link>,
    'exams': <Link to="/exams">Kì Thi</Link>,
    'students': <Link to="/students">Sinh viên</Link>,
    'students/manage': <Link to="/manage">Khóa Học</Link>,
    'subject/manage': <Link to="/subject">Môn Thi</Link>,
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