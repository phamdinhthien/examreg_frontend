import React from 'react';
import { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Spinner, Badge } from 'reactstrap';
import { alertText, alertTextCustom } from '../../../../core/Controller';
import * as ApiConfig from '../../../../api/ConfigApi';
// Chức năng Xóa Kì Thi
class DeleteExam extends Component {
    // khởi tạo constructor
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            loading: false
        }
    }
    // set toggle
    toggle = (e) => {
        e.preventDefault();
        this.props.setCollapse(this.props.index);
        this.setState({
            modal: !this.state.modal,
            code: '',
            loading: false
        });
    }
    // Xóa kì thi
    onDeleteExam = () => {
        this.setState({
            loading: true
        })
        let semesterID = this.props.semesterID;
        fetch(ApiConfig.API_URL + '/Semesters/DeleteOneSemester.php?id=' + semesterID)
            .then(res => res.json())
            .then(response => {
                alertTextCustom("Xóa kì thi thành công", "#28a745");
                this.props.loadData();
                this.setState({
                    modal: false
                })
            })
            .catch(err => alertText('Xóa kì thi không thành công'))
    }

    render() {
        let { modal } = this.state;
        return (
            <div className="class-funcs delete-class-btn">
                <Button color="danger" onClick={this.toggle}><i className="fa fa-trash mr-1"></i>Xóa</Button>
                <Modal isOpen={modal} >
                    <ModalHeader>Xóa Kì Thi</ModalHeader>
                    <ModalBody>
                        Bạn Có Muốn Xóa Kì Thi Này
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

export default DeleteExam;