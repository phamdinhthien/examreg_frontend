import React, { Component, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { Container, Collapse, CardBody, CardHeader } from 'reactstrap';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import AddShiftExam from '../ManageExam/AddShiftExam';
import EditTableExam from '../ManageExam/EditTableExam';
import DataExam from './DataExam';
import AddExam from './Buttons/AddExam';
import AddExamSubject from './Buttons/AddExamSubject';
import DeleteExam from './Buttons/DeleteExam';
import DeleteExamSubject from './Buttons/DeleteExamSubject';
import classnames from 'classnames';
import * as ApiConfig from '../../api/ConfigApi';

class ManageExam extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse: [],
      modal: false,
      semesters: null,
      semesterNames: [],
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
    fetch(ApiConfig.API_URL + '/Semesters/GetAllSemesters.php')
      .then(res => res.json())
      .then(response => {
        let times = response.data.length;
        this.setState({
          semesters: response.data,
          collapse: this.repeat(false, times),
        })
        let semesterNames = [];
        response.data.map((c) => {
          semesterNames.push((c.code).toLowerCase());
          fetch(ApiConfig.API_URL + '/Semesters/GetAllSemesters.php?semester_id=' + c.semester_id)
            .then(res => res.json())
            .then(response => {
              semesterNames[c.semester_id] = response.data;
              this.setState({
                semesterNames: semesterNames
              })
            })
            .catch(err => console.log(err))
        })
      })
      .catch(err => { console.log(err) })
  }
  getAllSemesters = (semester_id) => {
    let semesterNames = this.state.semesterNames;
    fetch(ApiConfig.API_URL + '/Semesters/GetAllSemesters.php?semester_id=' + semester_id)
      .then(res => res.json())
      .then(response => {
        semesterNames[semester_id] = response.data;
        this.setState({
          semesterNames: semesterNames
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
    let { collapse, activeTab, semesters, semesterNames, childActiveTab } = this.state;
    return (
      <div className="container-fluid">
        <Card className="card-custom">
          <CardHeader>
            <b className="title-table"><i className="fa fa-align-justify mr-2"></i>Danh Sách Các Kì Thi</b>
            <div className='row position-relative'> <AddExam loadData={this.loadData} /></div>
          </CardHeader>
          <CardBody>
            <div>
              {
                semesters ?
                  semesters.map((semester, index) => {
                    console.log(childActiveTab[index])
                    return (
                      <Card key={index} className="course-card">
                        <CardHeader id="card-header">
                          <div id="card-element" onClick={() => this.toggle(index)} className="d-flex justify-content-between">
                            <span>Kì Thi {semester.name}-{semester.year}</span>
                            <div style={{ margin: "0 20px" }} className="course-funcs">
                              <DeleteExam index={index} semesterID={semester.semester_id} setCollapse={this.setCollapse} loadData={this.loadData} />
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
                                  <Row>
                                    <Col sm="12">
                                      <AddExamSubject onClickAddExamSubjectBtn={() => this.onClickAddExamSubjectBtn(index)} semester_id={semester.semester_id} />
                                      {
                                        semesterNames[semester.semester_id] && semesterNames[semester.semester_id].length > 0
                                          ?
                                          semesterNames[semester.semester_id].map((c, i) => {
                                            return (
                                              <div key={i}>
                                                <Link to={`exams/manage/${semester.semester_id}/${c.id}`}>
                                                  <div style={{ position: "relative" }}>
                                                    <div id="card-item">
                                                      <p>{c.name}</p>
                                                    </div>
                                                    <div style={{ position: "absolute", top: "1em", right: "2em", display: "flex" }}>
                                                      <DeleteExamSubject semesterID={c.id} examID={semester.semester_id} getAllSemesters={this.getAllSemesters} />
                                                    </div>
                                                  </div>
                                                </Link>
                                              </div>
                                            )
                                          })
                                          :
                                          <div style={{ textAlign: "center" }}>Chưa có dữ liệu</div>
                                      }
                                    </Col>
                                  </Row>
                                </TabPane>
                                <TabPane tabId="2">
                                  <Row>
                                    <Col sm="12">
                                      <DataExam />
                                    </Col>
                                  </Row>
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