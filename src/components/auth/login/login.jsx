import React from "react";
import {Formik} from "formik";
import './login.css';
import PropTypes from 'prop-types'
import axios from "axios";

function Login({setToken}) {
    return (
        <div>
            <div><h1>Log in</h1></div>
            <Formik initialValues={{email: '', password: ''}}
                    validate={values => {
                        const errors = {}
                        if (!values.email) {
                            errors.email = <div className="alert alert-danger">*Email Required*</div>;
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email = <div className="alert alert-danger">*Invalid email address</div>;
                        }
                        if (!values.password) {
                            errors.password = <div className="alert alert-danger">*Password Required*</div>;
                            // } else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i.test(values.password)) {
                            //     errors.password = <div className="alert alert-danger">*Not Strong*</div>;
                        }
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        console.log(values);
                        axios.post("http://localhost:10000/accounts/login/user", values).then(
                            res => {
                                console.log(res)
                                if (res.data) {
                                    setToken(res.data)
                                }
                            }, onerror => {
                                console.log(onerror.response)
                            }
                        )
                        setSubmitting(false);
                    }}>
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="input-group mt-2 fields">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Email:</span>
                            </div>
                            <input className="form-control"
                                   type="email"
                                   name="email"
                                   value={values.email}
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   placeholder={"example@mail.com"}/>
                        </div>
                        {/* will show the email validation messages */}
                        {errors.email && touched.email && errors.email}

                        <div className={"input-group mt-2 fields"}>
                            <div className={"input-group-prepend"}>
                                <span className={"input-group-text"} id="basic-addon1">Password:</span>
                            </div>
                            <input className={"form-control"}
                                   type="password"
                                   name="password"
                                   value={values.password}
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   placeholder={"********"}/>
                        </div>
                        {/* will show the password validation messages */}
                        {errors.password && touched.password && errors.password}

                        <button className={"btn btn-primary mt-2"} type="submit" disabled={isSubmitting}>
                            Sign in
                        </button>
                    </form>
                )}
            </Formik>
            {/*<form action="">*/}
            {/*    <div>*/}
            {/*        <span>Email: </span>*/}
            {/*        <input type="email"/>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <span>Password: </span>*/}
            {/*        <input type="password"/>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <button className="btn btn-primary" type="submit">Sign in</button>*/}
            {/*    </div>*/}
            {/*</form>*/}
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login;