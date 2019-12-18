import React, { Component } from "react";
import DataStudents from "./Tables/DataStudents";
import { Collapse, Row, Card, CardImg, CardText, CardBody, CardHeader, Button, Badge } from "reactstrap";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import AddCourseBtn from './Buttons/Course/AddCourseBtn';
import UpdateCourseBtn from './Buttons/Course/UpdateCourseBtn';
import DeleteCourseBtn from './Buttons/Course/DeleteCourseBtn';
import AddClassBtn from './Buttons/Class/AddClassBtn';
import UpdateClassBtn from './Buttons/Class/UpdateClassBtn';
import DeleteClassBtn from './Buttons/Class/DeleteClassBtn';
import * as ApiConfig from '../../api/ConfigApi';
import './Style.css';

class ManageClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: [],
      modal: false,
      courses: null,
      classesByCourseId: [],
      courseNames: []
    };
  }

  repeat = (item, times) => {
    return new Array(times).fill(item);
  }
  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    fetch(ApiConfig.API_URL + '/Courses/GetAllCourses.php')
      .then(res => res.json())
      .then(response => {
        let times = response.data.length;
        this.setState({
          courses: response.data,
          collapse: this.repeat(false, times),
        })
        let classesByCourseId = [];
        let courseNames = [];
        response.data.map((c) => {
          courseNames.push((c.code).toLowerCase());
          fetch(ApiConfig.API_URL + '/Classes/GetAllClassesByCourseId.php?course_id=' + c.course_id)
            .then(res => res.json())
            .then(response => {
              classesByCourseId[c.course_id] = response.data;
              this.setState({
                classesByCourseId: classesByCourseId
              })
            })
            .catch(err => console.log(err))
        })
        this.setState({
          courseNames: courseNames
        })
      })
      .catch(err => console.log(err))
  }

  getAllClassesByCourseID = (course_id) => {
    let classesByCourseId = this.state.classesByCourseId;
    fetch(ApiConfig.API_URL + '/Classes/GetAllClassesByCourseId.php?course_id=' + course_id)
      .then(res => res.json())
      .then(response => {
        classesByCourseId[course_id] = response.data;
        this.setState({
          classesByCourseId: classesByCourseId
        })
      })
      .catch(err => console.log(err))
  }

  toggle = (index) => {
    let collapse = this.state.collapse;
    collapse[index] = !collapse[index];
    this.setState({ collapse: collapse });
  };

  onClickAddClassBtn = (index) => {
    let collapse = this.state.collapse;
    collapse[index] = true;
    this.setState({ collapse: collapse });
  }

  setCollapse = (index) => {
    let collapse = this.state.collapse;
    collapse[index] = false;
    this.setState({ collapse: collapse });
  }
  render() {

    let { collapse, courses, classesByCourseId, courseNames } = this.state;
    return (
      <div className="container-fluid">
        <Card className="card-custom">
          <CardHeader>
            <b className="title-table"><i className="fa fa-align-justify mr-2"></i>Danh Sách Các Khóa Học</b>
            <div className='row position-relative'><AddCourseBtn onReloadData={this.loadData} courseNames={courseNames} /></div>
          </CardHeader>
          <CardBody>
            <div>
              {
                courses ?
                  courses.map((course, index) => {
                    return (
                      <Card key={index} className="course-card">
                        <CardHeader id="card-header">
                          <div id="card-element" onClick={() => this.toggle(index)} className="d-flex justify-content-between">
                            <span> Khóa {course.code} ({course.year_start} - {course.year_end})</span>
                            <div style={{ margin: "0 20px" }} className="course-funcs">
                              <UpdateCourseBtn index={index} courseID={course.course_id} setCollapse={this.setCollapse} loadData={this.loadData} />
                              <DeleteCourseBtn index={index} courseID={course.course_id} setCollapse={this.setCollapse} loadData={this.loadData} />
                            </div>
                          </div>
                        </CardHeader>
                        <CardBody style={{ padding: collapse[index] ? '1em' : 0 }} id="custom-cardbody">
                          <Collapse isOpen={collapse[index]}>
                            <AddClassBtn onClickAddClassBtn={() => this.onClickAddClassBtn(index)} course_id={course.course_id} className="addclassbtn" getAllClassesByCourseID={this.getAllClassesByCourseID} classesByCourseId={classesByCourseId}/>
                            {
                              classesByCourseId[course.course_id] && classesByCourseId[course.course_id].length > 0
                                ?
                                classesByCourseId[course.course_id].map((c, i) => {
                                  return (
                                    <div key={i}>
                                      <Link to={`students/manage/${course.course_id}/${c.id}`}>
                                        <div style={{ position: "relative" }}>
                                          <div id="card-item">
                                            <p>Lớp {c.code}</p>
                                          </div>
                                          <div style={{ position: "absolute", top: "1em", right: "2em", display: "flex" }}>
                                            <UpdateClassBtn classID={c.id} courseID={course.course_id} getAllClassesByCourseID={this.getAllClassesByCourseID} />
                                            <DeleteClassBtn classID={c.id} courseID={course.course_id} getAllClassesByCourseID={this.getAllClassesByCourseID} />
                                          </div>
                                        </div>
                                      </Link>
                                    </div>
                                  )
                                })
                                :
                                <div style={{ textAlign: "center" }}>Chưa có dữ liệu</div>
                            }
                          </Collapse>
                        </CardBody>
                      </Card>
                    )
                  })
                  :
                  null
              }
            </div>
          </CardBody>
        </Card>

      </div>
    );
  }
}
export default ManageClass;
