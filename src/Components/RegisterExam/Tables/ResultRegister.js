import React, { Component } from 'react';
import { Table, Container } from 'reactstrap';
import { Button } from 'reactstrap';
import * as ApiConfig from '../../../api/ConfigApi';
import { getCurrentRoles, getUserId } from '../../../core/GetRoles';

const userID = getUserId();

class ResultRegister extends Component {
 
  render() {
    return (
      <div className="container">
          <h3>Các Môn Thi Đã Chọn</h3>
        <Table striped>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên Môn Thi</th>
              <th>Mã Học Phần</th>
              <th>Phòng Thi</th>
              <th>Số Lượng Dự Thi</th>
              <th>Ngày Thi</th>
              <th>Huỷ</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </Table>
        <Button color="success">Xác Nhận</Button>{' '}
      </div>
    );
  }

}
export default ResultRegister;