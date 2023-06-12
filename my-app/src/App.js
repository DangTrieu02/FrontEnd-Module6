import HomePage from "./page/homePage";
import { Route, Routes} from "react-router-dom";
import Main from "./page/main";
import Login from "./page/user/login";
import ChangePassword from "./page/user/change-password";

function App() {
  return (
    <>
       <Routes>
           <Route path={""} element={<Login/>}></Route>
            <Route path={'/change-password'} element={<ChangePassword/>}></Route>
           <Route path={''} element={<HomePage/>}>
            <Route path={'home'} element={<Main/>}/>
          </Route>

        </Routes>
    </>
  );
}

export default App;
