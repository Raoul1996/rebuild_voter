import React,{Component} from 'react'
import { Card, Col, Row } from 'antd';
import './index.less'
class ShowList extends Component {
  render() {
    return(
      <div>
        <Card>
          <div className="custom-image">
            <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
          </div>
          <div className="custom-card">
            <h3>Europe Street beat</h3>
            <p>www.instagram.com</p>
          </div>
        </Card>
      </div>
    )
  }
}
export default ShowList