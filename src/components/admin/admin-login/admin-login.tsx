import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { OLD_URL } from "../../../constants/expressUrl";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["username"]);

  useEffect(() => {
    if (cookie.username === "admin") {
      navigate("/admin");
    }
  }, [cookie.username]);

  function handleSubmit(values: { username: string; password: string }) {
    axios.get(`${OLD_URL}/get-admin`).then((res) => {
      if (
        res.data.username === values.username &&
        res.data.password === values.password
      ) {
        setCookie("username", values.username);
        navigate("/admin");
      } else {
        alert("Invalid credentials. Please try again.");
      }
    });
  }
  return (
    <>
      <div className="text-light text-center h-[88dvh]">
        <section
          id="banner"
          className="flex justify-center items-start mt-5 bg-[url('/banner5.png')] md:bg-[url('/banner4.png')] h-full"
        >
          <div id="shader"></div>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
            validationSchema={Yup.object({
              username: Yup.string()
                .required("*Please enter a user name")
                .matches(/^[a-z]\D+/, "*Please start with a lowercase letter")
                .min(5, "*User name should be more than 6 letters")
                .max(15, "*User name should be less than 15 letters"),
              password: Yup.string()
                .required("*Please enter a password")
                .min(6, "*Password should be more than 6 letters")
                .max(20, "*Password should be less than 20 letters"),
            })}
          >
            <Form
              id="content"
              action=""
              className="rounded-md flex mt-36 flex-col gap-2.5"
            >
              <div id="shader"></div>
              <div className="text-lightred">Admin Login</div>

              <div className="flex flex-col sm:grid grid-cols-2 gap-2 justify-between">
                <label htmlFor="username">User Name</label>
                <Field
                  id="username"
                  name="username"
                  type="text"
                  className="bg-dark border rounded-lg px-2"
                />
              </div>
              <small className="text-red-700 sm:col-span-2 sm:text-end sm:pe-3 -my-1.5">
                <ErrorMessage name="username" component="span"></ErrorMessage>
              </small>
              <div className="flex flex-col sm:grid grid-cols-2 gap-2 justify-between">
                <label htmlFor="password">Password</label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="bg-dark border rounded-lg px-2"
                />
                <small className="text-red-700 sm:col-span-2 sm:text-end sm:pe-3 -my-1.5">
                  <ErrorMessage name="password" component="span"></ErrorMessage>
                </small>
              </div>
              <div>
                <button type="submit" className="btn mt-3">
                  Login
                </button>
              </div>
            </Form>
          </Formik>
        </section>
      </div>
    </>
  );
}
