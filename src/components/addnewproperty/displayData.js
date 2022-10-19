import React, {useState,useEffect,useContext} from "react";
import imgcon from "./images/Path 244.png";
import eyecon from "./images/Path 71.png";
import pen from "./images/Path 225.png";
import lens from "./images/fi-rr-search.png";
import "./displayData.css";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";




export default function UserList(props){
    const [userInfo, setUserInfo] = useState([])
    const [searchApiData, setSearchApiData] = useState([])
    const [filter, setFilter] = useState('');
    const [useInfo] = useContext(userContext);
    const navigate = useNavigate();

    useEffect(()=>{
      const fetchdata= async () => {
        let data = await (await fetch("http://propsaleback.herokuapp.com/display",{
          method:"GET",
          headers:{
            authorization : useInfo.accessToken
          }})).json();
        if(data.status==="success"){
          setUserInfo(data.docs);
          setSearchApiData(data.docs)
        }else{
          navigate("/")
        }
      }
      fetchdata();
    },[navigate,useInfo.accessToken])
    
    const handleFilter = (e) => {
      if (e.target.value === '') {
        setUserInfo(searchApiData)
      } else {
        const filterResult = searchApiData.filter((item) => item.PPDID.toLowerCase().includes(e.target.value.toLowerCase()))
        setUserInfo(filterResult)
      }
      setFilter(e.target.value)
    }

    const TableDetail = (props) => {
        const Views = Math.floor(Math.random()*100);
        const day = Math.floor(Math.random()*100);
        return (
            <div className="table-details">
                <div>{props.inf.PPDID}</div>
                <div><img src={imgcon} alt="img"></img></div>
                <div>{props.inf.propType}</div>
                <div>{props.inf.mobile}</div>
                <div>{props.inf.area}</div>
                <div>{Views}</div>
                <div><span>{props.inf.salesType}</span></div>
                <div>{day}</div>
                <div><img src={eyecon} alt="eyecon"></img><img src={pen} alt="pen"></img></div>
            </div>
        );
    }
    let count=0;
    return (
        <div className="display">
            <div className="search">
                <div><input type="text" placeholder="Search PPD ID" value={filter} onInput={(e) => handleFilter(e)}></input><img src={lens} alt="sr"></img></div>
                <button className="nav-btn" onClick={()=>(props.setDisplayPro(false))}>Add Property</button>
            </div>
            <div className="display-content">
                <div className="table-header">
                    <div>PPD ID</div>
                    <div>Image</div>
                    <div>Property</div>
                    <div>Contact</div>
                    <div>Area</div>
                    <div>Views</div>
                    <div>Status</div>
                    <div>Days left</div>
                    <div>Action</div>
                </div>
                <div className="align-table">
                    {userInfo.map((info)=>{return <TableDetail key={count++} inf={info}/>})}
                </div>
            </div>
        </div>
    );
}