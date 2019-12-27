import React, { Component } from 'react';
import { Badge } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import * as ApiConfig from '../../../../api/ConfigApi';
import { alertText, alertTextCustom } from '../../../../core/Controller';
import { removeSpace } from './CommonStudentBtn';
class AddStudentBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      code: "",
    }
  }
  toggle = () => {
    let { studentID } = this.props;
    this.setState({
      modal: !this.state.modal, 
      code: ""
    })
  }

  onChange = (e) => {
    let target = e.target;
    let name = target.name;

    let value = target.value;

    this.setState({
      [name]: value,
      mail: document.getElementById('code').value + "@vnu.edu.vn"
    })
  }

  onAddStudent = () => {
    let { code } = this.state;
    let { subjectClassID } = this.props;
      let data = {
        code: code, 
        subjectclass_id: subjectClassID
      }
      fetch(ApiConfig.API_URL + '/SubjectClasses_Students/AddOneStudent.php?subjectclass_id=' + this.props.subjectClassID, {
        method: 'POST',
        body: JSON.stringify(data)
      }).then(res => res.json())
        .then(response => {
          console.log(response)
          alertTextCustom("Thêm sinh viên thành công", "#28a745");
          this.props.loadData();
          this.setState({
            modal: false
          });
        })
        .catch(err => console.log(err))
    }

  render() {
    let { modal, code } = this.state;
    return (
      <div>
        <Button color="primary" onClick={this.toggle}>Thêm Sinh Viên</Button>
        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader>Thêm Sinh Viên</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="code">MSSV</Label>
                <Input type="text" name="code" id="code" value={code} onChange={this.onChange} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onAddStudent}>Lưu</Button>
            <Button color="secondary" onClick={this.toggle}>Hủy
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default AddStudentBtn;