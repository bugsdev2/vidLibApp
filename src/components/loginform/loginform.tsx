import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function LoginForm() {
  function handleSubmit(values: { username: string; password: string }) {
    console.log(values);
  }
  return (
    <>
      <div className="text-light text-center h-[88dvh]">
        <header className="flex p-3 justify-center">
          <Link to="/" className="text-2xl font-bold cursor-pointer">
            <span className="uppercase">Movie</span>{" "}
            <span className="text-primary uppercase">Library</span>
          </Link>
        </header>
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
              className="rounded-md flex mt-36 flex-col gap-3"
            >
              <div id="shader"></div>
              <div className="text-lightred">Login to your Account</div>

              <div className="flex flex-col md:grid grid-cols-2 gap-2 justify-between">
                <label htmlFor="username">User Name</label>
                <Field
                  id="username"
                  name="username"
                  type="text"
                  className="bg-dark border rounded-lg px-2"
                />
              </div>
              <small className="text-red-700 md:col-span-2 md:text-end md:pe-3">
                <ErrorMessage name="username" component="span"></ErrorMessage>
              </small>
              <div className="flex flex-col md:grid grid-cols-2 gap-2 justify-between">
                <label htmlFor="password">Password</label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="bg-dark border rounded-lg px-2"
                />
                <small className="text-red-700 md:col-span-2 md:text-end md:pe-3">
                  <ErrorMessage name="password" component="span"></ErrorMessage>
                </small>
              </div>
              <div>
                <button type="button" className="btn mt-3">
                  Login
                </button>
                <div>
                  <small>
                    <Link to="/signup" className="text-primary">
                      Click here
                    </Link>{" "}
                    to create a new account
                  </small>
                </div>
              </div>
            </Form>
          </Formik>
        </section>
      </div>
    </>
  );
}
