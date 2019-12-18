import React from 'react';
import { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import * as ApiConfig from '../../../../api/ConfigApi';
import { alertText, alertTextCustom } from '../../../../core/Controller';

class AddExamSubject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      loading: false,
      code: '',
      name: ''
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      loading: false,
      code: '',
      name: ''
    })
  }

  onAddExamSubject = () => {
    this.setState({
      loading: true
    })
    let { code, name } = this.state;
    let semesterID = this.props.semesterID;
    let data = {
      code: code,
      name: name,
      semester_id: semesterID
    }
    fetch(ApiConfig.API_URL + '/Subjects/CreateOneSubject.php', {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(response => {
        this.setState({
          modal:false
        });
        this.props.getAllSubjectBySemesterID(semesterID);
        alertTextCustom("Thêm môn thi thành công", "#28a745");
      })
      .catch(err => console.log(err))
  }


  onChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value
    })
  }

  render() {
    let { className } = this.props;
    let { modal, code, name } = this.state;

    return (
      <div className="add-exam-subject-btn">
        <div className="add-class-btn">
          <Button color="primary" className="AddExamSubject" onClick={this.toggle}><i className="fa fa-plus mr-1" aria-hidden="true"></i> Thêm Môn Thi </Button>
        </div>
        <Modal isOpen={modal} toggle={this.toggle} className={className}>
          <ModalHeader>Thêm Môn Thi</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="code">Mã Môn Thi</Label>
                <Input type="text" name="code" id="code" placeholder="" value={code} onChange={this.onChange} />
              </FormGroup>
              <FormGroup>
                <Label for="name">Tên Môn Thi</Label>
                <Input type="text" name="name" id="name" placeholder="" value={name} onChange={this.onChange} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            {!this.state.loading
              ?
              <div>
                <Button color="primary" onClick={this.onAddExamSubject}>Thêm</Button>{' '}
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
export default AddExamSubject;