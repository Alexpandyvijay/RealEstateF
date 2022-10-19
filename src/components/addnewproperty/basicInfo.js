import React,{useState} from "react";
import "./inputfield.css";
import store from "../../store";


export default function BasicInfo(props){
    let data = {
        propType : '',
        price : '',
        propAge : '',
        propDesc : '',
        negotiable : '',
        ownerShip : '',
        propAppro : '',
        bankLoan : ''
    }

    const [basicData , setBasicData] = useState(data);

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
        for(let keys in basicData){
            if(basicData[keys]===''){
                alert(`Required field ${keys} is empty`);
                return false;
            }
        }
        return true;
    }
    const handleCancel = ()=>{
        props.setDisplayPro(true);
    }

    const saveHandle = () => {
        if(fieldCheck()){
            store.dispatch({
                type : "add",
                playload: basicData
            });
            props.setBasicTab(null);
            props.setBasicNum(null);
            props.setBasicLett(null);
            props.setPropTab(tab);
            props.setPropNum(num);
            props.setPropLett(lett);
            setBasicData(data);
            props.setNav(1);
        }
    }

    return (
        <div className="input-field">
            <form>
                <div className="left">
                    <label>Property Type</label>
                    <select name="propType" onChange={(e)=>{setBasicData({...basicData,propType : e.target.value})}}>
                        <option value="">select property Type</option>
                        <option value="Home">Home</option>
                        <option value="Plot">Plot</option>
                        <option value="Flat">Flat</option>
                    </select>

                    <label>Price</label>
                    <input type="text" name="price" placeholder="Example 100000" value={basicData.price} onChange={(e)=>{setBasicData({...basicData,price : e.target.value})}}></input>

                    <label>Property Age</label>
                    <select name="propAge" onChange={(e)=>{setBasicData({...basicData,propAge : e.target.value})}}>
                        <option value="">select property Age</option>
                        <option value="Below 25 years">Below 25 years</option>
                        <option value="Above 25 years">Above 25 years</option>
                    </select>

                    <label>Property Description</label>
                    <input name="propDesc" type="text" value={basicData.propDesc} onChange={(e)=>{setBasicData({...basicData,propDesc : e.target.value})}}></input>
                </div>
                <div className="right">
                    <label>Negotiable</label>
                    <select name="negotiable" onChange={(e)=>{setBasicData({...basicData,negotiable : e.target.value})}}>
                        <option value="">select negotiable</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>

                    <label>OwnerShip</label>
                    <select name="ownerShip" onChange={(e)=>{setBasicData({...basicData,ownerShip : e.target.value})}}>
                        <option value="">select ownership</option>
                        <option value="Multiple">Multiple</option>
                        <option value="Single">Single</option>
                    </select>

                    <label>Property Approved</label>
                    <select name="propAppro" onChange={(e)=>{setBasicData({...basicData,propAppro : e.target.value})}}>
                        <option value="">property Approved or not</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>

                    <label>Bank Loan</label>
                    <select name="bankLoan" onChange={(e)=>{setBasicData({...basicData,bankLoan : e.target.value})}}>
                        <option value="">select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
            </form>
            <button id="cancel" onClick={handleCancel}>cancel</button>
            <button type="submit" id='save' onClick={saveHandle}>save & continue</button>
        </div>
    );
}