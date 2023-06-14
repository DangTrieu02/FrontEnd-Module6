import { login } from "../../service/userService";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useEffect } from "react";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { GoogleLogin } from 'google-login-react';
import axios from "axios";


const validateSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, "Too Short")
        .max(32, "Too Long")

        .required("required"),
    password: Yup.string()
        .min(2, "Too Short")
        .max(32, "Too Long")
        .required("required")

})
export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogin = async (values) => {
        await dispatch(login(values)).then((e) => {
            if (e.payload !== "User not found" && e.payload !== "Wrong password") {
                navigate("/home");
            } else if (e.payload === "User not found") {
                swal("User not found");
            } else if (e.payload === "Wrong password") {
                swal("Wrong password");
            }
        });
    };
    let user = localStorage.getItem("user");
    useEffect(()=>{
        if (user){
        navigate("/home");
    }
    },[])
    
    return (
        <>
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: "600px" }}>
                        <h1 className="mb-3">Login</h1>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-8 offset-2">
                            <div className="wow fadeInUp" data-wow-delay="0.5s">
                                <Formik
                                    initialValues={{
                                        username: "",
                                        password: "",
                                    }}
                                    validationSchema={validateSchema}
                                    onSubmit={(values) => {
                                        handleLogin(values)
                                    }}
                                >
                                    <Form>
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <div className="form-floating">
                                                    <Field type="text" className="form-control" name={'username'} id="username" placeholder="Username" />
                                                    <label for="username">Username</label>
                                                    <alert className="text-danger">
                                                        <ErrorMessage name={"username"}></ErrorMessage>
                                                    </alert>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating">
                                                    <Field type="password" className="form-control" name={'password'} id="password" placeholder="Password" />
                                                    <label for="password">Password</label>
                                                    <alert className="text-danger">
                                                        <ErrorMessage name={"password"}></ErrorMessage>
                                                    </alert>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <button className="btn btn-primary w-100 py-3" type="submit">Login</button>
                                            </div>
                                            <div className="col-md-6">
                                                <Link to={"/register"}><button className="btn btn-warning w-100 py-3" type="submit">Register</button></Link>
                                            </div>
                                            <GoogleLogin
                                                clientId='884724746848-412afcr1b3pg39o206pj5rlha8driq78.apps.googleusercontent.com'
                                                onSuccess={async (res) => {await axios.post('http://localhost:3001/users/login-google',res).then((res)=>{
                                                    localStorage.setItem("user",JSON.stringify(res.data))
                                                    localStorage.setItem("access-token",res.data.token)
                                                    navigate("/home");
                                                })}}
                                                onError={(err) => console.log(err)}
                                                containerClass="<your_custom_class>"
                                            >
                                                <button>Google Login</button>
                                            </GoogleLogin>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );


}