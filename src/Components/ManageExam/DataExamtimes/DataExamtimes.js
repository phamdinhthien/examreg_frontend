import React, { Component } from 'react';
import { Table, Container } from 'reactstrap';
import EditTableExam from '../Buttons/Examtime/EditTableExam';
class ManageExam extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <div className="container">
        <Table striped>
          <thead>
            <tr><th>Ca Thi Số 1</th></tr>
            <tr>
              <th>STT</th>
              <th>Môn Thi</th>
              <th>Mã Học Phần</th>
              <th>Phòng Thi</th>
              <th>Số Lượng Dự Thi</th>
              <th>Ngày Thi</th>
              <th>Chỉnh Sửa</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Đại số</td>
              <td>INT2203-24</td>
              <td>201-G2</td>
              <td>40/42</td>
              <td>14:00-17/09/2019</td>
              <td className="edit"><EditTableExam /></td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Toán rời rạc</td>
              <td>INT2203-24</td>
              <td>201-G2</td>
              <td>40/42</td>
              <td>8:00-18/09/2019</td>
              <td className="edit"><EditTableExam /></td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Cơ Nhiệt</td>
              <td>INT2203-24</td>
              <td>201-G2</td>
              <td>40/42</td>
              <td>10:00-18/09/2019</td>
              <td className="edit"><EditTableExam /></td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Giải Tích</td>
              <td>INT2203-24</td>
              <td>201-G2</td>
              <td>40/42</td>
              <td>14:00-19/09/2019</td>
              <td className="edit"><EditTableExam /></td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Tư Tưởng HCM</td>
              <td>INT2203-24</td>
              <td>201-GĐ2</td>
              <td>40/42</td>
              <td>10:00-20/09/2019</td>
              <td className="edit"><EditTableExam /></td>
            </tr>
            <tr>
              <th scope="row">6</th>
              <td>Lập trình OOP</td>
              <td>INT2203-24</td>
              <td>205-G2</td>
              <td>40/42</td>
              <td>14:00-20/09/2019</td>
              <td className="edit"><EditTableExam /></td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }

}
export default ManageExam;