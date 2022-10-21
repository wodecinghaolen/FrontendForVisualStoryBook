import {
    //Input,
    Typography,
    Row,
    Button,
    List,
    Modal,
    Image,
    Divider
    //Col
  } from 'antd';
  import React, {useState} from 'react';
  import { CopyOutlined, FileImageOutlined, FrownOutlined, RocketOutlined } from '@ant-design/icons';
  
  //const { TextArea } = Input;
  const { Title } = Typography;
  
  const GeneratedTextField = ({contexts, listdata, imageUrl, loadingState, open, setEmotions, setOpen, setLoadingState, setContexts, setListData, copyGeneratedText, imageGenerate}) => {

    const generateEmo = (it) => {
      // send request
  
      try {
        const url = new URL("http://localhost:5000/roberta-large");
        url.searchParams.append('sentence', it);
        //const res = fetch(url).then(res => res.json());
        //const text = res.generatedText
        fetch(url)
          .then(data => data.json())
          .then(data => {
          // The line below is a declaration of a array
            const plutchikEmotion = data.generatedEmo
            setEmotions([])
            setEmotions(plutchikEmotion) 
            console.log(plutchikEmotion)     
          })
          .catch(e => console.error(e));
        // set generatedText
        
      } catch (err) {
        console.log(err.message); //can be console.error
      }
  
    }

    const [listitem, setListItem] = useState("");

    const enterLoading = async (it) => {
      setLoadingState(true);
      await imageGenerate(it)
      showModal()
      setLoadingState(false)
    };

    const showModal = async() => {
      setOpen(true);
    };
    const hideModal = () => {
      setOpen(false);
    };

    return (
      <>
        <Row>
          <Title level={2}>Generated text</Title>
          <Button onClick={() => copyGeneratedText()} type="default" icon={<CopyOutlined />} size="small" />
        </Row>
        <List
          size="large"
          header={<div>Start</div>}
          footer={<div>End</div>}
          bordered
          dataSource={listdata}
          renderItem={(item) => <List.Item>{
            <>
              <Row>
                {item}
              </Row>
              <Row>
                <>
                  <Button icon={<FileImageOutlined />} type="primary" size="small" loading={loadingState} onClick={() => enterLoading(item)} />
                  <Modal
                    title="Modal"
                    open={open}
                    onOk={hideModal}
                    onCancel={hideModal}
                    okText="OK"
                    cancelText="Cancel"
                  >
                    <Row>
                      <Divider>{item}</Divider>
                      <Image
                        width={200}
                        src = {imageUrl}
                      />
                    </Row>
                  </Modal>
                </>
                <Button onClick={() => generateEmo(item)} icon={<RocketOutlined />} type="default" size="small" />
                <Button onClick={() => setContexts(contexts+' '+item)} icon={<CopyOutlined />} type="default" size="small" />
                <Button onClick={() => setListData((current) => current.filter((it) => it !== item))} icon={<FrownOutlined />} type="default" size="small" danger/>
              </Row>
            </>
          }</List.Item>}
        />
      </>
    )
  };
  
  export default GeneratedTextField;