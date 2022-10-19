import React,{useState , createContext} from "react";
import './App.css';
import SignIn from "./components/authentication/signin.js";
import SignUp from "./components/authentication/signup.js";
import AddNewProperty from './components/addnewproperty/addnewproperty';
import { BrowserRouter, Routes ,Route} from 'react-router-dom';
const userContext = createContext([]);
function App() {
  const [useInfo,setUseInfo] = useState({
    userId : '',
    userName : '',
    accessToken : ''
  });

  return (
    <div className="App">
      <BrowserRouter>
        <userContext.Provider value={[useInfo,setUseInfo]}>
          <Routes>
            <Route exact path="/" element={<SignIn/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/display" element={<AddNewProperty/>} />
          </Routes>
        </userContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
export {userContext};
