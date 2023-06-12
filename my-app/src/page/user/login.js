import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../../services/userService";
import Path from "../../constant/Path";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
});

export function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        dispatch(login(values)).then(() => {
            navigate("/home");
        });
    };

    return (
        <div>
            <center>
                <h3>Trang Đăng Nhập</h3>
                <Formik
                    initialValues={{
                        username: "",
                        password: "",
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <div>
                            <Field
                                type="text"
                                placeholder="Username"
                                name="username"
                                className="form-field"
                            />
                            <ErrorMessage
                                name="username"
                                component="div"
                                className="error-message"
                            />
                        </div>
                        <div>
                            <Field
                                type="password"
                                placeholder="Password"
                                name="password"
                                className="form-field"
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="error-message"
                            />
                        </div>
                        <Link to={Path.REGISTER}>Đăng ký ngay?</Link>
                        <button type="submit" className="submit-button">
                            Đăng nhập
                        </button>
                    </Form>
                </Formik>
            </center>
        </div>
    );
}
