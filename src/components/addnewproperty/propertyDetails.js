import React,{useState} from "react";
import "./inputfield.css";
import store from "../../store";

export default function PropertyDetails(props){
    let data = {
        length : '',
        totalArea : '',
        numOfBHK : '',
        attached : '',
        furnished : '',
        lift : '',
        facing : '',
        breath : '',
        areaUnit : '',
        numOfFloor: '',
        westernTo : '',
        carPark : '',
        electricity : '',
    }
    const [propData ,setPropData] = useState(data);
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
        for(let keys in propData){
            if(propData[keys]===''){
                alert(`Required field ${keys} is empty`);
                return false;
            }
        }
        return true;
    }

    const saveHandle = () => {
        if(fieldCheck()){
            store.dispatch({
                type : "add",
                playload: propData
            })
            props.setPropTab(null);
            props.setPropNum(null);
            props.setPropLett(null);
            props.setGenTab(tab);
            props.setGenNum(num);
            props.setGenLett(lett);
            setPropData(data);
            props.setNav(2);
        }
    }
    const prevHandle = () => {
        props.setBasicTab(tab);
        props.setBasicNum(num);
        props.setBasicLett(lett);
        props.setPropTab(null);
        props.setPropNum(null);
        props.setPropLett(null);
        setPropData(data);
        props.setNav(0);
    }
    return (
        <div className="input-field">
            <form>
                <div className="left">
                    <label>Length</label>
                    <input type="text" name="length" value={propData.length} onChange={(e)=>{setPropData({...propData,length:e.target.value})}} placeholder="Example 100000"></input>

                    <label>Total Area</label>
                    <input type="text" name="totalArea" placeholder="Example 250000" value={propData.totalArea} onChange={(e)=>{setPropData({...propData,totalArea:e.target.value})}}></input>

                    <label>No of BHK</label>
                    <select name="numOfBHK" onChange={(e)=>{setPropData({...propData,numOfBHK:e.target.value})}}>
                        <option value="">select No of BHK</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>

                    <label>Attached</label>
                    <select name="attached" onChange={(e)=>{setPropData({...propData,attached:e.target.value})}}>
                        <option value="">select Attached</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>

                    <label>Furnished</label>
                    <select name="furnished" onChange={(e)=>{setPropData({...propData,furnished:e.target.value})}}>
                        <option value="">select furnished</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>

                    <label>Lift</label>
                    <select name="lift" onChange={(e)=>{setPropData({...propData,lift:e.target.value})}}>
                        <option value="">select lift</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>

                    <label>Facing</label>
                    <select name="facing" onChange={(e)=>{setPropData({...propData,facing:e.target.value})}}>
                        <option value="">select facing</option>
                        <option value="East">East</option>
                        <option value="West">West</option>
                        <option value="North">North</option>
                        <option value="South">South</option>
                        <option value="NorthEast">NorthEast</option>
                    </select>
                </div>
                <div className="basic right">
                    <label>Breath</label>
                    <input type="text" name="breath" placeholder="Example 100000" value={propData.breath} onChange={(e)=>{setPropData({...propData,breath:e.target.value})}}></input>
                    
                    <label>Area Unit</label>
                    <select name="areaUnit" onChange={(e)=>{setPropData({...propData,areaUnit:e.target.value})}}>
                        <option value="">select area unit</option>
                        <option value="Sqft">Sqft</option>
                        <option value="Sqmeter">Sqmeter</option>
                    </select>

                    <label>No of Floor</label>
                    <select name="numOfFloor" onChange={(e)=>{setPropData({...propData,numOfFloor:e.target.value})}}>
                        <option value="">select No of Floor</option>
                        <option value="G+1">G+1</option>
                        <option value="G+2">G+2</option>
                        <option value="G+3">G+3</option>
                        <option value="Above 3">Above 3</option>
                    </select>

                    <label>Western Toilet</label>
                    <select name="westernTo" onChange={(e)=>{setPropData({...propData,westernTo:e.target.value})}}>
                        <option value="">select Western Toilet</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>

                    <label>Car Parking</label>
                    <select name="carPark" onChange={(e)=>{setPropData({...propData,carPark:e.target.value})}}>
                        <option value="">select car parking</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>

                    <label>Electricity</label>
                    <select name="electricity" onChange={(e)=>{setPropData({...propData,electricity:e.target.value})}}>
                        <option value="">select Electricity</option>
                        <option value="I Phase">I Phase</option>
                        <option value="III Phase">III Phase</option>
                    </select>
                </div>
            </form>
            <button id="previous" onClick={prevHandle}>Previous</button>
            <button type="submit" id='save' onClick={saveHandle}>save & continue</button>
        </div>
    );
}