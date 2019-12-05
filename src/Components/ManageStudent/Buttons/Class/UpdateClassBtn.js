import React from 'react';
import { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Spinner, Badge } from 'reactstrap';
import { alertText, alertTextCustom } from '../../../../core/Controller';
import * as ApiConfig from '../../../../api/ConfigApi';

class AddClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      code: '',
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
    if (!this.state.modal) {
      fetch(ApiConfig.API_URL + '/Classes/GetOneClass.php?id=' + this.props.classID)
        .then(res => res.json())
        .then(response => {
          let code = response.data[0].code;
          this.setState({
            code: code
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
      [name]: value
    })
  }
  onUpdateClass = () => {
    this.setState({
      loading: true
    })
    let code = this.state.code
    let classID = this.props.classID;
    let courseID = this.props.courseID;
    let data = {
      id: classID,
      code: code,
      course_id: courseID
    }
    let classesByCourseId = this.state.classesByCourseId;
    fetch(ApiConfig.API_URL + '/Classes/UpdateOneClass.php', {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(response => {
        alertTextCustom("Cập nhật lớp học thành công", "#28a745");
        this.props.getAllClassesByCourseID(courseID);
        this.setState({
          modal: false
        })
      })
      .catch(err => alertText('Cập nhật lớp học không thành công'))
  }

  render() {
    let { modal, code } = this.state;
    return (
      <div className="class-funcs update-class-btn">
        <Badge color="success" onClick={this.toggle}><i className="fa fa-pencil-square-o mr-1" ></i>Sửa </Badge>&nbsp;
        <Modal isOpen={modal} >
          <ModalHeader>Cập Nhật Lớp Học </ModalHeader>
          <ModalBody>
            <Form onClick={(e) => { e.preventDefault() }}>
              <FormGroup>
                <Label for="code">Tên Lớp:</Label>
                <Input type="text" id="code" name="code" value={code} onChange={this.onChange} onFocus={(event) => event.target.select()} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            {!this.state.loading
              ?
              <div>
                <Button color="primary" onClick={this.onUpdateClass}>Lưu</Button>{' '}
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

export default AddClass;