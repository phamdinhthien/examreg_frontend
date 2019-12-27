import React from 'react';
import { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Spinner, Badge } from 'reactstrap';
import * as ApiConfig from '../../../../api/ConfigApi';
import { alertText, alertTextCustom } from '../../../../core/Controller';

class UpdateExamSubject extends Component {
    // khởi tạo constructor
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            loading: false,
            code: '',
            name: ''
        }
    }
    // set toggle
    toggle = (e) => {
        e.preventDefault();
        this.setState({
            modal: !this.state.modal,
            loading: false,
            code: '',
            name: ''
        })
        if (!this.state.modal) {
            fetch(ApiConfig.API_URL + '/Subjects/GetOneSubject.php?id=' + this.props.subjectID)
                .then(res => res.json())
                .then(response => {
                    let code = response.data[0].code;
                    let name = response.data[0].name;
                    this.setState({
                        code: code,
                        name: name
                    })
                })
                .catch(err => console.log(err))
        }
    }
    // xóa môn thi
    onUpdateExamSubject = () => {
        this.setState({
            loading: true
        })
        let subjectID = this.props.subjectID;
        let semesterID = this.props.semesterID;
        let { code, name } = this.state;
        let data = {
            id: subjectID,
            code: code,
            name: name,
            semester_id: this.props.semesterID
        }
        fetch(ApiConfig.API_URL + '/Subjects/UpdateOneSubject.php', {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(response => {
                let status = response.status;
                let message = response.message
                if (status == 201 || status == 200) {
                    alertTextCustom(message, "#28a745");
                    this.setState({
                        modal: false
                    });
                    this.props.getAllSubjectBySemesterID(semesterID);
                } else if (status == 400) {
                    alertText(message);
                    this.setState({
                        loading: false
                    })
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
        let { modal, code, name } = this.state;

        return (
            <div className="class-funcs update-class-btn">
                <Badge color="success" className="mr-1" onClick={this.toggle}><i className="fa fa-pencil-square-o mr-1" aria-hidden="true"></i> Sửa </Badge>
                <Modal isOpen={modal} className={className}>
                    <ModalHeader>Cập Nhật Môn Thi</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">Tên Môn Thi</Label>
                                <Input type="text" name="name" id="name" placeholder="" value={name} onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="code">Mã Môn Thi</Label>
                                <Input type="text" name="code" id="code" placeholder="" value={code} onChange={this.onChange} />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        {!this.state.loading
                            ?
                            <div>
                                <Button color="primary" onClick={this.onUpdateExamSubject}>Lưu</Button>{' '}
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
export default UpdateExamSubject;