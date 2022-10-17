import './App.css';
import { useState } from 'react';
import {
  Row,
  Col
} from 'antd';
import InputBox from './components/InputBox'
import GeneratedTextField from './components/GeneratedTextField'

function App() {
  const [contexts, setContexts] = useState("");
  const [emotions, setEmotions] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [generatedText, setGeneratedText] = useState("");

  const generate = () => {
    // send request

    try {
      const url = new URL("http://localhost:5000/t5gen");
      url.searchParams.append('keywords', keywords);
      url.searchParams.append('contexts', contexts);
      url.searchParams.append('emotions', emotions);
      //const res = fetch(url).then(res => res.json());
      //const text = res.generatedText
      fetch("http://localhost:5000/t5gen")
        .then(data => data.json())
        .then(data => {
        // The line below is a declaration of a array
          const text = data.generatedText
          setGeneratedText(generatedText + text)
        })
        .catch(e => console.error(e));
      // set generatedText
      
    } catch (err) {
      console.log(err.message); //can be console.error
    }

  }

  const resetAll = () => {
    setContexts("");
    setEmotions([]);
    setKeywords("");
    setGeneratedText("");
  }

  const copyGeneratedText = () => {
    navigator.clipboard.writeText(generatedText);
  }

  return (
    <Row type="flex" justify="center" align="middle" style={{ minHeight: '75vh' }} gutter={[72, 20]}>
      <Col span={7}>
        <InputBox contexts={contexts} emotions={emotions} keywords={keywords} setContexts={setContexts} setEmotions={setEmotions} setKeywords={setKeywords} generatedText={generatedText} resetAll={resetAll} generate={generate} />
      </Col>
      <Col span={7}>
        <GeneratedTextField generatedText={generatedText} copyGeneratedText={copyGeneratedText} />
      </Col>
    </Row>
  );
}

export default App;