import React from 'react';
import { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Spinner, Badge } from 'reactstrap';
import { alertText, alertTextCustom } from '../../../../core/Controller';
import * as ApiConfig from '../../../../api/ConfigApi';
// Chức năng sửa kì thi
class UpdateExam extends Component {
    // Khởi tạo constructor
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            loading: false,
            name: '',
            year: ''
        }
    }
    // set toggle
    toggle = (e) => {
        e.preventDefault();
        this.props.setCollapse(this.props.index);
        this.setState({
            modal: !this.state.modal,
            loading: false,
            name: '',
            year: ''
        })
        if (!this.state.modal) {
            fetch(ApiConfig.API_URL + '/Semesters/GetOneSemester.php?id=' + this.props.semesterID)
                .then(res => res.json())
                .then(response => {
                    let name = response.data[0].name;
                    let year = response.data[0].year;
                    this.setState({
                        name: name,
                        year: year
                    })
                })
                .catch(err => console.log(err))
        }
    }
    onAddSemester = () => {
        this.setState({
            loading: true
        })
        let { name, year } = this.state;
        let data = {
            id: this.props.semesterID,
            name: name,
            year: year
        }
        fetch(ApiConfig.API_URL + '/Semesters/UpdateOneSemester.php', {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(response => {
                this.setState({
                    modal:false
                  });
                this.props.loadData();
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
            <div className="class-funcs update-exam-btn">
                <Button color="success" className="mr-1" onClick={this.toggle}><i className="fa fa-pencil-square-o mr-1"></i>Sửa </Button>
                <Modal isOpen={modal} >
                    <ModalHeader>Cập Nhật Kì Thi</ModalHeader>
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
                        {!this.state.loading
                            ?
                            <div>
                                <Button color="danger" onClick={this.onAddSemester}>Lưu</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>Hủy</Button>
                            </div>
                            :
                            <Spinner color="primary" style={{ marginRight: "50%" }} />
                        }
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default UpdateExam;