import {login} from "../../service/userService";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import swal from "sweetalert";
import {useEffect} from "react";
import { ErrorMessage, Field, Formik, Form } from "formik";


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

    return (
        <>
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: "600px"}}>
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
                                                    <Field type="text" className="form-control" name={'username'} id="username" placeholder="Username"/>
                                                    <label for="username">Username</label>
                                                    <alert className="text-danger">
                                                        <ErrorMessage name={"username"}></ErrorMessage>
                                                    </alert>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating">
                                                    <Field type="password" className="form-control" name={'password'} id="password" placeholder="Password"/>
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