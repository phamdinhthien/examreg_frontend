import React, { Component } from 'react';
import { Badge } from 'reactstrap';
import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
// Sửa Mã Học Phần
class EditSubjectClass extends Component {
    // khởi tạo constructor
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modal1: false,
        }
    }
    // set toggle
    toggle = () => {
        this.setState({ modal: !this.state.modal })
    }
    //set toggle1
    toggle1 = () => {
        this.setState({ modal1: !this.state.modal1 })
    }
    render() {
        let { className } = this.props;
        let { modal, modal1 } = this.state;
        return (
            <div className="EditRemove">
                <div>
                    <Badge href="#" color="success" onClick={this.toggle1}>Sửa <i className="fa fa-pencil-square-o" aria-hidden="true"></i></Badge>&nbsp;
            <Modal isOpen={modal1} toggle={this.toggle1} className={className}>
                        <ModalHeader>Cập Nhật Thông Học Phần</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="SubjectClass">Tên Học Phần</Label>
                                    <Input type="text" name="Subject" id="Subject" placeholder="" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="SubjectClassCode">Mã Học Phần</Label>
                                    <Input type="text" name="SubjectClassCode" id="SubjectClassCode" placeholder="" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="NumberStudent">Số Lượng</Label>
                                    <Input type="text" name="NumberStudent" id="NumberStudent" placeholder="" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="ClassCode">Lớp Học Phần</Label>
                                    <Input type="text" name="ClassCode" id="ClassCode" placeholder="" />
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggle1}>Xác Nhận</Button>
                            <Button color="secondary" onClick={this.toggle1}>Hủy
            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <div>
                    <Badge href="#" color="danger" onClick={this.toggle}>Xóa <i className="fa fa-trash" aria-hidden="true"></i></Badge>
                    <Modal isOpen={modal} toggle={this.toggle} className={className}>
                        <ModalHeader>Xóa Học Phần</ModalHeader>
                        <ModalBody>
                            Bạn Có Muốn Xóa Học Phần Này
            </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={this.toggle}>Xóa</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Hủy
            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
}
export default EditSubjectClass;