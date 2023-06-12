import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { changePassword } from "../../services/userService";

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

    const handleSubmit = async (values) => {
        try {
            await dispatch(changePassword(values));
            navigate("/home");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container py-5">
            <h2 className="mb-4">Change Password</h2>
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
                    <div className="mb-3">
                        <label htmlFor="currentPassword" className="form-label">Current Password:</label>
                        <Field type="password" id="currentPassword" name="currentPassword" className="form-control" />
                        <ErrorMessage name="currentPassword" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label">New Password:</label>
                        <Field type="password" id="newPassword" name="newPassword" className="form-control" />
                        <ErrorMessage name="newPassword" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password:</label>
                        <Field type="password" id="confirmNewPassword" name="confirmNewPassword" className="form-control" />
                        <ErrorMessage name="confirmNewPassword" component="div" className="text-danger" />
                    </div>
                    <button type="submit" className="btn btn-primary">Change Password</button>
                </Form>
            </Formik>
        </div>
    );
}
