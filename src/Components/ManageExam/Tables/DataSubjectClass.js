import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Table, Container, Card, CardImg, CardText, CardHeader, CardBody, Spinner } from 'reactstrap';
import UpdateSubjectClass from '../Buttons/SubjectClass/UpdateSubjectClass';
import AddClassClass from '../Buttons/SubjectClass/AddClassClass';
import * as ApiConfig from '../../../api/ConfigApi';
import DeleteSubjectClass from '../Buttons/SubjectClass/DeleteSubjectClass';
const $ = require('jquery')
$.DataTable = require('datatables.net')
// Chứa các trường dữ liệu của bảng Học Phần
class DataSubjectClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectClasses: [],
      startIndex: 1,
      loading: false
    }
  }
  componentDidMount() {
    this.loadData();
  }
  loadData = () => {
    let classID = this.props.match.params.classID;
    this.setState({
      loading: true
    })
    fetch(ApiConfig.API_URL + '/SubjectClasses/GetAllSubjectClasses.php?subject_id=' + this.props.match.params.subjectID)
      .then(res => res.json())
      .then(response => {
        this.setState({
          subjectClasses: response.data,
          loading: false
        })
      })
      .catch(err => console.log(err))
  }
  componentDidUpdate() {
    if (this.state.subjectClasses.length > 0) {
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
    let { subjectClasses, startIndex, loading } = this.state;
    return (
      <Container fluid className="customFontsize data-students">
        <Card className="card-custom">
          <CardHeader style={{height:"50px"}}>
            <b className="title-table"><i className="fa fa-align-justify mr-2"></i>Quản Lý Lớp Học Phần</b>
            <div className="btns">
              <AddClassClass subjectID={this.props.match.params.subjectID} loadData={this.loadData} />
            </div>
          </CardHeader>
          <CardBody>
            <Table striped hover responsive id="show-datatable">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên Học Phần</th>
                  <th>Mã Học Phần</th>
                  <th>Mã Lớp Học Phần</th>
                  <th>Quản Lý</th>
                  <th>Chỉnh Sửa</th>
                </tr>
              </thead>
              <tbody>
                {subjectClasses.length > 0
                  ?
                  subjectClasses.map((subjectClasse, index) => {
                    return (
                      <tr>
                        <th scope="row">{startIndex++}</th>
                        <td>{subjectClasse.name}</td>
                        <td>{subjectClasse.code_subject}</td>
                        <td>{subjectClasse.code}</td>
                        <td><Link to={`${this.props.match.url}/${subjectClasse.id}`}>sinh viên</Link></td>
                        <td style={{ display: 'flex' }}>
                          <UpdateSubjectClass subjectID={this.props.match.params.subjectID} subjectClasseID={subjectClasse.id} loadData={this.loadData} />
                          <DeleteSubjectClass subjectID={this.props.match.params.subjectID} subjectClasseID={subjectClasse.id} loadData={this.loadData} />
                        </td>
                      </tr>
                    )
                  })
                  :
                  <tr>
                    <td colSpan='7' style={{ textAlign: 'center' }}>
                      {
                        loading ?
                          <Spinner color="primary" />
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
export default DataSubjectClass;