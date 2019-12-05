import React from 'react';
import { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Spinner, Badge } from 'reactstrap';
import { alertText, alertTextCustom } from '../../../../core/Controller';
import * as ApiConfig from '../../../../api/ConfigApi';
class AddClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            code: "",
            yearStart: "",
            yearEnd: "",
            loading: false,
            invalidCode: false,
            invalidYearStart: false,
            invalidYearEnd: false
        }
    }

    toggleModal = (e) => {
        e.preventDefault();
        this.props.setCollapse(this.props.index);
        this.setState({
            modal: !this.state.modal,
            code: '',
            loading: false,
            invalidCode: false,
            invalidYearStart: false,
            invalidYearEnd: false
        });
        if (!this.state.modal) {
            fetch(ApiConfig.API_URL + '/Courses/GetOneCourse.php?id=' + this.props.courseID)
                .then(res => res.json())
                .then(response => {
                    let code = response.data[0].code;
                    let yearStart = response.data[0].year_start;
                    let yearEnd = response.data[0].year_end;
                    this.setState({
                        code: code,
                        yearStart: yearStart,
                        yearEnd: yearEnd
                    })
                })
                .catch(err => console.log(err))
        }

    }
    onChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
    }
    onUpdateCourse = () => {
        this.setState({
            loading: true
        })
        let courseID = this.props.courseID;
        let code = this.state.code;
        let yearStart = this.state.yearStart;
        let yearEnd = this.state.yearEnd;
        let data = {
            id: courseID,
            code: code,
            year_start: yearStart,
            year_end: yearEnd
        }
        if (this.checkValue()) {
            fetch(ApiConfig.API_URL + '/Courses/UpdateOneCourse.php', {
                method: 'POST',
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then(response => {
                    alertTextCustom("Cập nhật khóa học thành công", "#28a745");
                    this.props.loadData();
                    this.setState({
                        modal: false
                    })
                })
                .catch(err => alertText('Cập nhật khóa học không thành công'))
        } else {
            this.setState({
                loading: false
            })
        }
    }

    checkValue = () => {
        let { code, yearStart, yearEnd } = this.state;
        let regexCode = /^\w/;
        let regexYear = /^[0-9]{4}$/;
        this.setState({ invalidCode: false, invalidYearStart: false, invalidYearEnd: false });
        if (!regexCode.test(code)) {
            this.setState({ invalidCode: true })
                document.getElementById('code').setAttribute('title', 'Bạn cần điền tên khóa')
        }
        if (!regexYear.test(yearStart)) {
            this.setState({ invalidYearStart: true })
            document.getElementById('yearStart').setAttribute('title', 'Bạn cần điền năm bắt đầu')
        }
        if (!regexYear.test(yearEnd) || yearEnd - yearStart < 4) {
            this.setState({ invalidYearEnd: true });
            if (!regexYear.test(yearEnd)) {
                document.getElementById('yearEnd').setAttribute('title', 'Bạn cần điền năm kết thúc')
            } else if (yearEnd - yearStart < 4) {
                document.getElementById('yearEnd').setAttribute('title', 'Năm kết thúc phải lớn hơn năm bắt đầu 4 năm')
            }
        }
        if (regexCode.test(code) != '' && regexYear.test(yearStart) && regexYear.test(yearEnd) && yearEnd - yearStart >= 4) {
            return true;
        }
        return false;
    }

    render() {
        let { modal, code, yearStart, yearEnd, invalidCode, invalidYearStart, invalidYearEnd } = this.state;
        return (
            <div className="update-course-btn">
                <Button color="success" className="mr-1" onClick={this.toggleModal}><i className="fa fa-pencil-square-o mr-1"></i>Sửa </Button>
                <Modal isOpen={modal} >
                    <ModalHeader>Cập Nhật Khóa Học </ModalHeader>
                    <ModalBody>
                        <Form onClick={(e) => { e.preventDefault() }}>
                            <FormGroup>
                                <Form>
                                    <FormGroup>
                                        <Label for="code">Tên Khóa</Label>
                                        <Input type="text" name="code" id="code" value={code} onChange={this.onChange} invalid={invalidCode} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="yearStart">Năm Bắt Đầu</Label>
                                        <Input type="text" name="yearStart" id="yearStart" value={yearStart} onChange={this.onChange} invalid={invalidYearStart} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="yearEnd">Năm Kết Thúc</Label>
                                        <Input type="text" name="yearEnd" id="yearEnd" value={yearEnd} onChange={this.onChange} invalid={invalidYearEnd} />
                                    </FormGroup>
                                </Form>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        {!this.state.loading
                            ?
                            <div>
                                <Button color="primary" onClick={this.onUpdateCourse}>Lưu</Button>{' '}
                                <Button color="secondary" onClick={this.toggleModal}>Hủy</Button>
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

export default AddClass;