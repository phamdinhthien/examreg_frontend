import React, { Component } from 'react';
import { Badge } from 'reactstrap';
import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import * as ApiConfig from '../../../../api/ConfigApi';
import { alertText, alertTextCustom } from '../../../../core/Controller';
class EditSubjectClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            code: '',
        }
    }
    componentDidMount(){

    }
    toggle = () => {
        this.setState({ 
            modal: !this.state.modal,
            code: '',
        });
        if (!this.state.modal) {
          fetch(ApiConfig.API_URL + '/SubjectClasses/GetOneSubjectClass.php?id=' + this.props.subjectClasseID)
            .then(res => res.json())
            .then(response => {
              let code = response.data[0].code;
              this.setState({
                code: code
              })
            })
            .catch(err => console.log(err))
    }
  }
    onUpdateSubjectClass = () => {
        this.setState({
          loading: true
        })
        let { code } = this.state;
        let data = {
          id: this.props.subjectClasseID,
          code: code,
          subject_id: this.props.subjectID
        }
        fetch(ApiConfig.API_URL + '/SubjectClasses/UpdateOneSubjectClass.php', {
          method: 'POST',
          body: JSON.stringify(data)
        }).then(res => res.json())
          .then(response => {
            this.setState({
              modal:false
            });
            this.props.loadData();
            alertTextCustom("Thêm môn học phần thành công", "#28a745");
          })
          .catch(err => console.log(err))
      }
    
  onChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value
    })
  }

    render() {
        let { className } = this.props;
        let { modal, code } = this.state;

        return (
            <div>
                <Badge color="success" onClick={this.toggle}>Sửa <i className="fa fa-pencil-square-o" aria-hidden="true"></i></Badge>&nbsp;
                <Modal isOpen={modal} toggle={this.toggle} className={className}>
                    <ModalHeader>Cập Nhật Lớp Học Phần</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="code">Mã Lớp Học Phần</Label>
                                <Input type="text" name="code" id="code" placeholder="" value={code} onChange={this.onChange}/>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onUpdateSubjectClass}>Lưu</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Hủy</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default EditSubjectClass;