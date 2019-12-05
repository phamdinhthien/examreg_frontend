import React from 'react';
import {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class AddClassCode extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal:false,
    }
  }
  toggle = () =>{
  this.setState({modal: !this.state.modal})
  }
  render(){
    let {className} = this.props;
    let {modal} = this.state;  
        return(
        <div>
            <Button outline color="primary" onClick={this.toggle}><i className="fas fa-file-excel" aria-hidden="true"></i> Thêm Mã Học Phần </Button>
            <Modal isOpen={modal} toggle={this.toggle} className={className}>
            <ModalHeader>Thêm Mã Lớp Học Phần</ModalHeader>
            <ModalBody>
            <Form>
                <FormGroup>
                    <Label for="AddClassSection">Mã Học Phần</Label>
                    <Input type="text" name="AddClassSection" id="AddClassSection" placeholder="" />
                </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>Thêm</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Hủy
            </Button>
            </ModalFooter>
            </Modal>
    </div>  
    );
  }
}

export default AddClassCode;