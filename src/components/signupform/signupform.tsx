import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { OLD_URL } from "../../constants/expressUrl";

import "../loader/loader.css";

interface SignUpValueObject {
  fullname: string;
  email: string;
  username: string;
  password: string;
}

export default function SignUpForm() {
  const navigate = useNavigate();

  const [loader, setLoader] = useState("hidden");
  const [cookie, ,] = useCookies(["username"]);

  useEffect(() => {
    if (cookie.username !== undefined) {
      navigate("/dashboard");
    }
  }, [cookie.username]);

  function handleSubmit(values: SignUpValueObject) {
    setLoader("block");
    let usernamePrev: string;
    axios.get(`${OLD_URL}/check-user/${values.username}`).then((response) => {
      usernamePrev = response.data.username;
      if (values.username === usernamePrev) {
        setLoader("hidden");
        alert("Username already exists. Please choose another one");
      } else {
        axios
          .post(`${OLD_URL}/add-user`, values)
          .then(() => {
            setLoader("hidden");
            console.log("User Added");
            navigate("/login");
          })
          .catch((err) => {
            setLoader("hidden");
            console.log("Error: ", err.message);
          });
      }
    });
  }
  return (
    <>
      <div
        className={`${loader} p-2 bg-black opacity-90 shadow-[0_0_0_1000px_black] rounded fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
      >
        <div className="loader"></div>
      </div>
      <div className="text-light text-center h-[88dvh]">
        <section
          id="banner"
          className="flex justify-center mt-5 bg-[url('/banner5.png')] md:bg-[url('/banner4.png')] h-full"
        >
          <div id="shader"></div>
          <Formik
            initialValues={{
              fullname: "",
              email: "",
              username: "",
              password: "",
            }}
            onSubmit={(values) => handleSubmit(values)}
            validationSchema={Yup.object({
              fullname: Yup.string().required("*Please enter your name"),
              email: Yup.string()
                .required("*Please enter your email id")
                .email("*Please enter a valid Email ID"),
              username: Yup.string()
                .required("*Please enter a user name")
                .matches(/^[a-z]\D+/, "*Please start with a lowercase letter")
                .min(6, "*User name should be more than 6 letters")
                .max(15, "*User name should be less than 15 letters"),
              password: Yup.string()
                .required("*Please enter a password")
                .min(6, "*Password should be more than 6 letters")
                .max(20, "*Password should be less than 20 letters")
                .matches(
                  /(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])\w{6,20}/,
                  "*Password should have at least one capital letter, one small letter and one number"
                ),
            })}
          >
            <Form
              id="content"
              action=""
              className="rounded-md flex mt-36 flex-col gap-3 h-fit"
            >
              <div id="shader"></div>
              <div className="text-lightred">Sign Up for a new Account</div>
              <div className="flex flex-col sm:grid grid-cols-2 gap-2 justify-between">
                <label htmlFor="name">Name</label>
                <Field
                  id="fullname"
                  name="fullname"
                  type="text"
                  className="bg-dark border rounded-lg px-2"
                />
                <small className="text-red-700 sm:col-span-2 sm:text-end md:pe-3 -my-1.5">
                  <ErrorMessage name="fullname" component="span"></ErrorMessage>
                </small>
              </div>
              <div className="flex flex-col sm:grid grid-cols-2 gap-2 justify-between">
                <label htmlFor="email">Email ID</label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className="bg-dark border rounded-lg px-2"
                />
                <small className="text-red-700 sm:col-span-2 sm:text-end md:pe-3 -my-1.5">
                  <ErrorMessage name="email" component="span"></ErrorMessage>
                </small>
              </div>
              <div className="flex flex-col sm:grid grid-cols-2 gap-2 justify-between">
                <label htmlFor="username">User Name</label>
                <Field
                  id="username"
                  name="username"
                  type="text"
                  className="bg-dark border rounded-lg px-2"
                />
                <small
                  id="username-err"
                  className="text-red-700 sm:col-span-2 sm:text-end md:pe-3 -my-1.5"
                >
                  <ErrorMessage name="username" component="span"></ErrorMessage>
                </small>
              </div>
              <div className="flex flex-col sm:grid grid-cols-2 gap-2 justify-between">
                <label htmlFor="password">Password</label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="bg-dark border rounded-lg px-2"
                />
                <small className="text-red-700 sm:col-span-2 sm:text-end md:pe-3 -my-1.5">
                  <ErrorMessage name="password" component="div"></ErrorMessage>
                </small>
              </div>
              <div>
                <button type="submit" className="btn mt-3">
                  Sign Up
                </button>
              </div>
              <div>
                <small>
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary">
                    Click here
                  </Link>{" "}
                  to login
                </small>
              </div>
            </Form>
          </Formik>
        </section>
      </div>
    </>
  );
}
