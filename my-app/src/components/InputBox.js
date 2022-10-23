import {
    Input,
    Typography,
    Checkbox,
    Button,
    Row,
    Popover,
    Space
  } from 'antd';
  import React from 'react';
  import { QuestionCircleOutlined } from '@ant-design/icons';
  
  const { TextArea } = Input;
  const { Title } = Typography;
  const hovercontent = (
    <div>
      <p>Input format: kw1;kw2;kw3;...</p>
    </div>
  );
  const options = [
    { label: 'joy', value: 'joy' },
    { label: 'trust', value: 'trust' },
    { label: 'fear', value: 'fear' },
    { label: 'surprise', value: 'surprise' },
    { label: 'sadness', value: 'sadness' },
    { label: 'disgust', value: 'disgust' },
    { label: 'anger', value: 'anger' },
    { label: 'anticipation', value: 'anticipation' },
  ];
  
  const InputBox = ({ contexts, emotions, keywords, setContexts, setEmotions, setKeywords, resetAll, generate }) => {
    const printEmo = (checkedValues) =>{
      setEmotions(checkedValues)
    }
    return (
      <>
        <Row>
          <Title level={2}>Contexts</Title>
        </Row>
        <TextArea rows={4} value={contexts} onChange={(e) => setContexts(e.target.value)} maxLength={255} span={6} style={{ resize: 'none' }} bordered showCount />
        <br />
        <br />
        <br />
        <Title level={2}>Plutchik's emotion</Title>
        <Checkbox.Group value={emotions} options={options} onChange={printEmo} />
        <br />
        <br />
        <br />
        <Row>
          <Title level={2}>NER keywords</Title>
          <Popover content={hovercontent} title="Format your input" trigger="hover">
            <QuestionCircleOutlined />
          </Popover>
        </Row>
        <TextArea rows={4} value={keywords} onChange={(e) => setKeywords(e.target.value)} maxLength={255} style={{ resize: 'none' }} span={6} showCount />
        <br />
        <br />
        <Space align='start' direction='horizontal'>
          <Button onClick={() => resetAll()} type="primary" size="large" danger>Reset</Button>
          <Button onClick={() => generate()} type="primary" size="large">Generate!</Button>
        </Space>
      </>
    )
  };
  
  export default InputBox;