import React, { Component } from 'react';
import { Badge, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { alertText, alertTextCustom } from '../../../../core/Controller';
import * as ApiConfig from '../../../../api/ConfigApi';
class EditExamtime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      loading: false,
      subjectName: '',
      subjectclassCode: '',
      subjectclassId: '',
      date: '',
      startTime: '',
      endTime: '',
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

  toggle = (e) => {
    e.preventDefault();
    this.setState({
      modal: !this.state.modal,
      loading: false,
      subjectName: '',
      subjectclassCode: '',
      subjectclassId: '',
      date: '',
      startTime: '',
      endTime: '',
      examroomName: '',
      amountComputer: '',
      subjectClasses: []
    })
    if (!this.state.modal) {
      fetch(ApiConfig.API_URL + '/Examtimes/GetOneExamtime.php?id=' + this.props.examtimeID)
        .then(res => res.json())
        .then(response => {
          let subjectName = response.data[0].subjectName;
          let subjectclassCode = response.data[0].subjectclassCode;
          let date = this.formatDob(response.data[0].date);
          let startTime = response.data[0].startTime;
          let endTime = response.data[0].endTime;
          let examroomName = response.data[0].examroomName;
          let amountComputer = response.data[0].amountComputer;
          this.setState({
            subjectName: subjectName,
            subjectclassCode: subjectclassCode,
            date: date,
            startTime: startTime,
            endTime: endTime,
            examroomName: examroomName,
            amountComputer: amountComputer,
          });
          fetch(ApiConfig.API_URL + '/Examtimes/GetSubjectClassesToUpdateExamtime.php?subjectclass_id=' + response.data[0].subjectclassID)
            .then(res => res.json())
            .then(response => {
              this.setState({
                subjectClasses: response.data,
              })
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }
  }
  onUpdateExamtime = () => {
    this.setState({
      loading: true
    })
    let { subjectName, subjectclassCode, subjectclassId, date, startTime, endTime, examroomName, amountComputer } = this.state;
    let dateArr = date.split("/");
    let newDate = `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`
    let data = {
      examtime_id: this.props.examtimeID,
      subjectclass_id: subjectclassCode,
      date: newDate,
      start_time: startTime,
      end_time: endTime,
      examroom_id: examroomName,
      amount_computer: amountComputer
    }
    console.log(data)
    fetch(ApiConfig.API_URL + '/Examtimes/UpdateOneExamtime.php', {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(response => {
        let status = response.status;
        let message = response.message
        if (status == 201) {
          alertTextCustom(message, "#28a745");
          this.setState({
            modal: false
          });
          this.props.loadData();
        } else if (status == 400) {
          this.setState({
            loading: false
          })
          alertText(message);
        }
      })
      .catch(err => console.log(err))
  }

  onChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    if (name == 'subjectName') {
      fetch(ApiConfig.API_URL + '/Examtimes/GetSubjectClassesToExamtime.php')
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

  formatDob = (dob) => {
    let newDOB = new Date(dob);
    let date = newDOB.getDate();
    date = date < 10 ? '0' + date : date;
    let month = newDOB.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    let year = newDOB.getFullYear();
    return `${date}/${month}/${year}`;
  }

  render() {
    let { className, subjects } = this.props;
    let { modal, examrooms, date, startTime, endTime, amountComputer, subjectClasses, subjectName, subjectclassCode, examroomName } = this.state;
    console.log('ascscscasc', subjectclassCode)
    return (
      <div className="EditRemove">
        <Badge href="#" color="success" onClick={this.toggle}>Sửa <i className="fa fa-pencil-square-o" aria-hidden="true"></i></Badge>&nbsp;
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
                          <option value={s.id} selected={s.name == subjectName ? true : false}>{s.name}</option>
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
                <Label for="subjectclassCode">Mã Học Phần</Label>
                {
                  subjectClasses
                    ?
                    <select id="subjectclassCode" name="subjectclassCode" className="form-control" onChange={this.onChange}>
                      <option>--Mã lớp học phần--</option>
                      {subjectClasses.map((s, index) => {
                        return (
                          <option value={s.id} selected={s.code == subjectclassCode ? true : false}>{s.code}</option>
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
                          <option value={s.id} selected={s.name == examroomName ? true : false}>{s.name}</option>
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
              <FormGroup>
                <Label for="endTime">Giờ Kết Thúc</Label>
                <Input type="text" name="endTime" id="endTime" value={endTime} onChange={this.onChange} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onUpdateExamtime}>Thêm</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Hủy</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default EditExamtime;