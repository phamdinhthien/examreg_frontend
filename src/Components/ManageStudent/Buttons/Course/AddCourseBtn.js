import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, FormGroup, Form, Input, Spinner } from "reactstrap";
import { alertText, alertTextCustom } from '../../../../core/Controller';
import * as ApiConfig from '../../../../api/ConfigApi';

class ManageClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            modal: false,
            code: "",
            yearStart: "",
            yearEnd: "",
            invalidCode: false,
            invalidYearStart: false,
            invalidYearEnd: false
        };
    }

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal,
            loading: false,
            code: "",
            yearStart: "",
            yearEnd: "",
            invalidCode: false,
            invalidYearStart: false,
            invalidYearEnd: false
        });
    };
    onChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
    }
    onAddCourse = () => {
        this.setState({
            loading: true
        })

        let { code, yearStart, yearEnd } = this.state;
        let data = {
            code: code,
            year_start: yearStart,
            year_end: yearEnd
        }
            fetch(ApiConfig.API_URL + '/Courses/CreateOneCourse.php', {
                method: 'POST',
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(response => {
                    let status = response.status;
                    let message = response.message
                    if (status == 201 || status == 200) {
                        alertTextCustom(message, "#28a745");
                        this.setState({
                            modal: false
                        });
                        this.props.loadData();
                    } else if (status == 400) {
                        alertText(message);
                        this.setState({
                            loading: false
                        })
                    }
                })
                .catch(err => alertText('Thêm khóa học không thành công'))
    }

    // checkValue = () => {
    //     let { code, yearStart, yearEnd } = this.state;
    //     let { courseNames } = this.props;
    //     let regexCode = /^\w/;
    //     let regexYear = /^[0-9]{4}$/;
    //     this.setState({ invalidCode: false, invalidYearStart: false, invalidYearEnd: false });
    //     if (courseNames.includes(code.toLowerCase()) || !regexCode.test(code)) {
    //         this.setState({ invalidCode: true })
    //         if (courseNames.includes(code.toLowerCase())) {
    //             document.getElementById('code').setAttribute('title', 'Tên khóa đã tồn tại')
    //         } else if (!regexCode.test(code)) {
    //             document.getElementById('code').setAttribute('title', 'Bạn cần điền tên khóa')
    //         }
    //     }
    //     if (!regexYear.test(yearStart)) {
    //         this.setState({ invalidYearStart: true })
    //         document.getElementById('yearStart').setAttribute('title', 'Bạn cần điền năm bắt đầu')
    //     }
    //     if (!regexYear.test(yearEnd) || yearEnd - yearStart < 4) {
    //         this.setState({ invalidYearEnd: true });
    //         if (!regexYear.test(yearEnd)) {
    //             document.getElementById('yearEnd').setAttribute('title', 'Bạn cần điền năm kết thúc')
    //         } else if (yearEnd - yearStart < 4) {
    //             document.getElementById('yearEnd').setAttribute('title', 'Năm kết thúc phải lớn hơn năm bắt đầu 4 năm')
    //         }
    //     }
    //     if (!courseNames.includes(code.toLowerCase()) && regexCode.test(code) != '' && regexYear.test(yearStart) && regexYear.test(yearEnd) && yearEnd - yearStart >= 4) {
    //         return true;
    //     }
    //     return false;
    // }

    render() {
        let { modal, code, yearStart, yearEnd, invalidCode, invalidYearStart, invalidYearEnd } = this.state;
        let { courseNames } = this.props;
        return (
            <div>
                <Button color="primary" onClick={this.toggleModal} style={{ marginLeft: "-1em" }}><i className="fa fa-plus-square mr-1" aria-hidden="true"></i>Thêm Khóa</Button>
                <Modal isOpen={modal}>
                    <ModalHeader>Thêm Khóa</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="code">Tên Khóa</Label>
                                <Input type="text" name="code" id="code" value={code} onChange={this.onChange}  />
                            </FormGroup>
                            <FormGroup>
                                <Label for="yearStart">Năm Bắt Đầu</Label>
                                <Input type="text" name="yearStart" id="yearStart" value={yearStart} onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="yearEnd">Năm Kết Thúc</Label>
                                <Input type="text" name="yearEnd" id="yearEnd" value={yearEnd} onChange={this.onChange} />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        {!this.state.loading
                            ?
                            <div>
                                <Button color="primary" onClick={this.onAddCourse}>Thêm</Button>{' '}
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
export default ManageClass;
