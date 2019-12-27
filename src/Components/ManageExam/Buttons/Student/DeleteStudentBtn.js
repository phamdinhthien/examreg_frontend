import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Spinner, Badge } from 'reactstrap';
import * as ApiConfig from '../../../../api/ConfigApi';
import { alertText, alertTextCustom } from '../../../../core/Controller';

class DeleteStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            loading: false
        }
    }
    toggle = () => {
        this.setState({ modal: !this.state.modal, loading: false })
    }

    onDeleteStudent = () => {
        let { studentID } = this.props;
        this.setState({
            loading: true,
        })
        fetch(ApiConfig.API_URL + '/SubjectClasses_Students/DeleteOneStudent.php?id=' + studentID)
            .then(res => res.json())
            .then(response => {
                alertTextCustom("Xóa sinh viên thành công", "#28a745");
                this.props.loadData();
                this.setState({
                    modal: false
                });
            })
            .catch(err => alertText('Xóa sinh viên không thành công'));
    }

    render() {
        let { modal } = this.state;
        return (
            <div className="EditRemove">
                <div>
                    <Badge color="danger" onClick={this.toggle}>Xóa <i className="fa fa-trash" aria-hidden="true"></i></Badge>
                    <Modal isOpen={modal} toggle={this.toggle}>
                        <ModalHeader>Xóa Sinh Viên</ModalHeader>
                        <ModalBody>
                            Bạn Có Muốn Xóa Sinh Viên Này
                    </ModalBody>
                        <ModalFooter>
                            {!this.state.loading
                                ?
                                <div>
                                    <Button color="danger" onClick={this.onDeleteStudent}>Xóa</Button>{' '}
                                    <Button color="secondary" onClick={this.toggle}>Hủy</Button>
                                </div>
                                :
                                <Spinner color="primary" style={{ marginRight: "50%" }} />
                            }
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
}
export default DeleteStudent;