import React,{useState,useContext} from "react";
import home from "./images/Path 255.png";
import bell from "./images/Path 254.png";
import downArrow from "./images/Path 257.png";
import upArrow from "./images/Path 258.png";
import eye from "./images/Path 249.png";
import tag from "./images/Path 266.png";
import logo from "./images/Logo.png";
import userIcon from "./images/Path 30.png";
import power from "./images/power.png";
import dropArrow from "./images/dropDown.png";
import "./addnewproperty.css";
import BasicInfo from "./basicInfo";
import PropertyDetails from "./propertyDetails";
import GeneralInfo from "./generalInfo";
import LocationInfo from "./locationInfo";
import UserList from "./displayData";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";


export default function AddNewProperty() {
    let [useInfo,setUseInfo] = useContext(userContext);
    const navigate = useNavigate();
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

    const [basicTab , setBasicTab] = useState(tab);
    const [basicNum , setBasicNum] = useState(num);
    const [basicLett , setBasicLett] = useState(lett);
    const [propTab , setPropTab] = useState(null);
    const [propNum , setPropNum] = useState(null);
    const [propLett , setPropLett] = useState(null);
    const [genTab , setGenTab] = useState(null);
    const [genNum , setGenNum] = useState(null);
    const [genLett , setGenLett] = useState(null);
    const [locTab , setLocTab] = useState(null);
    const [locNum , setLocNum] = useState(null);
    const [locLett , setLocLett] = useState(null);
    const [nav , setNav] = useState(0);
    const [displayPro,setDisplayPro] = useState(true);

    const NavBar = () => {
        return (
            <>
            <h3>ADD NEW PROPERTY</h3>
            <div className="navigator">
                <div className="tab" style={basicTab}>
                    <span className="num" style={basicNum}>1</span>
                    <span className="let" style={basicLett}>Basic Info</span>
                </div>
                <div className="tab" style={propTab}>
                    <span className="num" style={propNum}>2</span>
                    <span className="let" style={propLett}>Property Detail</span>
                </div>
                <div className="tab" style={genTab}>
                    <span className="num" style={genNum}>3</span>
                    <span className="let" style={genLett}>General Info</span>
                </div>
                <div className="tab" style={locTab}>
                    <span className="num" style={locNum}>4</span>
                    <span className="let" style={locLett}>Location Info</span>
                </div>
            </div>
            </>
        );
    }
    const logoutHandler=()=>{
        setUseInfo({...useInfo,accessToken:""});
        navigate("/")
    }
    const HandleRoute = () => {
        if(displayPro){
            return <UserList setDisplayPro={setDisplayPro}/>
        }else{
            if(nav===0){
                return <BasicInfo setDisplayPro={setDisplayPro} setNav={setNav} setBasicTab={setBasicTab} setBasicNum={setBasicNum} setBasicLett={setBasicLett} setPropTab={setPropTab} setPropNum={setPropNum} setPropLett={setPropLett}/>;
            }else if(nav===1){
                return <PropertyDetails setNav={setNav} setBasicTab={setBasicTab} setBasicNum={setBasicNum} setBasicLett={setBasicLett} setPropTab={setPropTab} setPropNum={setPropNum} setPropLett={setPropLett} setGenTab={setGenTab} setGenNum={setGenNum} setGenLett={setGenLett}/>
            }else if(nav===2){
                return <GeneralInfo setNav={setNav} setPropTab={setPropTab} setPropNum={setPropNum} setPropLett={setPropLett} setGenTab={setGenTab} setGenNum={setGenNum} setGenLett={setGenLett} setLocTab={setLocTab} setLocNum={setLocNum} setLocLett={setLocLett}/>
            }else if(nav===3){
                return <LocationInfo setDisplayPro={setDisplayPro} setNav={setNav} setBasicTab={setBasicTab} setBasicNum={setBasicNum} setBasicLett={setBasicLett} setGenTab={setGenTab} setGenNum={setGenNum} setGenLett={setGenLett} setLocTab={setLocTab} setLocNum={setLocNum} setLocLett={setLocLett}/>
            }
        }

    }

    return (
        <div className="main">
            <div className="side-bar">
                <img src={logo} alt='logo'></img>
                <ul>
                    <li><img src={home} alt="*"></img><span>Property</span></li>
                    <li><img src={bell} alt="*"></img><span>Assistance</span></li>
                    <li><img src={downArrow} alt="*"></img><span>Received Interest</span></li>
                    <li><img src={upArrow} alt="*"></img><span>Sent Interest</span></li>
                    <li><img src={eye} alt="*"></img><span>Property Views</span></li>
                    <li><img src={tag} alt="*"></img><span>Tariff Plan</span></li>
                </ul>
            </div>
            <div className="section">
                <div className="header">
                    <p className="userId">USER ID : {useInfo.userId}</p>
                    <div className="dropDown">
                        <div className="dropBtn">
                            <img src={userIcon} alt='userIcon'></img>
                            <span>{useInfo.userName}</span>
                            <img src={dropArrow} alt='icon'></img>
                            <div className="drop-content" onClick={logoutHandler}><img src={power} alt="power"></img><span>Logout</span></div>
                        </div>
                    </div>
                </div>

                <div className="nav-bar">
                    {!displayPro && <NavBar/>}           
                    {HandleRoute()}
                </div>
            </div>
        </div>
    );
}