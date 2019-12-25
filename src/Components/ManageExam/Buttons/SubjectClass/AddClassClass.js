import React from 'react';
import { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import * as ApiConfig from '../../../../api/ConfigApi';
import { alertText, alertTextCustom } from '../../../../core/Controller';

class AddClassCode extends Component {
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
        })
    }
    onAddSubjectClass = () => {
        this.setState({
          loading: true
        })
        let { code } = this.state;
        let data = {
          code: code,
          subject_id: this.props.subjectID
        }
        fetch(ApiConfig.API_URL + '/SubjectClasses/CreateOneSubjectClass.php', {
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
                <div className="EditButtonAddShiftExam" style={{ padding: "15px 0" }}>
                    <Button color="primary" className="AddShiftExam" onClick={this.toggle}><i className="fa fa-plus mr-1" aria-hidden="true"></i> Thêm Học Phần</Button>
                </div>
                <Modal isOpen={modal} toggle={this.toggle} className={className}>
                    <ModalHeader>Thêm Lớp Học Phần</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="code">Mã Lớp Học Phần</Label>
                                <Input type="text" name="code" id="code" placeholder="" value={code} onChange={this.onChange}/>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onAddSubjectClass}>Thêm</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Hủy</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default AddClassCode;