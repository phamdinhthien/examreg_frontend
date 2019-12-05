import React from 'react';
import { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import { alertText, alertTextCustom } from '../../../../core/Controller';
import * as ApiConfig from '../../../../api/ConfigApi';
class AddClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      code: '',
      loading: false,
      invalidCode: false
    }
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      code: '',
      loading: false
    });
    this.props.onClickAddClassBtn();
  }
  onChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value
    })
  }
  onAddClass = () => {
    this.setState({
      loading: true
    })
    let code = this.state.code
    let courseId = this.props.course_id;
    let data = {
      code: code,
      course_id: courseId
    }
    if(this.checkValue(courseId)){
      fetch(ApiConfig.API_URL + '/Classes/CreateOneClass.php', {
        method: 'POST',
        body: JSON.stringify(data)
      }).then(res => res.json())
        .then(response => {
          alertTextCustom("Thêm lớp học thành công", "#28a745");
          this.setState({
            modal:false
          });
          this.props.getAllClassesByCourseID(courseId);
        })
        .catch(err => alertText('Thêm lớp học không thành công'))
    }
  }

  checkValue = (courseID) => {
    let {code} = this.state;
    let {classesByCourseId} = this.props;
    let classNames = [];
    classesByCourseId[courseID].map(c=>{
      classNames.push(c.code)
    })
    if(classNames.includes(code)){
      this.setState({ invalidCode: true, loading: false })
      document.getElementById('code').setAttribute('title', 'Tên lớp đã tồn tại')
      return false;
    }
    return true;
  }
  render() {
  
    let { modal, code, invalidCode } = this.state;
    return (
      <div className="add-class-btn">
        <Button color="primary" className="mr-2" onClick={this.toggle} ><i className="fa fa-plus mr-1" aria-hidden="true"></i> Thêm Lớp</Button>
        <Modal isOpen={modal}>
          <ModalHeader>Thêm Lớp </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="AddClassSection">Tên Lớp:</Label>
                <Input type="text" id="AddClassSection" placeholder="" name="code" id="code" value={code} onChange={this.onChange} invalid={invalidCode}/>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            {!this.state.loading
              ?
              <div>
                <Button color="primary" onClick={this.onAddClass}>Thêm</Button>{' '}
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