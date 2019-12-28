import React, { Component } from 'react';
import { Table, Container, Card, CardImg, CardText, CardHeader, CardBody, Spinner } from 'reactstrap';
import * as ApiConfig from '../../../api/ConfigApi';
import ImportExcelBtn from '../Buttons/Student/ImportExcelBtn';
import DeleteStudent from '../Buttons/Student/DeleteStudentBtn';
import AddStudentBtn from '../Buttons/Student/AddStudentBtn';

const $ = require('jquery')
$.DataTable = require('datatables.net')

class DataStudents extends Component {

  constructor(props) {
    super(props);
    this.state = {
      students: [],
      startIndex: 1,
      loading: false
    }
  }
  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    let subjectClassID = this.props.match.params.subjectClassID;
    this.setState({
      loading: true
    });
    fetch(ApiConfig.API_URL + '/SubjectClasses_Students/GetInfoAllStudents.php?subjectclass_id=' + subjectClassID)
      .then(res => res.json())
      .then(response => {
        this.setState({
          students: response.data,
          loading: false
        })
      })
      .catch(err => console.log(err))
  }
  componentDidUpdate() {
    if(this.state.students.length > 0){
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

  formatDob = (dob) =>{
    let newDOB = new Date(dob);
    let date = newDOB.getDate();
    date = date < 10 ? '0'+date : date;
    let month = newDOB.getMonth() + 1;
    month = month < 10 ? '0'+month : month;
    let year = newDOB.getFullYear();
    return `${date}/${month}/${year}`;
  }

  render() {
    let { students, startIndex, loading } = this.state;
    let {classID, subjectClassID} = this.props.match.params;
    return (
      <Container fluid className="customFontsize data-students">
        <Card className="card-custom">
          <CardHeader>
            <b className="title-table"><i className="fa fa-align-justify mr-2"></i>Quản Lý Sinh Viên</b>
            <div className="btns">
              <AddStudentBtn classID={classID} loadData={this.loadData} subjectClassID={subjectClassID}/> <div className="mx-1"></div>
              <ImportExcelBtn loadData={this.loadData} classID={classID} subjectClassID={subjectClassID}/>
            </div>
          </CardHeader>
          <CardBody>
            <Table striped hover responsive id="show-datatable">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>MSSV</th>
                  <th>Họ và Tên</th>
                  <th>Email</th>
                  <th>Lớp</th>
                  <th>Ngày Sinh</th>
                  <th>Chỉnh Sửa</th>
                </tr>
              </thead>
              <tbody>

                {students.length > 0
                  ?
                  students.map((student, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{startIndex++}</th>
                        <td>{student.code}</td>
                        <td>{student.name}</td>
                        <td>{student.mail}</td>
                        <td>{student.class_name}</td>
                        <td>{this.formatDob(student.dob)}</td>
                        <td> 
                          <div style={{display: "flex"}}>
                            <DeleteStudent studentID={student.id} loadData={this.loadData}/>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                  :
                  <tr>
                    <td colSpan='7' style={{textAlign: 'center'}}>
                      {
                        loading ? 
                        <Spinner color="primary"/>
                        :
                        <span>Chưa có dữ liệu</span>
                      }
                    </td>
                  </tr>
                }
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Container>
    );
  }
}
export default DataStudents;