import React from 'react';
import { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Spinner, Badge } from 'reactstrap';
import { alertText, alertTextCustom } from '../../../../core/Controller';
import * as ApiConfig from '../../../../api/ConfigApi';
// Xóa Khóa Học
class AddClass extends Component {
    // Khởi tạo Contructor
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            loading: false
        }
    }
    toggle = (e) => {
        e.preventDefault();
        this.props.setCollapse(this.props.index);
        this.setState({
            modal: !this.state.modal,
            code: '',
            loading: false
        });
    }
    // Xóa khóa học
    onDeleteCourse = () => {
        this.setState({
            loading: true
        })
        let courseID = this.props.courseID;
        fetch(ApiConfig.API_URL + '/Courses/DeleteOneCourse.php?id=' + courseID)
            .then(res => res.json())
            .then(response => {
                alertTextCustom("Xóa khóa học thành công", "#28a745");
                this.props.loadData();
                this.setState({
                    modal:false
                  });
            })
            .catch(err => alertText('Xóa khóa học không thành công'))
    }

    render() {
        let { modal } = this.state;
        return (
            <div className="delete-class-btn">
                <Button color="danger" onClick={this.toggle}><i className="fa fa-trash mr-1"></i>Xóa</Button>
                <Modal isOpen={modal} >
                    <ModalHeader>Xóa Khóa Học</ModalHeader>
                    <ModalBody>
                        Bạn Có Muốn Xóa Khóa Học Này
                    </ModalBody>
                    <ModalFooter>
                        {!this.state.loading
                            ?
                            <div>
                                <Button color="danger" onClick={this.onDeleteCourse}>Xóa</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>Hủy</Button>
                            </div>
                            :
                            <Spinner color="primary" style={{ marginRight: "50%" }} />
                        }
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default AddClass;