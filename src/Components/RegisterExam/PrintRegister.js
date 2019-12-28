import React, { Component } from 'react';
import { Table, Container, Button, Card, CardHeader, CardBody } from 'reactstrap';
import * as ApiConfig from '../../api/ConfigApi';
import { getCurrentRoles, getUserId } from '../../core/GetRoles';
import './Style.css';
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
  onPrint = (element) => {
    if (!window.Blob) {
      alert('Your legacy browser does not support this action.');
      return;
    }

    var html, link, blob, url, css;

    // EU A4 use: size: 841.95pt 595.35pt;
    // US Letter use: size:11.0in 8.5in;

    css = (
      '<style>' +
      '@page WordSection1{size: 841.95pt 595.35pt;mso-page-orientation: landscape;}' +
      'div.WordSection1 {page: WordSection1;}' +
      'table{border-collapse:collapse;}td{border:1px gray solid;width:5em;padding:2px;}' +
      '</style>'
    );

    html = window.docx.innerHTML;
    blob = new Blob(['\ufeff', css + html], {
      type: 'application/msword'
    });
    url = URL.createObjectURL(blob);
    link = document.createElement('A');
    link.href = url;
    // Set default file name. 
    // Word will append file extension - do not add an extension here.
    link.download = 'Document';
    document.body.appendChild(link);
    if (navigator.msSaveOrOpenBlob) navigator.msSaveOrOpenBlob(blob, 'Document.doc'); // IE10-11
    else link.click();  // other browsers
    document.body.removeChild(link);
  }
  render() {
    let { examtimes, startIndex_1, startIndex_2, checkedArr, examtimesRegistered } = this.state;
    return (
      <div className="container-fluid">
        <Card className="card-custom">
          <CardHeader>
            <b className="title-table"><i className="fa fa-align-justify mr-2"></i>Các Môn Thi Đã Chọn</b>
          </CardHeader>
          <CardBody>
            <div id="docx">
              <div class="WordSection1">
                <Table striped style={{ width: '100%', padding: '50px', marginTop: '30px' }}>
                  <thead>
                    <tr>
                      <td>STT</td>
                      <td>Tên Môn Thi</td>
                      <td>Mã Học Phần</td>
                      <td>Phòng Thi</td>
                      <td>Ngày Thi</td>
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
                              <td>{`${this.formatDob(e.date)} (${e.startTime} - ${e.endTime})`}</td>
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
            </div>
            <Button color="success" className="mt-2" id="print" onClick={() => { this.onPrint(window.docx) }}>Xuất ra word</Button>{' '}
            <Button color="success" className="mt-2" id="print" onClick={() => { window.print() }}>In</Button>{' '}
          </CardBody>
        </Card>
      </div>
    );
  }

}
export default DataRegister;