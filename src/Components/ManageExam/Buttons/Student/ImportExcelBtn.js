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
            datas: []
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
        fetch(ApiConfig.API_URL + '/SubjectClasses_Students/ImportDataFromExcel.php?subjectclass_id=' + this.props.subjectClassID, {
            method: 'POST',
            body: fd
        })
            .then(res => res.json())
            .then(response => {
                    this.setState({
                        modal: false,
                        datas: response.datas,
                        loading: false
                })
            })
            .catch(err => console.log(err))

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

            </div>

        );
    }
}
export default ImportExcelBtn;