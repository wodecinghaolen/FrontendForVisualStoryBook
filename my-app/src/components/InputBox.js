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
    { label: 'Joy', value: '0' },
    { label: 'Trust', value: '1' },
    { label: 'Fear', value: '2' },
    { label: 'Surprise', value: '3' },
    { label: 'Sadness', value: '4' },
    { label: 'Disgust', value: '5' },
    { label: 'Anger', value: '6' },
    { label: 'Anticipation', value: '7' },
];

const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
};

const InputBox = () => {
    return (
        <>
            <Row>
                <Title level={2}>Background</Title>
            </Row>
            <TextArea rows={4} placeholder="" maxLength={255} span={6} style={{resize: 'none'}} bordered showCount/>
            <Button>Use generated text</Button>
            <br />
            <br />
            <br />
            <Title level={2}>Plutchik's emotion</Title>
            <Checkbox.Group options={options} onChange={onChange} />
            <br />
            <br />
            <br />
            <Row>
                <Title level={2}>NER keywords</Title>
                <Popover content={hovercontent} title="Format your input" trigger="hover">
                    <QuestionCircleOutlined />
                </Popover>
            </Row>
            <TextArea rows={4} placeholder="" maxLength={255} style={{resize: 'none'}} span={6} showCount/>
            <br />
            <br />
            <Space align='start' direction = 'horizontal'>
                <Button type="primary" size="large" danger>Reset</Button>
                <Button type="primary" size="large">Generate!</Button>
            </Space>
        </>
    )
};

export default InputBox;