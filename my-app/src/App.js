import HomePage from "./page/homePage";
import {Route, Routes} from "react-router-dom";
import Main from "./page/main";
import Login from "./page/user/login";
import HomeOwner from "./page/owner/homeOwner";

function App() {
    let user = localStorage.getItem("user");

    return (
        <>
            <Routes>

                <Route path={""} element={<Login></Login>}></Route>
                {user ?
                    <>
                    <Route path={"owner"} element={<HomeOwner></HomeOwner>}></Route>
                    <Route path={''} element={<HomePage/>}>
                        <Route path={'home'} element={<Main/>}/>
                    </Route>
                    </>
                    :
                    <Route path={"*"} element={<Login></Login>}></Route>

                }
            </Routes>
        </>
    );
}

export default App;
