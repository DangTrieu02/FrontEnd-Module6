import React from 'react';
import { login } from "../../service/userService";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useEffect } from "react";
import { ErrorMessage, Field, Formik, Form } from "formik";
import axios from 'axios';


const validateSchema = Yup.object().shape({
    username: Yup.string()
        .min(6, "Too Short")
        .max(32, "Too Long")
        .matches(/^[a-zA-Z0-9]+$/, 'tên tài khoản không được chứa ký tự đặc biệt và dấu cách.')
        .required("required"),
    password: Yup.string()
        .min(6, "Too Short")
        .max(32, "Too Long")
        .matches(/^[a-zA-Z0-9]+$/, 'Mật khẩu không được chứa ký tự đặc biệt và dấu cách.')
        .required("required"),
    confirmPassword: Yup.string()
        .min(4, "Too Short")
        .max(32, "Too Long")
        .oneOf([Yup.ref('password')], 'Mật khẩu không khớp.')
        .required("required"),
    fullName: Yup.string()
        .min(4, "Too Short")
        .max(32, "Too Long")
        .required("required"),
    phoneNumber: Yup.string()   
        .min(9, "Too Short")
        .max(12, "Too Long")
        .required("required"),
})

function Register() {
    const navigate = useNavigate()
    const handleRegister = async (values) => {
       axios.post('http://localhost:3001/users/register', values).then((response) => {
            if (response.status==209){
                swal({
                    title: "error",
                    text: response.data.message,
                    icon: "error",
                    button: "Close",
                  });
            }else{
                swal({
                    title: "success",
                    text: response.data.message,
                    icon: "success",
                    button: "Close",
                  });
                  navigate("/");
            }
       })
       
    };

    return (
        <>
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: "600px" }}>
                        <h1 className="mb-3">Register</h1>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-8 offset-2">
                            <div className="wow fadeInUp" data-wow-delay="0.5s">
                                <Formik
                                    initialValues={{
                                        username: "",
                                        password: "",
                                        confirmPassword: "",
                                        fullName: "",
                                        phoneNumber: 0
                                    }}
                                    validationSchema={validateSchema}
                                    onSubmit={(values) => {
                                        handleRegister(values)
                                    }}
                                >
                                    <Form>
                                        <div className="row g-3 "  style={{ textAlign: 'center' }}>
                                            <div className="col-8">
                                                <div className="form-floating">
                                                    <Field type="text" className="form-control" name={'username'} id="username" placeholder="Username" />
                                                    <label for="username">Username</label>
                                                    <alert className="text-danger">
                                                        <ErrorMessage name={"username"}></ErrorMessage>
                                                    </alert>
                                                </div>
                                            </div>
                                            <div className="col-8">
                                                <div className="form-floating">
                                                    <Field type="text" className="form-control" name={'fullName'} id="fullName" placeholder="Full name" />
                                                    <label for="fullName">full name</label>
                                                    <alert className="text-danger">
                                                        <ErrorMessage name={"fullName"}></ErrorMessage>
                                                    </alert>
                                                </div>
                                            </div>
                                            <div className="col-8">
                                                <div className="form-floating">
                                                    <Field type="password" className="form-control" name={'password'} id="password" placeholder="Password" />
                                                    <label for="password">Password</label>
                                                    <alert className="text-danger">
                                                        <ErrorMessage name={"password"}></ErrorMessage>
                                                    </alert>
                                                </div>
                                            </div>
                                            <div className="col-8">
                                                <div className="form-floating">
                                                    <Field type="password" className="form-control" name={'confirmPassword'} id="confirmPassword" placeholder="Confirm Password" />
                                                    <label for="confirmPassword">confirm Password</label>
                                                    <alert className="text-danger">
                                                        <ErrorMessage name={"confirmPassword"}></ErrorMessage>
                                                    </alert>
                                                </div>
                                            </div>
                                            <div className="col-8">
                                                <div className="form-floating">
                                                    <Field type="number" className="form-control" name={'phoneNumber'} id="phoneNumber" placeholder="Phone number" />
                                                    <label for="phoneNumber">phone Number</label>
                                                    <alert className="text-danger">
                                                        <ErrorMessage name={"phoneNumber"}></ErrorMessage>
                                                    </alert>
                                                </div>
                                            </div>
                                            <div className="col-8">
                                                <div className="form-floating">
                                                    <Field as="select" name="role" className="form-control form-control-user" placeholder="role">
                                                        <option value="user">User</option>
                                                        <option value="owner">Owner</option>
                                                    </Field>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <button className="btn btn-primary w-100 py-3" type="submit">Register</button>
                                            </div>
                                            <div className="col-md-6">
                                                <Link to={"/"}><button className="btn btn-warning w-100 py-3" type="submit">login</button></Link>
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

export default Register;