import React,{useContext, useState} from "react";
import "./inputfield.css";
import store from "../../store";
import axios from "axios";
import {userContext} from "../../App.js";
import { useNavigate } from "react-router-dom";

export default function LocationInfo(props){
    const [useInfo] = useContext(userContext);
    const navigate = useNavigate();
    let data ={
        email : '',
        area : '',
        address : '',
        latitude : '',
        city : '',
        pincode : '',
        landMark : '',
        longitude : ''
    }
    const [locData, setLocData] = useState(data);
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
        for(let keys in locData){
            if(locData[keys]===''){
                alert(`Required field ${keys} is empty`);
                return false;
            }
        }
        return true;
    }

    const saveHandle = async () => {
        if(fieldCheck()){
            store.dispatch({
                type : 'add',
                playload : locData
            })
            let finalData = store.getState();
            let formData = new FormData();
            for(let key in finalData){
                formData.append(key,finalData[key]);
            }
            let docs= await axios.post(`https://propsaleback.herokuapp.com/display`,formData,{
                    headers : {
                        authorization : useInfo.accessToken
                    }
                });
            console.log(docs);
            props.setBasicTab(tab);
            props.setBasicNum(num);
            props.setBasicLett(lett);
            props.setLocTab(null);
            props.setLocNum(null);
            props.setLocLett(null);
            setLocData(data);
            if(docs.data.status==="unauthorized"){
                navigate("/");
            }
            if(docs.data.status==="success"){
                console.log("success");
                props.setNav(0);
                props.setDisplayPro(true);
            }
        }

    }
    const prevHandle = () => {
        props.setGenTab(tab);
        props.setGenNum(num);
        props.setGenLett(lett);
        props.setLocTab(null);
        props.setLocNum(null);
        props.setLocLett(null);
        props.setNav(2);
    }
    return (
        <div className="input-field">
            <form>
                <div className="left">

                    <label>Email</label>
                    <input type="email" name="email" placeholder="Email" value={locData.email} onChange={(e)=>{setLocData({...locData,email:e.target.value})}}></input>

                    <label>Area</label>
                    <input name="area" type="text" placeholder="Area" value={locData.area} onChange={(e)=>{setLocData({...locData,area:e.target.value})}}></input>

                    <label>Address</label>
                    <input name="address" type="text" placeholder="Address" value={locData.address} onChange={(e)=>{setLocData({...locData,address:e.target.value})}}></input>

                    <label>Latitude</label>
                    <input name="latitude" type="text" placeholder="Latitude" value={locData.latitude} onChange={(e)=>{setLocData({...locData,latitude:e.target.value})}}></input>
                </div>
                <div className="right">
                    <label>City</label>
                    <input name="city" type="text" placeholder="City" value={locData.city} onChange={(e)=>{setLocData({...locData,city:e.target.value})}}></input>

                    <label>Pincode</label>
                    <input name="pincode" type="text" placeholder="Pincode" value={locData.pincode} onChange={(e)=>{setLocData({...locData,pincode:e.target.value})}}></input>

                    <label>Land Mark</label>
                    <input name="landMark" type="text" placeholder="Land Mark" value={locData.landMark} onChange={(e)=>{setLocData({...locData,landMark:e.target.value})}}></input>

                    <label>Longitude</label>
                    <input name="longitude" type="text" placeholder="Longitude" value={locData.longitude} onChange={(e)=>{setLocData({...locData,longitude:e.target.value})}}></input>
                </div>
            </form>
            <button id="previous" onClick={prevHandle}>Previous</button>
            <button type="submit" id='add' onClick={saveHandle}>Add Property</button>
        </div>
    );
}