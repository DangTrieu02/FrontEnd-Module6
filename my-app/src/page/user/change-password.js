// change-password.js
import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {changePassword} from "../../services/userService";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from "react-redux";

const ChangePasswordSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string()
        .min(6, 'New Password must be at least 6 characters')
        .required('New Password is required'),
    confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm New Password is required'),
});

export default function ChangePassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {params} = useParams();
const user = useSelector((state)=>{
    console.log(state,99999)
})
    const handleSubmit = (values) => {
        dispatch(changePassword(values)).then(() => {
            navigate("/home");
        });
    };

    return (
        <div>
            <h2>Change Password</h2>
            <Formik
                initialValues={{
                    currentPassword: '',
                    newPassword: '',
                    confirmNewPassword: '',
                }}
                validationSchema={ChangePasswordSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div>
                        <label htmlFor="currentPassword">Current Password:</label>
                        <Field type="password" id="currentPassword" name="currentPassword" />
                        <ErrorMessage name="currentPassword" component="div" />
                    </div>
                    <div>
                        <label htmlFor="newPassword">New Password:</label>
                        <Field type="password" id="newPassword" name="newPassword" />
                        <ErrorMessage name="newPassword" component="div" />
                    </div>
                    <div>
                        <label htmlFor="confirmNewPassword">Confirm New Password:</label>
                        <Field type="password" id="confirmNewPassword" name="confirmNewPassword" />
                        <ErrorMessage name="confirmNewPassword" component="div" />
                    </div>
                    <button type="submit">Change Password</button>
                </Form>
            </Formik>
        </div>
    );
}