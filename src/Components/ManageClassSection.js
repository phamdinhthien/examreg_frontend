import React, { Component } from 'react';
import { Collapse, Row,Card,CardBody } from 'reactstrap';
import AddClassCode from '/AddClassCode';
import ClassSection from './ClassSection';
import Next from './Next';

class ManageClassSection extends Component {
  constructor(props){
    super(props);
    this.state = {
      collapse0:true,
      collapse:false,
      collapse1:false,
      collapse2:false,
      collapse3:false
    }
  }
  toggle0 = () =>{
    this.setState({collapse0: !this.state.collapse0})
    }
  toggle = () =>{
  this.setState({collapse: !this.state.collapse})
  }
  toggle1 = () =>{
    this.setState({collapse1: !this.state.collapse1})
    }
  toggle2 = () =>{
     this.setState({collapse2: !this.state.collapse2})
  }
  toggle3 = () =>{
    this.setState({collapse3: !this.state.collapse3})
   }
  render(){
    let {collapse0,collapse, collapse1, collapse2, collapse3} = this.state;
          return(
            <div>
            <div id="card-header0">
            <p>Học Kì 1 - 2019</p>
            </div>
            <Collapse isOpen={collapse0}>
            <Card>
            <CardBody>
            <div>
            <div id="card-header" onClick={this.toggle}>
            <p>Lớp Tư Tưởng Hồ Chí Minh</p>
            </div>
            <Collapse isOpen={collapse}>
            <Row >
             <AddClassCode/>
            </Row>
          <br></br>
          <br></br>
             <ClassSection/>
            </Collapse>
            </div>
            <div>
            <div id="card-header" onClick={this.toggle1}>
            <p>Lớp Phân Tích Thiết Kế Hướng Đối Tượng</p>
            </div>
            <Collapse isOpen={collapse1}>
            <Row >
              <AddClassCode/>
            </Row>
          <br></br>
          <br></br>
             <ClassSection/>
            </Collapse>
            </div>
            <div>
            <div id="card-header" onClick={this.toggle2}>
            <p>Lớp Lập Trình Nâng Cao</p>
            </div>
            <Collapse isOpen={collapse2}>
            <Row >
             <AddClassCode/>
            </Row>
          <br></br>
          <br></br>
             <ClassSection/>
            </Collapse>
            </div>
            <div>
            <div id="card-header" onClick={this.toggle3}>
            <p>Lớp Toán Rời Rạc</p>
            </div>
            <Collapse isOpen={collapse3}>
            <Row >
              <AddClassCode />
            </Row>
          <br></br>
          <br></br>
             <ClassSection/>
            </Collapse>
            </div>
            <Next/>
      </CardBody>
 
      </Card>
 
      </Collapse>
      </div>
          );
    
        }
    
  }
  export default ManageClassSection;