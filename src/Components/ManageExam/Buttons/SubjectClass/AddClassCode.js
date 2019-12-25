import React from 'react';
import { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

class AddClassCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        }
    }
    toggle = () => {
        this.setState({ modal: !this.state.modal })
    }
    render() {
        let { className } = this.props;
        let { modal } = this.state;

        return (
            <div>
                <div className="EditButtonAddShiftExam" style={{ padding: "15px 0" }}>
                    <Button color="primary" className="AddShiftExam" onClick={this.toggle}><i className="fa fa-plus mr-1" aria-hidden="true"></i> Thêm Học Phần</Button>
                </div>
                <Modal isOpen={modal} toggle={this.toggle} className={className}>
                    <ModalHeader>Thêm Học Phần</ModalHeader>
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
                        <Button color="primary" onClick={this.toggle}>Thêm</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Hủy</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default AddClassCode;