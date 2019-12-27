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
      name: "",
      mail: "",
      classID: "",
      dob: "",
      invalidCode: false,
      invalidName: false,
      invaldidDob: false
    }
  }
  toggle = () => {
    let { studentID } = this.props;
    this.setState({
      modal: !this.state.modal, code: "", name: "", mail: "", classID: "", dob: "",
      invalidCode: false,
      invalidName: false,
      invaldidDob: false
    })
    if (!this.state.modal) {
      fetch(ApiConfig.API_URL + '/Students/GetOneStudent.php?id=' + studentID)
        .then(res => res.json())
        .then(response => {
          let code = response.data[0].code;
          let name = response.data[0].name;
          let mail = response.data[0].mail;
          let classID = response.data[0].class_name;
          let dob = response.data[0].dob;
          this.setState({
            code: code,
            name: name,
            mail: mail,
            class_id: classID,
            dob: dob
          })
        })
        .catch(err => console.log(err))
    }
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
    let { code, name, mail, dob } = this.state;
    let { classID } = this.props;

    let arr = dob.split('/');
    dob = `${arr[2]}-${arr[1]}-${arr[0]}`;

    let data = {
      code: code, name: removeSpace(name), mail: mail, class_id: classID, dob: dob
    }
    fetch(ApiConfig.API_URL + '/Students/AddOneStudent.php', {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(response => {
        let status = response.status;
        let message = response.message
        if (status == 201 || status == 200) {
          alertTextCustom(message, "#28a745");
          this.props.loadData();
          this.setState({
            modal: false
          });
        } else if (status == 400) {
          alertText(message);
          this.setState({
            loading: false
          })
        }
      })
      .catch(err => console.log(err))
  }


  // checkValue = () => {
  //   let { code, name, dob } = this.state;
  //   if (!name) {
  //     name = "";
  //   }
  //   let regexCode = /^[0-9]{8}$/;
  //   let regexName = /^[\wÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/;
  //   let regexDob = /^[0-9]{4}\/[0-9]{2}\/[0-9]{2}$/
  //   if (dob) {
  //     let arr = dob.split('/');
  //     dob = `${arr[2]}/${arr[1]}/${arr[0]}`;
  //   }

  //   this.setState({ invalidCode: false, invalidName: false, invaldidDob: false });
  //   if (!regexCode.test(code)) {
  //     this.setState({ invalidCode: true })
  //     document.getElementById('code').setAttribute('title', 'MSSV phải gồm 8 chữ số')
  //   }
  //   if (!regexName.test(name) || name.trim() == "") {
  //     this.setState({ invalidName: true })
  //     document.getElementById('name').setAttribute('title', 'Thông tin bạn nhập chưa đúng')
  //   }
  //   if (!regexDob.test(dob) || isNaN(new Date(dob))) {
  //     this.setState({ invaldidDob: true });
  //     document.getElementById('dob').setAttribute('title', 'Định dạng bạn nhập chưa đúng')
  //   }

  //   if (regexCode.test(code) && regexName.test(name) && regexDob.test(dob) && name.trim() != "" && !isNaN(new Date(dob))) {
  //     return true;
  //   }
  //   return false;
  // }

  render() {
    let { modal, code, name, mail, dob, invalidCode, invalidName, invaldidDob } = this.state;
    return (
      <div>
        <Button color="primary" onClick={this.toggle}>Thêm Sinh Viên</Button>
        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader>Thêm Sinh Viên</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="code">MSSV</Label>
                <Input type="text" name="code" id="code" value={code} onChange={this.onChange} invalid={invalidCode} />
              </FormGroup>
              <FormGroup>
                <Label for="name">Tên</Label>
                <Input type="text" name="name" id="name" placeholder="" value={name} onChange={this.onChange} invalid={invalidName} />
              </FormGroup>
              <FormGroup>
                <Label for="mail">Email</Label>
                <Input type="email" name="mail" id="mail" placeholder="" value={mail} onChange={this.onChange} disabled />
              </FormGroup>
              <FormGroup>
                <Label for="dob">Ngày Sinh</Label>
                <Input type="text" name="dob" id="dob" value={dob} onChange={this.onChange} invalid={invaldidDob} />
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