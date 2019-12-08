import React, { Component } from 'react';
import './Style.css';


class BreadCumber extends Component {

    render() {
        return (
            <div className="">
                <nav className="" aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/" className="breadcrumb-link-active">Home</a></li>
                        <li className="breadcrumb-item"><a href="/students" className="breadcrumb-link">Students</a></li>
                        <li className="breadcrumb-item"><a href="/exams" className="breadcrumb-link">Exams</a></li>
                    </ol>
                </nav>
            </div>
        )
    }
}

export default BreadCumber;