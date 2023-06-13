import {login} from "../../service/userService";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import swal from "sweetalert";
import {useEffect} from "react";
import { ErrorMessage, Field, Formik, Form } from "formik";
// import "../../../public/assets/css/login.css"



const validateSchema = Yup.object().shape({
    username: Yup.string()
        .min(6, "tài khoản cần dài từ 6 đến 32 kí tự")
        .max(32, "tài khoản cần dài từ 6 đến 32 kí tự")
        .required("required"),
    password: Yup.string()
        .min(6, "mật khẩu cần dài từ 6 đến 32 kí tự")
        .max(32, "mật khẩu cần dài từ 6 đến 32 kí tự")
        .required("required")

})
export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogin = async (values) => {
        await dispatch(login(values)).then((e) => {
            if (e.payload !== "User not found" && e.payload !== "Wrong password") {
                const { role } = e.payload;
                if (role === "owner") {
                    navigate("/owner");
                } else {
                    navigate("/home");
                }
            } else if (e.payload === "User not found") {
                swal("User not found");
            } else if (e.payload === "Wrong password") {
                swal("Wrong password");
            }
        });
    };
    // useEffect(()=>{
    //     localStorage.clear()
    // },[])
    return (
        <>


            <div className="img js-fullheight body_login" style={{
                backgroundImage: 'url(bg.jpg)'
            }}>
                <section className="ftco-section">
                    <div className="login-container">
                        <div className="row justify-content-center">
                            <div className="col-md-6 text-center mb-5">
                                <h2 className="heading-section">Login</h2>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-6 col-lg-4">
                                <div className="login-wrap p-0">
                                    <h3 className="mb-4 text-center">Have an account?</h3>
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
                                    <Form action="#" className="signin-form">
                                        <div className="form-group">
                                            <Field type="text" className="form-control-login " name={"username"} placeholder="Username" required/>
                                            <alert className="text-danger">
                                                <ErrorMessage name={"username"}></ErrorMessage>
                                            </alert>
                                        </div>
                                        <div className="form-group">
                                            <Field id="password-field" name={"password"} type="password" className="form-control-login " placeholder="Password" required/>
                                            <alert className="text-danger">
                                                <ErrorMessage name={"password"}></ErrorMessage>
                                            </alert>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit"  className="form-control-login  btn btn-primary submit px-3">Sign In</button>
                                        </div>
                                        <div className="form-group d-md-flex">
                                            <div className="w-50">
                                                <label className="checkbox-wrap checkbox-primary">Remember Me
                                                    <input type="checkbox" checked/>
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                            <div className="w-50 text-md-right">
                                                <a href="#" style={{color: '#fff'}}>Forgot Password</a>
                                            </div>
                                        </div>
                                    </Form>
                                    </Formik>

                                    <p className="w-100 text-center">&mdash; Or Sign In With &mdash;</p>
                                    <div className="social d-flex text-center">
                                        <a href="#" className="px-2 py-2 mr-md-1 rounded"><span className="ion-logo-facebook mr-2"></span> Facebook</a>
                                        <a href="/register" className="px-2 py-2 ml-md-1 rounded"><span className="ion-logo-twitter mr-2"></span>register</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );


}