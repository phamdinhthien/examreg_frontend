import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, FormGroup, Form, CustomInput, Spinner } from "reactstrap";
import { alertText, alertTextCustom } from '../../../../core/Controller';
import * as ApiConfig from '../../../../api/ConfigApi';
const $ = require('jquery')
$.DataTable = require('datatables.net')

class ImportExcelBtn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            modal: false,
            file: null,
            studentsExisted: [],
            studentAdded: []
        };
    }

    componentDidUpdate() {
        $(document).ready(function () {
            $('#show-datatable-1, #show-datatable-2').DataTable({
                "order": [[0, 'asc']],
                "pageLength": 25,
                // "destroy": true,
                retrieve: true
            });
        });
    }

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal,
            loading: false,
            file: null,
            studentsExisted: [],
            studentAdded: []
        });
    };

    onChange = (e) => {
        let file = e.target.files[0];
        this.setState({
            file: file
        })
    }

    onAddFile = () => {
        this.setState({
            loading: true
        })
        let { file } = this.state;
        const fd = new FormData();
        fd.append('upexcel', file, file.name);
        fetch(ApiConfig.API_URL + '/Students/ImportDataFromExcel.php?id=' + this.props.classID, {
            method: 'POST',
            body: fd
        })
            .then(res => res.json())
            .then(response => {
                if (response.studentExisted.length > 0 || response.datas.length > 0) {
                    this.setState({
                        checkStudentModal: true,
                        studentsExisted: response.studentExisted,
                        studentAdded: response.datas
                    })
                }
                // else {
                //     this.setState({
                //         checkStudentModal: false,
                //         studentAdded:response.datas
                //     })
                //     alertTextCustom("Thêm file thành công", "#28a745");
                //     setTimeout(function () {
                //         window.location.reload();
                //     }, 1000)
                //     this.setState({
                //         modal: false
                //     })
                // }
            })
            .catch(err => alertText('Thêm file không thành công'))

    }

    checkStudentToggle = () => {
        this.setState(prevState => ({
            checkStudentModal: !prevState.checkStudentModal
        }));
        this.setState({
            modal: false
        })
        alertTextCustom("Thêm file thành công", "#28a745");
        this.props.loadData();
    }

    render() {
        let { modal, studentsExisted, studentAdded } = this.state;
        return (
            <div>
                <Button color="primary" onClick={this.toggleModal} >Thêm File Excel</Button>
                <Modal isOpen={modal}>
                    <ModalHeader>Thêm File Excel</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="fileExcel">Chọn file</Label>
                                <CustomInput type="file" id="fileExcel" name="fileExcel" label="Chọn file!" onChange={this.onChange} />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        {!this.state.loading
                            ?
                            <div>
                                <Button color="primary" onClick={this.onAddFile}>Thêm</Button>{' '}
                                <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                            </div>
                            :
                            <Spinner color="primary" style={{ marginRight: "50%" }} />
                        }
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.checkStudentModal} style={{ maxWidth: "90%", top: 0 }}>
                    <ModalHeader>Chi Tiết Thêm File Excel</ModalHeader>
                    <ModalBody className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header" id="studentAdded-card-header">Sinh Viên Đã Được Thêm</div>
                                <div className="card-body mt-3">
                                    <table className="table table-bordered table-striped" id="show-datatable-1">
                                        <thead>
                                            <tr>
                                                <th>MSSV</th>
                                                <th>Tên Sinh Viên</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {studentAdded.length > 0
                                                ? studentAdded.map((student, index) => {
                                                    return (<tr key={index}>
                                                        <td>{student.code}</td>
                                                        <td>{student.name}</td>
                                                    </tr>
                                                    )
                                                })
                                                :
                                                <tr>
                                                    <td style={{ textAlign: 'center' }}>Không có dữ liệu</td>
                                                    <td style={{ textAlign: 'center' }}>Không có dữ liệu</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="card">
                                <div className="card-header" style={{ background: "#ffc107", color: "white" }}>Sinh Viên Đã Tồn Tại</div>
                                <div className="card-body mt-3">
                                    <table className="table table-bordered table-striped" id="show-datatable-2">
                                        <thead>
                                            <tr>
                                                <th>MSSV</th>
                                                <th>Tên Sinh Viên</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {studentsExisted.length > 0
                                                ? studentsExisted.map((student, index) => {
                                                    return (<tr key={index}>
                                                        <td>{student.code}</td>
                                                        <td>{student.name}</td>
                                                    </tr>
                                                    )
                                                })
                                                :
                                                <tr>
                                                    <td style={{ textAlign: 'center' }}>Không có dữ liệu</td>
                                                    <td style={{ textAlign: 'center' }}>Không có dữ liệu</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.checkStudentToggle}>Thoát</Button>
                    </ModalFooter>
                </Modal>
            </div>

        );
    }
}
export default ImportExcelBtn;