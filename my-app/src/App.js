import './App.css';
import { 
  Row,
  Col
} from 'antd';
import InputBox from './components/InputBox'
import GeneratedTextField from './components/GeneratedTextField'

function App() {
  return (
    <Row type="flex" justify="center" align="middle" style={{minHeight: '75vh'}} gutter={[72, 20]}>
      <Col span={7}>
        <InputBox/>
      </Col>
      <Col span={7}>
        <GeneratedTextField/>
      </Col>
    </Row>
  );
}

export default App;