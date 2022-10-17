import {
    Input,
    Typography,
    Row,
    Button
  } from 'antd';
  import React from 'react';
  import { CopyOutlined } from '@ant-design/icons';
  
  const { TextArea } = Input;
  const { Title } = Typography;
  
  const GeneratedTextField = ({generatedText, copyGeneratedText}) => {
    return (
      <>
        <Row>
          <Title level={2}>Generated text</Title>
          <Button onClick={() => copyGeneratedText()} type="default" icon={<CopyOutlined />} size="small" />
        </Row>
        <TextArea value={generatedText} maxLength={255} span={6} style={{ minHeight: '45vh', minWidth: '75hh', resize: 'none' }} disabled />
      </>
    )
  };
  
  export default GeneratedTextField;