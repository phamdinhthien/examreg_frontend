import React from 'react';
import { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import * as ApiConfig from '../../../../api/ConfigApi';
import { alertText, alertTextCustom } from '../../../../core/Controller';

class AddExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      loading: false,
      name: '',
      year: ''
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      loading: false,
      name: '',
      year: ''
    })
  }

  onAddSemester = () => {
    this.setState({
      loading: true
    })
    let { name, year } = this.state;
    let data = {
      name: name,
      year: year
    }
    fetch(ApiConfig.API_URL + '/Semesters/CreateOneSemester.php', {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(response => {
        let status = response.status;
        let message = response.message
        if(status == 201){
          this.setState({
            modal:false
          });
          this.props.loadData();
        } else if(status == 400){
          alertText(message);
        }
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
    let { modal, name, year } = this.state;

    return (
      <div>
        <div className="EditButtonAE">
          <Button color="primary" className="AddExam" onClick={this.toggle}><i className="fa fa-plus-square mr-1" aria-hidden="true"></i> Thêm Kì Thi </Button>
        </div>
        <Modal isOpen={modal} className={className}>
          <ModalHeader>Thêm Kì Thi</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="name">Tên Kì Thi</Label>
                <Input type="text" name="name" id="name" placeholder="" value={name} onChange={this.onChange} />
              </FormGroup>
              <FormGroup>
                <Label for="year">Năm</Label>
                <Input type="text" name="year" id="year" placeholder="" value={year} onChange={this.onChange} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onAddSemester}>Thêm</Button>
            <Button color="secondary" onClick={this.toggle}>Hủy
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default AddExam;