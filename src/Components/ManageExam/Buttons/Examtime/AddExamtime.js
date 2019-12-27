import React from 'react';
import { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import * as ApiConfig from '../../../../api/ConfigApi';

// Chức năng Thêm Ca Thi
class AddExamtime extends Component {
  // khởi tạo constructor
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      loading: false,
      subjectName: '',
      subjectClasseCode: '',
      subjectclassId: '',
      date: '',
      startTime: '',
      examroomName: '',
      amountComputer: '',
      subjects: [],
      examrooms: []
    }
  }
  componentDidMount() {
    fetch(ApiConfig.API_URL + '/Examrooms/GetAllExamrooms.php')
      .then(res => res.json())
      .then(response => {
        this.setState({
          examrooms: response.data,
        })
      })
      .catch(err => console.log(err))
  }

  //set toggle
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      loading: false,
      subjectName: '',
      subjectClasseCode: '',
      subjectclassId: '',
      date: '',
      startTime: '',
      examroomName: '',
      amountComputer: '',
      subjectClasses: []
    })
  }
  onChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    console.log(name)
    if (name == 'subjectName') {
      console.log('acs')
      fetch(ApiConfig.API_URL + '/SubjectClasses/GetAllSubjectClasses.php?subject_id=' + value)
        .then(res => res.json())
        .then(response => {
          console.log(response.data)
          this.setState({
            subjectClasses: response.data,
          })
        })
        .catch(err => console.log(err))
    }
    this.setState({
      [name]: value
    })
  }
  onAddExamtime = () => {
    this.setState({
      loading: true
    })
    let { subjectName, subjectClasseCode, subjectclassId, date, startTime, examroomName, amountComputer } = this.state;
    let dateArr = date.split("/");
    let newDate = `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`
    let data = {
      subjectclass_id: subjectClasseCode,
      date: newDate,
      start_time: startTime,
      examroom_id: examroomName,
      amount_computer: amountComputer
    }
    fetch(ApiConfig.API_URL + '/Examtimes/CreateOneExamtime.php', {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(response => {
        this.setState({
          modal: false
        });
      })
      .catch(err => console.log(err))
  }

  render() {
    let { className, subjects } = this.props;
    let { modal, examrooms, subjectClasseCode, subjectclassId, date, startTime, examroomName, amountComputer, subjectClasses } = this.state;
    return (
      <div>
        <div className="EditButtonAddShiftExam" style={{ padding: "15px 0" }}>
          <Button color="primary" className="AddShiftExam" onClick={this.toggle}><i className="fa fa-plus mr-1" aria-hidden="true"></i> Thêm Ca Thi</Button>
        </div>
        <Modal isOpen={modal} toggle={this.toggle} className={className}>
          <ModalHeader>Thêm Ca Thi</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="subjectName">Tên Học Phần</Label>
                {
                  subjects
                    ?
                    <select id="subjectName" name="subjectName" className="form-control" onChange={this.onChange}>
                      <option>--Tên môn học--</option>
                      {subjects.map((s, index) => {
                        return (
                          <option value={s.id}>{s.name}</option>
                        )
                      })
                      }
                    </select>
                    :
                    <select class="form-control">
                      <option></option>
                    </select>
                }
              </FormGroup>
              <FormGroup>
                <Label for="subjectClasseCode">Mã Học Phần</Label>
                {
                  subjectClasses
                    ?
                    <select id="subjectClasseCode" name="subjectClasseCode" className="form-control" onChange={this.onChange}>
                      <option>--Mã lớp học phần--</option>
                      {subjectClasses.map((s, index) => {
                        return (
                          <option value={s.id}>{s.code}</option>
                        )
                      })
                      }
                    </select>
                    :
                    <select class="form-control">
                      <option></option>
                    </select>
                }
              </FormGroup>
              <FormGroup>
                <Label for="examroomName">Tên phòng thi</Label>
                {
                  examrooms
                    ?
                    <select id="examroomName" name="examroomName" className="form-control" onChange={this.onChange}>
                      <option>--Tên phòng thi--</option>
                      {examrooms.map((s, index) => {
                        return (
                          <option value={s.id}>{s.name}</option>
                        )
                      })
                      }
                    </select>
                    :
                    <select class="form-control">
                      <option></option>
                    </select>
                }
              </FormGroup>
              <FormGroup>
                <Label for="amountComputer">Số Lượng Dự Thi</Label>
                <Input type="text" name="amountComputer" id="amountComputer" value={amountComputer} onChange={this.onChange} />
              </FormGroup>
              <FormGroup>
                <Label for="date">Ngày Thi</Label>
                <Input type="text" name="date" id="date" value={date} onChange={this.onChange} />
              </FormGroup>
              <FormGroup>
                <Label for="startTime">Giờ Bắt Đầu</Label>
                <Input type="text" name="startTime" id="startTime" value={startTime} onChange={this.onChange} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onAddExamtime}>Thêm</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Hủy</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddExamtime;