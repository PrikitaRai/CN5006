import React,{useState,useEffect} from "react";
import Love from './Love.png'
import Sad from './sad.png'
import Like from './like.png'
import Happy from './happy.png'
function EmojeeCounter(props){
    console.log("pic is",props.pic)
    
    const[pic,setPic]=useState(Love)
    const[count, setCount]=useState(0)
    useEffect(()=>{
        console.log("funtion called",props.pic)
        if(props.pic=="Love")
            setPic(Love)
        else if (props.pic=="Like")
            setPic(Like)
        else if (props.pic=="sad")
        setPic(Sad)
        else if (props.pic=="happy")
            setPic(Happy)
 })
 const ClickHandle=() =>
 {
    setCount(count+1)
 }
 return(
    <div className ="App">
        <p>{props.pic}<span></span>
        <button onClick={ClickHandle}>{count}
            <img src={pic} alt=""/></button></p>
    </div>
 )

}export default EmojeeCounter;
