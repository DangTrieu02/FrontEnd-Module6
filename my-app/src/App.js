/* eslint-disable no-unused-vars */
import HomePage from "./page/homePage";
import { Route, Routes} from "react-router-dom";
import Main from "./page/main";
import EditProfile from "./page/editProfile";
function App() {
  return (
    <>
       <Routes>
          <Route path={''} element={<HomePage/>}>
            <Route path={''} element={<Main/>}/>
           

          </Route>

        </Routes>
    </>
  );
}

export default App;
