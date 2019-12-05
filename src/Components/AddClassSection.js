import React from 'react';
import {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class AddClassSection extends Component {
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
            <Button outline color="primary" onClick={this.toggle}><i className="fa fa-plus-square mr-1" aria-hidden="true"></i> Thêm Lớp Học Phần </Button>
            <Modal isOpen={modal} toggle={this.toggle} className={className}>
            <ModalHeader>Thêm Lớp Học Phần</ModalHeader>
            <ModalBody>
            <Form>
               <FormGroup>
                    <Label for="AddClassSection">Học Kì</Label>
                    <Input type="text" name="AddClassSection" id="AddClassSection" placeholder="" />
                </FormGroup>
                <FormGroup>
                    <Label for="AddClassSection">Tên lớp Học Phần</Label>
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

export default AddClassSection;