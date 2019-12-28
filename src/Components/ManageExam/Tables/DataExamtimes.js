import React, { Component } from 'react';
import { Table, Container } from 'reactstrap';
import EditExamtime from '../Buttons/Examtime/EditExamtime';
import * as ApiConfig from '../../../api/ConfigApi';
import DeleteExamtime from '../Buttons/Examtime/DeleteExamtime';
import AddExamtime from '../Buttons/Examtime/AddExamtime';

const $ = require('jquery')
$.DataTable = require('datatables.net')

class DateExamtime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      examtimes: [],
      startIndex: 1
    }
  }
  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    let { semesterID } = this.props;
    fetch(ApiConfig.API_URL + '/Examtimes/GetAllExamtimesBySemesterId.php?semester_id=' + semesterID)
      .then(res => res.json())
      .then(response => {
        this.setState({
          examtimes: response.data,
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

  componentDidUpdate() {
    if (this.state.examtimes.length > 0) {
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
    let { examtimes, startIndex } = this.state;
    return (
      <div>
        <AddExamtime subjects={this.props.subjects} semesterID={this.props.semesterID} loadData={this.loadData}/>
        <Table striped hover responsive id="show-datatable">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên Môn Thi</th>
              <th>Mã Học Phần</th>
              <th>Phòng Thi</th>
              <th>Số Lượng Dự Thi</th>
              <th>Ngày Thi</th>
              <th>Chỉnh Sửa</th>
            </tr>
          </thead>
          <tbody>
            {
              examtimes.length > 0
                ?
                examtimes.map((e, index) => {
                  return (
                    <tr key={index}>
                      <td>{startIndex++}</td>
                      <td>{e.subjectName}</td>
                      <td>{e.subjectclassCode}</td>
                      <td>{e.examroomName}</td>
                      <td>{e.amountComputer}</td>
                      <td>{`${this.formatDob(e.date)} (${e.startTime} - ${e.endTime})`}</td>
                      <td className="edit" style={{ display: "flex" }}>
                        <EditExamtime subjectsBySemesterId={this.props.subjectsBySemesterId} examtimeID={e.id} loadData={this.loadData} subjects={this.props.subjects} />{' '}
                        <DeleteExamtime subjectsBySemesterId={this.props.subjectsBySemesterId} examtimeID={e.id} loadData={this.loadData} />
                      </td>
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
      </div>
    );
  }

}
export default DateExamtime;