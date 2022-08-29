import { useState } from 'react';
import SignaturePad from './components/signaturePad';
import './App.css';

function App() {
  const [color,setColor] = useState("white");
  const onSignatureSave = (data) => {
    console.log("signature saved:", data);
  }
  const onSignatureClear = () => {
    console.log("signature cleared");
  }
  const toggleBackgroundColor = () => {
    setColor(color === "white" ? "blue" : "white");
    console.log(`background color changed to ${color}`);
  }
  return (
    <div className="App">
    <h1>React JS - Signature Pad</h1>
    <h2>Start drawing your signature!</h2>
    <button onClick={toggleBackgroundColor}>toggleColor</button>
    <div className="App2" >
      <SignaturePad 
        bgColor={color}
        width="90%"
        height="400px"
        onClear={onSignatureClear} 
        onSave={onSignatureSave}/>
    </div>
    </div>)
}

export default App;
