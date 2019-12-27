import React, { Component, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { Container, Collapse, CardBody, CardHeader } from 'reactstrap';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import EditExamtime from './Buttons/Examtime/EditExamtime';
import DataExamtimes from './Tables/DataExamtimes';
import AddSemester from './Buttons/Semester/AddSemester';
import DeleteExam from './Buttons/Semester/DeleteSemester';
import UpdateExam from './Buttons/Semester/UpdateSemester';
import AddExamSubject from './Buttons/Subject/AddExamSubject';
import DeleteExamSubject from './Buttons/Subject/DeleteExamSubject';
import classnames from 'classnames';
import * as ApiConfig from '../../api/ConfigApi';
import UpdateExamSubject from './Buttons/Subject/UpdateExamSubject';

class ManageExam extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse: [],
      modal: false,
      semesters: null,
      semesterNames: [],
      subjectsBySemesterId: [],
      childActiveTab: {},
    };
  }

  repeat = (item, times) => {
    return new Array(times).fill(item);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    let self = this;
    fetch(ApiConfig.API_URL + '/Semesters/GetAllSemesters.php')
      .then(res => res.json())
      .then(response => {
        let times = response.data.length;
        self.setState({
          semesters: response.data,
          collapse: this.repeat(false, times),
        })
        let subjectsBySemesterId = [];
        let semesterNames = [];
        response.data.map((c) => {
          semesterNames.push((c.name).toLowerCase());
          fetch(ApiConfig.API_URL + '/Subjects/GetAllSubjects.php?semester_id=' + c.id)
            .then(res => res.json())
            .then(response => {
              subjectsBySemesterId[c.id] = response.data;
              this.setState({
                subjectsBySemesterId: subjectsBySemesterId
              })
            })
            .catch(err => console.log(err))
        })
        self.setState({
          semesterNames: semesterNames
        })
      })
      .catch(err => { console.log(err) })
  }

  getAllSubjectBySemesterID = (semester_id) => {
    let subjectsBySemesterId = this.state.subjectsBySemesterId;
    fetch(ApiConfig.API_URL + '/Subjects/GetAllSubjects.php?semester_id=' + semester_id)
      .then(res => res.json())
      .then(response => {
        subjectsBySemesterId[semester_id] = response.data;
        this.setState({
          subjectsBySemesterId: subjectsBySemesterId
        })
      })
      .catch(err => console.log(err))
  }
  onClickAddExamSubjectBtn = (index) => {
    let collapse = this.state.collapse;
    collapse[index] = true;
    this.setState({ collapse: collapse });
  }
  toggle = (index) => {
    let collapse = this.state.collapse;
    collapse[index] = !collapse[index];
    let { childActiveTab } = this.state;
    this.setState({ collapse: collapse, childActiveTab: { ...childActiveTab, [index]: '1' } });
  };

  setCollapse = (index) => {
    let collapse = this.state.collapse;
    collapse[index] = false;
    this.setState({ collapse: collapse });
  }

  toggleElement = (index, tab) => {
    let { childActiveTab } = this.state;
    this.setState({
      childActiveTab: {
        ...childActiveTab,
        [index]: tab
      }
    })
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }

  render() {
    let { collapse, activeTab, semesters, semesterNames, subjectsBySemesterId, childActiveTab } = this.state;
    return (
      <div className="container-fluid">
        <Card className="card-custom">
          <CardHeader>
            <b className="title-table"><i className="fa fa-align-justify mr-2"></i>Danh Sách Các Kì Thi</b>
            <div className='row position-relative'> <AddSemester loadData={this.loadData} /></div>
          </CardHeader>
          <CardBody>
            <div>
              {
                semesters ?
                  semesters.map((semester, index) => {
                    return (
                      <Card key={index} className="course-card">
                        <CardHeader id="card-header">
                          <div id="card-element" onClick={() => this.toggle(index)} className="d-flex justify-content-between">
                            <span>Kì Thi {semester.name}-{semester.year}</span>
                            <div style={{ margin: "0 20px" }} className="course-funcs">
                              <UpdateExam index={index} semesterID={semester.id} setCollapse={this.setCollapse} loadData={this.loadData} />
                              <DeleteExam index={index} semesterID={semester.id} setCollapse={this.setCollapse} loadData={this.loadData} />
                            </div>
                          </div>
                        </CardHeader>
                        <Collapse isOpen={collapse[index]}>
                          <CardBody>
                            <div>
                              <Nav tabs>
                                <NavItem>
                                  <NavLink className={classnames({ active: childActiveTab[index] === '1' })}
                                    onClick={() => { this.toggleElement(index, '1'); }}
                                  >
                                    Quản Lý Môn Thi
                                  </NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink className={classnames({ active: childActiveTab[index] === '2' })}
                                    onClick={() => { this.toggleElement(index, '2'); }}
                                  >
                                    Quản Lý Ca Thi
                                  </NavLink>
                                </NavItem>
                              </Nav>
                              <TabContent activeTab={childActiveTab[index]}>
                                <TabPane tabId="1">
                                  <AddExamSubject onClickAddExamSubjectBtn={() => this.onClickAddExamSubjectBtn(index)} semesterID={semester.id} getAllSubjectBySemesterID={this.getAllSubjectBySemesterID} />
                                  {
                                    subjectsBySemesterId[semester.id] && subjectsBySemesterId[semester.id].length > 0
                                      ?
                                      subjectsBySemesterId[semester.id].map((subject, i) => {
                                        return (
                                          <div key={i}>
                                            <Link to={`exams/subject/manage/${semester.id}/${subject.id}`}>
                                              <div style={{ position: "relative" }}>
                                                <div id="card-item">
                                                  <p>{subject.name} - {subject.code}</p>
                                                </div>
                                                <div style={{ position: "absolute", top: "1em", right: "2em", display: "flex" }}>
                                                  <UpdateExamSubject subjectID={subject.id} semesterID={semester.id} getAllSubjectBySemesterID={this.getAllSubjectBySemesterID} />
                                                  <DeleteExamSubject subjectID={subject.id} semesterID={semester.id} getAllSubjectBySemesterID={this.getAllSubjectBySemesterID} />
                                                </div>
                                              </div>
                                            </Link>
                                          </div>
                                        )
                                      })
                                      :
                                      <div style={{ textAlign: "center" }}>Chưa có dữ liệu</div>
                                  }
                                </TabPane>
                                <TabPane tabId="2">
                                  <DataExamtimes subjectsBySemesterId={subjectsBySemesterId} semesterID={semester.id} subjects={subjectsBySemesterId[semester.id]}/>
                                </TabPane>
                              </TabContent>
                            </div>
                          </CardBody>
                        </Collapse>
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
export default ManageExam;