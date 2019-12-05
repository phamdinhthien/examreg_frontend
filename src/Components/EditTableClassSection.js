import React, { Component } from 'react';
import { Badge } from 'reactstrap';
import {useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class EditTableClassSection extends Component {
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
          <div className="EditRemove">
            <div>
            <Badge href="#" color="danger" onClick={this.toggle}>Xóa <i className="fa fa-trash" aria-hidden="true"></i></Badge>
            <Modal isOpen={modal} toggle={this.toggle} className={className}>
            <ModalHeader>Xóa Học Phần</ModalHeader>
            <ModalBody>
              Bạn Có Muốn Xóa Mã Học Phần Này
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={this.toggle}>Xóa</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Hủy
            </Button>
            </ModalFooter>
            </Modal>
            </div>
            </div>
        );
}
}
export default EditTableClassSection;