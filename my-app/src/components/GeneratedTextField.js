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

const GeneratedTextField = () => {
    return (
        <>
            <Row>
                <Title level={2}>Generated text</Title>
                <Button type="default" icon={<CopyOutlined />} size="small"/>
            </Row>
            <TextArea placeholder="" maxLength={255} span={6} style={{minHeight: '45vh', minWidth: '75hh', resize: 'none'}} disabled/>
        </>
    )
};

export default GeneratedTextField;