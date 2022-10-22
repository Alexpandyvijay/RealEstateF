import React from "react";

export default function Popup(props){
    const {trigger,base64Flag,imageStr,setTrigger}=props;
    return (
        <>
            {trigger && 
            <div className="popup">
                <div className="popup-inner">
                    <button onClick={()=>(setTrigger(false))}>&times;</button>
                    <img src={base64Flag+imageStr} alt="img"></img>
                </div>
            </div>}
        </>
    );
}