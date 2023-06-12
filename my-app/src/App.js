import HomePage from "./page/homePage";
import { Route, Routes} from "react-router-dom";
import Main from "./page/main";
import Login from "./page/user/login";
function App() {
  return (
    <>
       <Routes>
           <Route path={""} element={<Login></Login>}></Route>

           <Route path={''} element={<HomePage/>}>
            <Route path={'home'} element={<Main/>}/>
          </Route>

        </Routes>
    </>
  );
}

export default App;
