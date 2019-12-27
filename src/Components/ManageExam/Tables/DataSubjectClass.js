import React, { Component } from 'react';
import { Table, Container } from 'reactstrap';
import EditSubjectClass from '../Buttons/SubjectClass/EditSubjectClass';
import AddClassCode from '../Buttons/SubjectClass/AddClassCode';
// Chứa các trường dữ liệu của bảng Học Phần
class DataSubjectClass extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <div className="container">
        <AddClassCode/>
        <Table striped>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên Học Phần</th>
              <th>Mã Học Phần</th>
              <th>Số Lượng Sinh Viên</th>
              <th>Lớp Học Phần</th>
              <th>Chỉnh Sửa</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Đại số</td>
              <td>INT2203</td>
              <td>40</td>
              <td>21</td>
              <td className="edit"><EditSubjectClass /></td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Toán rời rạc</td>
              <td>INT2205</td>
              <td>40</td>
              <td>20</td>
              <td className="edit"><EditSubjectClass /></td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Cơ Nhiệt</td>
              <td>INT2204</td>
              <td>50</td>
              <td>23</td>
              <td className="edit"><EditSubjectClass /></td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }

}
export default DataSubjectClass;