import React, { Component } from 'react';
import { Table, Container } from 'reactstrap';
import { Button } from 'reactstrap';
import DataRegister from './Tables/DataRegister';
import ResultRegister from './Tables/ResultRegister';
class RegisterExam extends Component {
  componentDidMount() {
  }
  render() {
    return (
     <div>
         <DataRegister/>
     </div>
    );
  }

}
export default RegisterExam;