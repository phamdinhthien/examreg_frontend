import React, { Component, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { Container, Collapse, CardBody, CardHeader } from 'reactstrap';
import AddShiftExam from '../ManageExam/AddShiftExam';
import EditTableExam from '../ManageExam/EditTableExam';
import DataExam from './DataExam';
import AddExam from './Buttons/AddExam';
import classnames from 'classnames';
import * as ApiConfig from '../../api/ConfigApi';

class ManageExam extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse: [],
      modal: false,
      semesters: null,
      semesterNames: []
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
      })
      .catch(err => { console.log(err) })
  }

  toggle = (index) => {
    let collapse = this.state.collapse;
    collapse[index] = !collapse[index];
    this.setState({ collapse: collapse });
  };

  setCollapse = (index) => {
    let collapse = this.state.collapse;
    collapse[index] = false;
    this.setState({ collapse: collapse });
  }

  toggleElement = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }

  render() {
    let { collapse, activeTab, semesters } = this.state;
    return (
      <div className="container-fluid">
        <Card className="card-custom">
          <CardHeader>
            <b className="title-table"><i className="fa fa-align-justify mr-2"></i>Danh Sách Các Khóa Học</b>
            <div className='row position-relative'> <AddExam loadData={this.loadData} /></div>
          </CardHeader>
          <CardBody>
            {semesters ?
              semesters.map((semester, index) => {
                return (
                  <Card key={index}>
                    <CardHeader id="card-header">
                      <div id="card-element" onClick={()=>this.toggle(index)} >
                        {semester.name} - {semester.year}
                      </div>
                    </CardHeader>
                    <Collapse isOpen={collapse[index]}>
                      <CardBody>
                        <div>
                          <Nav tabs>
                            <NavItem>
                              <NavLink className={classnames({ active: activeTab === '1' })}
                                onClick={() => { this.toggleElement('1'); }}
                              >
                                Quản Lý Môn Thi
                        </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink className={classnames({ active: activeTab === '2' })}
                                onClick={() => { this.toggleElement('2'); }}
                              >
                                Quản Lý Ca Thi
                        </NavLink>
                            </NavItem>
                          </Nav>
                          <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                              <Row>
                                <Col sm="12">
                                  <h4>Tab 1 Contents</h4>
                                </Col>
                              </Row>
                            </TabPane>
                            <TabPane tabId="2">
                              <Row>
                                <Col sm="6">
                                  <Card body>
                                    <CardTitle>Special Title Treatment</CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                    <Button>Go somewhere</Button>
                                  </Card>
                                </Col>
                                <Col sm="6">
                                  <Card body>
                                    <CardTitle>Special Title Treatment</CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                    <Button>Go somewhere</Button>
                                  </Card>
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
              <div style={{ textAlign: "center" }}>Chưa có dữ liệu</div>
        }
          </CardBody>
        </Card>
      </div>
    );
  }

}
export default ManageExam;