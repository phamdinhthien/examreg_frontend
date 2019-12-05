import React, {Component} from 'react';
import { Table } from 'reactstrap';
import EditTableClassSection from '../Components/EditTableClassSection';

class ClassSection extends Component {
    render(){
          return(
            <div>
            <Table striped>
            <thead>
             <tr>
                <th>STT</th>
                <th>Mã Học Phần</th>
                <th>Số Lượng Đăng Kí</th>
                <th>Chỉnh Sửa</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>INT2202-21</td>
                <td>50/50</td>
                <td className="edit"> <EditTableClassSection/></td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>INT2204-25</td>
                <td>50/50</td>
                <td className="edit"><EditTableClassSection/></td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>POL2201-21</td>
                <td>40/50</td>
                <td className="edit"><EditTableClassSection/></td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>MAT2201-24</td>
                <td>45/50</td>
                <td className="edit"><EditTableClassSection/></td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td>INT2203-22</td>
                <td>50/50</td>
                <td className="edit"><EditTableClassSection/></td>
              </tr>
              <tr>
                <th scope="row">6</th>
                <td>POL2204-22</td>
                <td>45/50</td>
                <td className="edit"><EditTableClassSection/></td>
              </tr>
            </tbody>
          </Table>
          </div>
          );
  }
}
  export default ClassSection;