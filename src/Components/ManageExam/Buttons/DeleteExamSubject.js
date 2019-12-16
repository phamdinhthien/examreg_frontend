import React from 'react';
import { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Spinner, Badge } from 'reactstrap';
import { alertText, alertTextCustom } from '../../../core/Controller';
import * as ApiConfig from '../../../api/ConfigApi';

class DeleteExamSubject extends Component {
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
    onDeleteExam = () => {
        this.setState({
            loading: true
        })
        let examID = this.props.examID;
        fetch(ApiConfig.API_URL + '/Semesters/DeleteOneSemeter.php?id=' + examID)
        .then(res => res.json())
            .then(response => {
                alertTextCustom("Xóa môn thi thành công", "#28a745");
                this.props.getAllSemesters(examID);
                this.setState({
                    modal: false
                })
            })
            .catch(err => alertText('Xóa môn thi không thành công'))
    }

    render() {
        let { modal } = this.state;
        return (
            <div className="class-funcs delete-class-btn">
                <Badge color="danger" onClick={this.toggle}><i className="fa fa-trash mr-1"></i>Xóa</Badge>
                <Modal isOpen={modal} >
                    <ModalHeader>Xóa Môn Thi</ModalHeader>
                    <ModalBody>
                        Bạn Có Muốn Xóa Môn Thi Này
                    </ModalBody>
                    <ModalFooter>
                        {!this.state.loading
                            ?
                            <div>
                                <Button color="danger" onClick={this.onDeleteExam}>Xóa</Button>{' '}
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

export default DeleteExamSubject;