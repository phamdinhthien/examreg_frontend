import React from 'react';
import { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
// Chức năng Thêm Ca Thi
class AddExamtime extends Component {
  // khởi tạo constructor
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    }
  }
  //set toggle
  toggle = () => {
    this.setState({ modal: !this.state.modal })
  }
  render() {
    let { className } = this.props;
    let { modal } = this.state;

    return (
      <div>
        <div className="EditButtonAddShiftExam" style={{padding:"15px 0"}}>
        <Button color="primary" className="AddShiftExam" onClick={this.toggle}><i className="fa fa-plus mr-1" aria-hidden="true"></i> Thêm Ca Thi</Button>
        </div>
        <Modal isOpen={modal} toggle={this.toggle} className={className}>
          <ModalHeader>Thêm Ca Thi</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="SubjectCode">Ca Thi Số</Label>
                <Input type="text" name="SubjectCode" id="SubjectCode" placeholder="" />
              </FormGroup>
              <FormGroup>
                <Label for="SubjectCode">Môn Học</Label>
                <Input type="text" name="SubjectCode" id="SubjectCode" placeholder="" />
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
            <Button color="primary" onClick={this.toggle}>Thêm</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Hủy</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddExamtime;