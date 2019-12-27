import React, { Component } from 'react';
import { Table, Container, Button } from 'reactstrap';
import * as ApiConfig from '../../../api/ConfigApi';
import { getCurrentRoles, getUserId } from '../../../core/GetRoles';

const userID = getUserId();
class DataRegister extends Component {

  constructor(props) {
    super(props);
    this.state = {
      examtimes: [],
      startIndex_1: 1,
      startIndex_2: 1,
      checkedArr: []
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
             console.log(response)
          })
          .catch(err => console.log(err))
      }
    } else {

    }
  }
  onRemove = (id) => {
    let { checkedArr } = this.state;
    let index = checkedArr.indexOf(id);
    console.log(index)
    let newCheckArr = checkedArr.splice(index, 1);
    this.setState({
      checkedArr: newCheckArr
    })
  }
  render() {
    let { examtimes, startIndex_1, startIndex_2, checkedArr } = this.state;
    return (
      <div className="container">
        <Table striped>
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
        </Table>
        <div className="container">
          <h3>Các Môn Thi Đã Chọn</h3>
          <Table striped>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên Môn Thi</th>
                <th>Mã Học Phần</th>
                <th>Phòng Thi</th>
                <th>Số Lượng Dự Thi</th>
                <th>Ngày Thi</th>
              </tr>
            </thead>
            <tbody>
              {
                examtimes.length > 0
                  ?
                  examtimes.map((e, index) => {
                    return (
                      checkedArr.indexOf(e.id) >= 0 ?
                        <tr key={index}>
                          <td>{startIndex_2++}</td>
                          <td>{e.subjectName}</td>
                          <td>{e.subjectclassCode}</td>
                          <td>{e.examroomName}</td>
                          <td>{e.amountComputer}</td>
                          <td>{`${this.formatDob(e.date)} (${e.startTime} - ${e.endTime})`}</td>
                        </tr>
                        :
                        null
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
    );
  }

}
export default DataRegister;