import React,{useState} from "react";
import "./inputfield.css";
import camera from "./images/dslr-camera.png";
import store from "../../store";


export default function GeneralInfo(props){

    let data = {
        name : '',
        postedBy: '',
        add_image : null,
        mobile : '',
        salesType : '',
    }
    const [genData, setGenData] = useState(data);
    const tab = {
        borderRadius: "20px",
        boxShadow: "5px 8px 10px 0px rgba(0,0,0,0.2)",
        backgroundColor: "#6AB4F8",
        cursor: "pointer"
    }
    const lett = {
        color: "#FFFFFF"
    }
    const num = {
        backgroundColor: "#FFFFFF",
        color: "black"
    }

    const fieldCheck = () => {
        for(let keys in genData){
            if(genData[keys]===''){
                alert(`Required field ${keys} is empty`);
                return false;
            }
        }
        return true;
    }


    const saveHandle = () => {
        if(fieldCheck()){
            store.dispatch({
                type: "add",
                playload : genData
            })
            props.setGenTab(null);
            props.setGenNum(null);
            props.setGenLett(null);
            props.setLocTab(tab);
            props.setLocNum(num);
            props.setLocLett(lett);
            setGenData(data);
            props.setNav(3);
        }
    }
    const prevHandle = () => {
        props.setPropTab(tab);
        props.setPropNum(num);
        props.setPropLett(lett);
        props.setGenTab(null);
        props.setGenNum(null);
        props.setGenLett(null);
        setGenData(data);
        props.setNav(1);
    }
    return (
        <div className="input-field">
            <form>
                <div className="left">

                    <label>Name</label>
                    <input type="text" name="name" placeholder="enter your name" value={genData.name} onChange={(e)=>{setGenData({...genData,name:e.target.value})}}></input>

                    <label>Posted By</label>
                    <select name="postedBy" onChange={(e)=>{setGenData({...genData,postedBy:e.target.value})}}>
                        <option value="">Posted By</option>
                        <option value="Owner">Owner</option>
                        <option value="Mediator">Mediator</option>
                    </select>
                    <div className='imageDiv'>
                        <input type='file' name='add_image' id='image' onChange={(e)=>{setGenData({...genData,add_image:e.target.files[0]})}}></input>
                        <span><img src={camera} alt="camera"></img></span>
                        <span>Add Photo</span>
                    </div>
                </div>
                <div className="basic right">
                    <label>Mobile</label>
                    <input type="tel" name="mobile" placeholder="mobile number" pattern="[0-9]{10}" value={genData.mobile} onChange={(e)=>{setGenData({...genData,mobile:e.target.value})}}></input>
                    
                    <label>Sales Type</label>
                    <select name="salesType" onChange={(e)=>{setGenData({...genData,salesType:e.target.value})}}>
                        <option value="">Please Select</option>
                        <option value="Sold">Sold</option>
                        <option value="Unsold">Unsold</option>
                    </select>

                </div>
            </form>
            <button id="previous" onClick={prevHandle}>Previous</button>
            <button type="submit" id='save' onClick={saveHandle}>save & continue</button>
        </div>
    );
}