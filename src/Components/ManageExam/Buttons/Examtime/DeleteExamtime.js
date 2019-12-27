import React, { Component } from 'react';
import { Button, Badge, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import { alertText, alertTextCustom } from '../../../../core/Controller';
import * as ApiConfig from '../../../../api/ConfigApi';

class DeleteExamtime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            loading: false
        }
    }
    toggle = (e) => {
        e.preventDefault();
        this.setState({
            modal: !this.state.modal,
            loading: false
        });
    }
    onDeleteExamtime = () => {
        this.setState({
            loading: true
        })
        let examtimeID = this.props.examtimeID;
        fetch(ApiConfig.API_URL + '/Examtimes/DeleteOneExamtime.php?id=' + examtimeID)
            .then(res => res.json())
            .then(response => {
                alertTextCustom("Xóa ca thi thành công", "#28a745");
                this.props.loadData();
                this.setState({
                    modal: false
                })
            })
            .catch(err => alertText('Xóa ca thi không thành công'))
    }
    render() {
        let { modal } = this.state;
        return (
            <div className="class-funcs delete-class-btn">
                <Badge color="danger" onClick={this.toggle}><i className="fa fa-trash mr-1"></i>Xóa</Badge>
                <Modal isOpen={modal} >
                    <ModalHeader>Xóa Ca Thi</ModalHeader>
                    <ModalBody>
                        Bạn Có Muốn Xóa Ca Thi Này
            </ModalBody>
                    <ModalFooter>
                        {!this.state.loading
                            ?
                            <div>
                                <Button color="danger" onClick={this.onDeleteExamtime}>Xóa</Button>{' '}
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
export default DeleteExamtime;