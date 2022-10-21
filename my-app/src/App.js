import './App.css';
import { useState } from 'react';
import {
  Row,
  Col,
} from 'antd';
import InputBox from './components/InputBox'
import GeneratedTextField from './components/GeneratedTextField'
//import { LoadingOutlined } from '@ant-design/icons';

function App() {
  const [contexts, setContexts] = useState("");
  const [emotions, setEmotions] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [listdata, setListData] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const [open, setOpen] = useState(false);

  const generate = () => {
    // send request

    try {
      const url = new URL("http://localhost:5000/t5gen");
      url.searchParams.append('keywords', keywords);
      url.searchParams.append('contexts', contexts);
      url.searchParams.append('emotions', emotions);
      //const res = fetch(url).then(res => res.json());
      //const text = res.generatedText
      fetch(url)
        .then(data => data.json())
        .then(data => {
        // The line below is a declaration of a array
          const text = data.generatedText
          if(listdata.length === 0){
            setListData(current => [...current, contexts]);
            setListData(current => [...current, text]);
          }
          else
          {
            setListData([...listdata, text]);
          }          
        })
        .catch(e => console.error(e));
      // set generatedText
      
    } catch (err) {
      console.log(err.message); //can be console.error
    }

  }

  const imageGenerate = async (sentence) => {
    // send request

    try {
      const Url = new URL("http://localhost:5000/stablediffusion");
      Url.searchParams.append('sentence', sentence);
      await fetch(Url)
      .then(data =>{
        setImageUrl(data.url)
      })
      .catch(e => console.error(e));
      
    } catch (err) {
      console.log(err.message); //can be console.error
    }

  }

  const resetAll = () => {
    setContexts("");
    setEmotions([]);
    setKeywords("");
    setGeneratedText("");
    setListData([]);
  }

  const copyGeneratedText = () => {
    navigator.clipboard.writeText(generatedText);
  }

  return (
    <Row type="flex" justify="center" align="middle" style={{ minHeight: '75vh' }} gutter={[72, 20]}>
      <Col span={7}>
        <InputBox contexts={contexts} emotions={emotions} keywords={keywords} setContexts={setContexts} setEmotions={setEmotions} setKeywords={setKeywords} resetAll={resetAll} generate={generate} />
      </Col>
      <Col span={7}>
        <GeneratedTextField contexts={contexts} listdata={listdata} imageUrl={imageUrl} loadingState={loadingState} open={open} emotions={emotions} setEmotions={setEmotions} setOpen={setOpen} setLoadingState={setLoadingState} setContexts={setContexts} setListData={setListData} copyGeneratedText={copyGeneratedText} imageGenerate={imageGenerate}/>
      </Col>
    </Row>
  );
}

export default App;