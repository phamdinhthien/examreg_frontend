import React from 'react';
import { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Spinner, Badge } from 'reactstrap';
import { alertText, alertTextCustom } from '../../../../core/Controller';
import * as ApiConfig from '../../../../api/ConfigApi';
// Xóa Lớp Học
class DeleteClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            loading: false
        }
    }
    toggle = (e) => {
        e.preventDefault();
        this.setState({
            modal: !this.state.modal,
            code: '',
            loading: false
        });
    }
    onDeleteClass = () => {
        this.setState({
            loading: true
        })
        let courseID = this.props.courseID;
        let classID = this.props.classID;
        fetch(ApiConfig.API_URL + '/Classes/DeleteOneClass.php?id=' + classID)
        .then(res => res.json())
            .then(response => {
                alertTextCustom("Xóa lớp học thành công", "#28a745");
                this.props.getAllClassesByCourseID(courseID);
                this.setState({
                    modal: false
                })
            })
            .catch(err => alertText('Xóa lớp học không thành công'))
    }

    render() {
        let { modal } = this.state;
        return (
            <div className="class-funcs delete-class-btn">
                <Badge color="danger" onClick={this.toggle}><i className="fa fa-trash mr-1"></i>Xóa</Badge>
                <Modal isOpen={modal} >
                    <ModalHeader>Xóa Lớp Học</ModalHeader>
                    <ModalBody>
                        Bạn Có Muốn Xóa Lớp Học Này
                    </ModalBody>
                    <ModalFooter>
                        {!this.state.loading
                            ?
                            <div>
                                <Button color="danger" onClick={this.onDeleteClass}>Xóa</Button>{' '}
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

export default DeleteClass;