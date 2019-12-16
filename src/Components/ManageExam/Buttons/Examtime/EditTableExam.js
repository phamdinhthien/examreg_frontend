import React, { Component } from 'react';
import { Badge } from 'reactstrap';
import {useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class EditTableExam extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal:false,
      modal1:false,
    }
  }
  toggle = () =>{
  this.setState({modal: !this.state.modal})
  }
  toggle1 = () =>{
    this.setState({modal1: !this.state.modal1})
    }
  render(){
    let {className} = this.props;
    let {modal, modal1} = this.state;
        return(
          <div className="EditRemove">
            <div>
            <Badge href="#" color="success" onClick={this.toggle1}>Sửa <i className="fa fa-pencil-square-o" aria-hidden="true"></i></Badge>&nbsp;
            <Modal isOpen={modal1} toggle={this.toggle1} className={className}>
            <ModalHeader>Cập Nhật Thông Môn Thi</ModalHeader>
            <ModalBody>
            <Form>
                    <FormGroup>
                    <Label for="Subject">Môn Thi</Label>
                    <Input type="text" name="Subject" id="Subject" placeholder="" />
                    </FormGroup>
                    <FormGroup>
                    <Label for="SubjectCode">Mã Học Phần</Label>
                    <Input type="text" name="SubjectCode" id="SubjectCode" placeholder="" />
                    </FormGroup>
                    <FormGroup>
                    <Label for="ExaminationRoom">Phòng Thi</Label>
                    <Input type="text" name="ExaminationRoom" id="ExaminationRoom" placeholder="" />
                    </FormGroup>
                    <FormGroup>
                    <Label for="NumberofEntries">Số Lượng Dự Thi</Label>
                    <Input type="text" name="NumberofEntries" id="NumberofEntries" />
                    </FormGroup>
                    <FormGroup>
                    <Label for="ExamDate">Ngày Thi</Label>
                    <Input type="text" name="ExamDate" id="ExamDate" />
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
            <ModalHeader>Xóa Ca Thi</ModalHeader>
            <ModalBody>
              Bạn Có Muốn Xóa Ca Thi Này
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
export default EditTableExam;