import React, { Component } from 'react';
import { Table, Container, Button, Card, CardHeader, CardBody } from 'reactstrap';
import * as ApiConfig from '../../../api/ConfigApi';
import { getCurrentRoles, getUserId } from '../../../core/GetRoles';
const $ = require('jquery')
$.DataTable = require('datatables.net')
const userID = getUserId();
class DataRegister extends Component {

  constructor(props) {
    super(props);
    this.state = {
      examtimes: [],
      startIndex_1: 1,
      startIndex_2: 1,
      checkedArr: [],
      examtimesRegistered: []
    }
  }
  componentDidMount() {
    this.loadData();
  }
  loadData = () => {
    fetch(ApiConfig.API_URL + '/Students_Examtimes/GetAllExamtimesBySemesterId.php?semester_id=1&student_id=' + userID)
      .then(res => res.json())
      .then(response => {
        this.setState({
          examtimes: response.data
        })
      })
      .catch(err => console.log(err))

    fetch(ApiConfig.API_URL + '/Students_Examtimes/GetAllRegestered.php?semester_id=1&student_id=' + userID)
      .then(res => res.json())
      .then(response => {
        this.setState({
          examtimesRegistered: response.data
        })
      })
      .catch(err => console.log(err))
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
  onChange = (id) => {
    var checkedArr = []
    const checkeds = document.getElementsByTagName('input');
    for (let i = 0; i < checkeds.length; i++) {
      if (checkeds[i].checked) {
        checkedArr[i] = checkeds[i].value;
      } else {
        checkedArr[i] = '';
      }
    }
    this.setState({
      checkedArr: checkedArr
    })
  }
  onSave = () => {
    let { checkedArr } = this.state;
    if (checkedArr.length > 0) {
      for (let i = 0; i < checkedArr.length; i++) {
        console.log(i)
        let data = {
          student_id: userID,
          examtime_id: checkedArr[i]
        }
        fetch(ApiConfig.API_URL + '/Students_Examtimes/PickExamtimes.php', {
          method: 'POST',
          body: JSON.stringify(data)
        })
          .then(res => res.json())
          .then(response => {
            this.loadData()
          })
          .catch(err => console.log(err))
      }
    } else {

    }
  }
  onRemove = (id) => {
    fetch(ApiConfig.API_URL + '/Students_Examtimes/DeleteOneExamtime.php?id=' + id)
      .then(res => res.json())
      .then(response => {
        console.log(response)
        this.loadData();
      })
      .catch(err => console.log(err))
  }
  componentDidUpdate() {
    if (this.state.examtimes.length > 0 || this.state.examtimesRegistered.length > 0) {
      $(document).ready(function () {
        $('#show-datatable').DataTable({
          "order": [[0, 'asc']],
          "pageLength": 25,
          // "destroy": true,
          retrieve: true
        });
      });
    }
  }
  render() {
    let { examtimes, startIndex_1, startIndex_2, checkedArr, examtimesRegistered } = this.state;
    return (
      <Container fluid className="customFontsize data-students">
        <Card className="card-custom">
          <CardHeader style={{ height: "50px" }}>
            <b className="title-table"><i className="fa fa-align-justify mr-2"></i>Đăng Kí Thi</b>
          </CardHeader>
          <CardBody>
            <div className="container">
              <Table striped hover responsive id="show-datatable">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên Môn Thi</th>
                    <th>Mã Học Phần</th>
                    <th>Phòng Thi</th>
                    <th>Số Lượng Dự Thi</th>
                    <th>Ngày Thi</th>
                    <th>Đăng Kí</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    examtimes.length > 0
                      ?
                      examtimes.map((e, index) => {
                        return (
                          <tr key={index}>
                            <td>{startIndex_1++}</td>
                            <td>{e.subjectName}</td>
                            <td>{e.subjectclassCode}</td>
                            <td>{e.examroomName}</td>
                            <td>{e.amountComputer}</td>
                            <td>{`${this.formatDob(e.date)} (${e.startTime} - ${e.endTime})`}</td>
                            <td><input type="checkbox" value={e.id} onChange={() => { this.onChange(e.id) }} name /></td>
                          </tr>
                        )
                      })
                      :
                      <tr>
                        <td colSpan="7" style={{ textAlign: "center" }}>Chưa có dữ liệu</td>
                      </tr>
                  }
                </tbody>
              </Table >
              <div className="container">
                <h3>Các Môn Thi Đã Chọn</h3>
                <Table striped hover responsive id="show-datatable">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tên Môn Thi</th>
                      <th>Mã Học Phần</th>
                      <th>Phòng Thi</th>
                      <th>Số Lượng Dự Thi</th>
                      <th>Ngày Thi</th>
                      <th>Hủy Bỏ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      examtimesRegistered.length > 0
                        ?
                        examtimesRegistered.map((e, index) => {
                          return (
                            <tr key={index}>
                              <td>{startIndex_2++}</td>
                              <td>{e.subjectName}</td>
                              <td>{e.subjectclassCode}</td>
                              <td>{e.examroomName}</td>
                              <td>{e.amountComputer}</td>
                              <td>{`${this.formatDob(e.date)} (${e.startTime} - ${e.endTime})`}</td>
                              <td><button onClick={() => { this.onRemove(e.id) }} style={{ border: 'none', color: '#dc3545', background: 'none' }}><i className="fa fa-trash mr-1"></i></button></td>
                            </tr>
                          )
                        })
                        :
                        <tr>
                          <td colSpan="7" style={{ textAlign: "center" }}>Chưa có dữ liệu</td>
                        </tr>
                    }
                  </tbody>
                </Table>
                <Button color="success" id="save" onClick={this.onSave}>Xác Nhận</Button>{' '}
              </div>
            </div>
          </CardBody>
        </Card>
      </Container>
    );
  }

}
export default DataRegister;