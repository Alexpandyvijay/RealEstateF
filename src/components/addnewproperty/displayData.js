import React, {useState,useEffect,useContext, useMemo} from "react";
import imgcon from "./images/Path 244.png";
import eyecon from "./images/Path 71.png";
import pen from "./images/Path 225.png";
import lens from "./images/fi-rr-search.png";
import "./displayData.css";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";
import Popup from "./popup";
import "./popup.css";




export default function UserList(props){
    const [userInfo, setUserInfo] = useState([]);
    const [page,setPage] = useState([]);
    const [pageCount,setPageCount] = useState([]);
    const [searchApiData, setSearchApiData] = useState([]);
    const [filter, setFilter] = useState('');
    const [useInfo] = useContext(userContext);
    const navigate = useNavigate();

    useEffect(()=>{
      const fetchdata= async () => {
        let data = await (await fetch("https://propsaleback.herokuapp.com/display",{
          method:"GET",
          headers:{
            authorization : useInfo.accessToken
          }})).json();
        if(data.status==="success"){
          setUserInfo(data.docs);
          setSearchApiData(data.docs);
        }else{
          navigate("/");
        }
      }
      fetchdata();
    },[navigate,useInfo.accessToken]);

    useMemo(()=>{
      let arr = [];
      let totalPage = Math.ceil(userInfo.length/6);
      if(totalPage>2){
        setPageCount([1,2]);
      }else{
        for(let i=1;i<=totalPage;i++){
          arr[i]=i;
        }
        setPageCount(arr);
      }
    },[userInfo]);

    
    const handleFilter = (e) => {
      if (e.target.value === '') {
        setUserInfo(searchApiData);
      } else {
        const filterResult = searchApiData.filter((item) => item.PPDID.toLowerCase().includes(e.target.value.toLowerCase()))
        setUserInfo(filterResult);
      }
      setFilter(e.target.value)
    }

    useMemo(()=>{
      if(userInfo.length<=6){
        setPage(userInfo)
      }else{
        setPage(userInfo.slice(0,6));
      }
    },[userInfo]);

    const handlePageCountInc = ()=>{
      let totalPage = Math.ceil(userInfo.length/6);
      if(totalPage > 2){
          if((pageCount[1]+2)<=totalPage){
          let newPage = pageCount.map((el)=>(el+2));
          setPageCount(newPage);
          }else{
          let newPage=[];
          for(let j=pageCount[1]+1;j<=totalPage;j++){
              newPage.push(j);
          }
          setPageCount(newPage);
          }
      }
  }
  
  const handlePageCountDec= ()=>{
      if((pageCount[0]-2)>0){
        let newPage=[];
        for(let k=pageCount[0]-2;k<pageCount[0];k++){
          newPage.push(k);
        }
        setPageCount(newPage);
      }
  }
  
  const currentPage=(e)=>{
      let el = e.target.innerText;
      el = parseInt(el);
      let end = el*6;
      let start = end-6;
      if(end >= userInfo.length){
          end = userInfo.length;
          start = (el-1)*6;
      }
      if(end === start){
          setPage(userInfo.slice(start));
      }else{
          setPage(userInfo.slice(start,end));
      }
  }


    const TableDetail = (props) => {
      const [trigger,setTrigger] = useState(false);
      const [extraInfo,setExtraInfo] = useState(false);

      const arrayBufferToBase64=(buffer)=> {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
      };
      var base64Flag = 'data:image/jpeg;base64,';
      var imageStr = arrayBufferToBase64(props.inf.image.data.data);

        return (
          <>
            <Popup trigger={trigger} base64Flag={base64Flag} imageStr={imageStr} setTrigger={setTrigger}/>
            <div className="table-details">
                <div>{props.inf.PPDID}</div>
                <div onClick={()=>(setTrigger(true))}><img src={imgcon} alt="imgicon"></img></div>
                <div>{props.inf.propType}</div>
                <div>{props.inf.mobile}</div>
                <div>{props.inf.area}</div>
                <div>{0}</div>
                <div><span>{props.inf.salesType}</span></div>
                <div>{0}</div>
                <div><img src={eyecon} alt="eyecon" onClick={()=>(setExtraInfo(!extraInfo))}></img><img src={pen} alt="pen"></img></div>
            </div>
            {extraInfo && <div className="additional-prop">
                <div><span>Price</span>{props.inf.price}</div>
                <div><span>Property Age</span>{props.inf.propAge}</div>
                <div><span>Property Approval</span>{props.inf.propAppro}</div>
                <div><span>Total Area</span>{props.inf.totalArea}</div>
                <div><span>Area Unit</span>{props.inf.areaUnit}</div>
                <div><span>No of BHK</span>{props.inf.numOfBHK}</div>
                <div><span>No of Floor</span>{props.inf.numOfFloor}</div>
                <div><span>Electricity</span>{props.inf.electricity}</div>
            </div>}
          </>
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
                    {page.map((info)=>{return <TableDetail key={count++} inf={info}/>})}
                </div>
                <div className="last">
                  <div className="pagination">
                    <div onClick={handlePageCountDec}>&laquo;</div>
                      {pageCount.map((el)=>{return <div key={el} onClick={(e)=>{currentPage(e)}}>{el}</div>})}
                    <div onClick={handlePageCountInc}>&raquo;</div>
                  </div>
                </div>
            </div>
        </div>
    );
}