import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Admin() {
  const navigate = useNavigate();
  const [cookie, ,] = useCookies(["username"]);
  const [categories, setCategories] = useState([]);
  const [videosList, setVideosList] = useState([]);
  const [modalDisplay, setModalDisplay] = useState("hidden");
  const [newCategoryDisplay, setNewCategoryDisplay] = useState("hidden");
  const categoryFormRef = useRef<any>(null);

  interface Video {
    title: string;
    videoCode: string;
    description: string;
  }

  interface Category {
    id: string;
    name: string;
    category: string;
  }

  useEffect(() => {
    if (cookie.username !== "admin") {
      navigate("/admin-login");
    }
  }, [cookie.username]);

  useEffect(() => {
    axios.get("https://vidlibapp-api.onrender.com/categories").then((res) => {
      setCategories(res.data);
    });
  }, [categories]);

  useEffect(() => {
    axios.get("https:vidlibapp-api.onrender.com/get-videos").then((res) => {
      setVideosList(res.data);
    });
  }, [videosList]);

  function handleVideoSubmit(values: {}, resetForm: any) {
    console.log(values);
    axios
      .post("https://vidlibapp-api.onrender.com/add-video", values)
      .then(() => {
        alert("Video Added");
        setModalDisplay("hidden");
      })
      .catch((err) => {
        console.log(err.message);
      });
    resetForm();
  }

  function handleNewCategory() {
    if (confirm("Are you sure you want to add the new category?")) {
      console.log(categoryFormRef.current.value);
      const categoryObj = { new_category: categoryFormRef.current.value };
      axios
        .post("https://vidlibapp-api.onrender.com/add-category", categoryObj)
        .then(() => {
          alert(`Added New Category: ${categoryObj.new_category}`);
          categoryFormRef.current.value = "";
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }

  return (
    <>
      <main className="flex flex-col items-center gap-3">
        <section>
          <button className="btn" onClick={() => setModalDisplay("flex")}>
            Add New Video
          </button>
        </section>
        <section className="">
          <div>
            <select
              className="text-dark px-2 rounded py-1"
              name="category"
              id="category"
            >
              <option value="all">All</option>
              {categories.map((category: Category) => {
                return (
                  <option key={category.id} value={category.category}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
        </section>
        <section>
          <div>
            {videosList.map((video: Video) => {
              return (
                <div className="grid grid-cols-2 mb-4">
                  <div className="flex flex-col items-center justify-stretch">
                    <div className="text-xl text-primary mb-4">
                      {video.title}
                    </div>
                    <div>
                      {categories.find((item) => {
                        return item === "balumahendra";
                      })}
                    </div>
                    <iframe
                      className="text-center"
                      // width="560"
                      // height="315"
                      src={`https://www.youtube.com/embed/${video.videoCode}`}
                      title={`${video.title}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen="true"
                    ></iframe>
                  </div>
                  <div>{video.description}</div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      {/* THIS SECTION BELOW CONATAINS THE DIFFERENT MODALS USED IN THE CURRENT SLICE */}

      {/* THIS ONE IS THE MODAL FOR ADDING A NEW VIDEO */}
      <div
        className={`fixed inset-0 ${modalDisplay} justify-center items-center`}
      >
        <div className="relative bg-dark">
          <Formik
            initialValues={{
              title: "",
              description: "",
              category: "",
              url: "",
            }}
            onSubmit={(values, { resetForm }) => {
              handleVideoSubmit(values, resetForm);
            }}
            validationSchema={Yup.object({
              title: Yup.string().required("*Please enter a Title"),
              description: Yup.string().required("*Please enter a Description"),
              category: Yup.string().required("*Please enter a Category"),
              url: Yup.string().required("*Please enter a Link"),
            })}
            className="relative"
          >
            <Form className="border rounded-lg p-5 flex flex-col gap-3">
              <div className="flex justify-between gap-2">
                <label htmlFor="title">Title</label>
                <Field
                  className="bg-dark border rounded-lg px-2"
                  name="title"
                  id="title"
                ></Field>
              </div>
              <ErrorMessage
                className="text-red-600 text-right -my-2"
                name="title"
                component="small"
              />
              <div className="flex justify-between gap-2">
                <label htmlFor="description">Description</label>
                <Field
                  className="bg-dark border rounded-lg px-2"
                  name="description"
                  id="description"
                ></Field>
              </div>
              <ErrorMessage
                className="text-red-600 text-right -my-2"
                name="description"
                component="small"
              />
              <div className="flex justify-between gap-2">
                <label className="me-4" htmlFor="category">
                  Category
                </label>
                <div className="flex gap-2 w-full ms-1">
                  <Field
                    className="bg-dark border w-full rounded-lg px-2"
                    name="category"
                    component="select"
                    id="category"
                  >
                    <option value="">Select Category</option>
                    {categories.map(
                      (category: {
                        id: string;
                        name: string;
                        category: string;
                      }) => {
                        return (
                          <option key={category.id} value={category.category}>
                            {category.name}
                          </option>
                        );
                      }
                    )}
                  </Field>
                  <span
                    className="bi bi-plus-circle text-white cursor-pointer"
                    onClick={() => setNewCategoryDisplay("flex")}
                  ></span>
                </div>
              </div>
              <ErrorMessage
                className="text-red-600 text-right -my-2"
                name="category"
                component="small"
              />
              <div className="flex justify-between gap-2">
                <label htmlFor="url">Link</label>
                <Field
                  className="bg-dark border rounded-lg px-2"
                  name="url"
                  id="url"
                ></Field>
              </div>
              <ErrorMessage
                className="text-red-600 text-right -my-2"
                name="url"
                component="small"
              />
              <div className="text-center mt-2">
                <button type="submit" className="btn">
                  Add
                </button>
              </div>
              {/* THIS MODAL IS PLACED WITHIN (OR RIGHT ABOVE) THE PARENT MODAL WHICH ALLOWS USERS TO ADD A NEW CATEGORY */}
              <div
                className={`absolute inset-0 ${newCategoryDisplay} justify-center items-center bg-dark border rounded-lg`}
              >
                <div className="flex flex-col items-center gap-3">
                  <label htmlFor="new_category">New Category</label>
                  <input
                    ref={categoryFormRef}
                    type="text"
                    name="new_category"
                    id="new_category"
                    className="bg-dark border border-white rounded-xl px-2"
                  />
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setNewCategoryDisplay("hidden")}
                      className="btn-outline"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn"
                      onClick={handleNewCategory}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
              {/* THIS IS THE END OF THE NEW CATEGORY MODAL */}
            </Form>
          </Formik>
          <span
            onClick={() => setModalDisplay("hidden")}
            className={`bi bi-x absolute -top-2 -right-2 h-6 w-6 cursor-pointer bg-primary flex justify-center items-center rounded-full hover:border hover:border-white`}
          ></span>
        </div>
      </div>
      {/* THIS IS THE END OF THE ADD NEW VIDEO MODAL */}
    </>
  );
}
