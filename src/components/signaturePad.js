import React,{useState, useEffect, useCallback, useRef} from 'react'
import Signature from "signature_pad";

const SignaturePad = ({onClear,onSave,width,height,bgColor}) => {
  const [signaturePad, setSignaturePad] = useState();
  const canvasRef = useRef(null);
  const cachedSignature = useRef(null);

  const setPadConfig = useCallback(() => {
    let tempSignaturePad = new Signature(canvasRef.current, {
      backgroundColor: bgColor,
   });
    setSignaturePad(tempSignaturePad);
  } ,[bgColor]);
  
  const readyPad = useCallback(() => {
    if(!signaturePad){
      canvasRef.current.getContext("2d").scale(1, 1);
      canvasRef.current.width =  canvasRef.current.offsetWidth; 
      canvasRef.current.height =  canvasRef.current.offsetHeight;
      setPadConfig();
    }
  },[setPadConfig, signaturePad]);
 

  const clearSignature = useCallback(() => {
    signaturePad.clear()
  }, [signaturePad]);

  // Event Handlers
  const handleResize = useCallback(()=>{
    cachedSignature.current =  signaturePad.toDataURL();
    const width = canvasRef.current.offsetWidth;
    const height = canvasRef.current.offsetHeight;
    canvasRef.current.width =  width; 
    canvasRef.current.height =  height;
    signaturePad.fromDataURL(cachedSignature.current,{width,height});

  },[signaturePad]);
  const handleClear = () => {
    clearSignature()
    cachedSignature.current = null
    onClear()
  }
  const handleSave = () =>{
    if(signaturePad.isEmpty()) return alert("Please provide a signature first.");
    onSave(signaturePad.toDataURL())
  };

  // Effects
  useEffect(() => {
    setPadConfig();
  } ,[bgColor, setPadConfig]);

  useEffect(() => {
    readyPad();
    window.addEventListener("resize",handleResize);
    return () => {
      window.removeEventListener("resize",handleResize);
    } 
  },[readyPad,handleResize]);
  
  return (
    <div style={
      {
        width:width,
        height:height
      }}>
      <canvas 
        ref={canvasRef} 
        id="signature-pad" 
        style={{border:"solid 2px",width:"100%" ,height:"100%",flex: "1 0 0%"}}
      ></canvas>
      <div>
        <button onClick={handleSave}>
          Save
        </button>
        <button onClick={handleClear}>
          Clear
        </button>
      </div>
    </div>
  )
}

export default SignaturePad
