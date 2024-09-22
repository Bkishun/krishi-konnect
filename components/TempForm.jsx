"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerUser } from "@/lib/actions/user.action";

const postSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string().min(6, "Too Short!").max(12, "Too Long!"),
  adhaarNumber: Yup.string()
    .min(12, "Too Short!")
    .max(12, "Too Long!")
    .required("Required"),
  address: Yup.string().min(6, "Too Short!").required("Required"),
  userType: Yup.string().required("Required"),
});

const TempForm = () => {
  return (
    <Formik
      initialValues={{
        name: "",
        password: "",
        adhaarNumber: "",
        address: "",
        userType: "",
      }}
      validationSchema={postSchema}
      onSubmit={async (values) => {
        console.log(values);
        const result = await registerUser(values);
        console.log(result);
      }}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form>
          <div>
            <label htmlFor="name">Full Name</label>
            <Field name="name" placeholder="" />
            {errors.name && touched.name ? (
              <div style={{ color: "red" }}>{errors.name}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field name="password" placeholder="" />
          </div>
          <div>
            <label htmlFor="adhaarNumber">Adhaar Number</label>
            <Field name="adhaarNumber" placeholder="" />
            {errors.adhaarNumber && touched.adhaarNumber ? (
              <div style={{ color: "red" }}>{errors.adhaarNumber}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="address">Address</label>
            <Field name="address" placeholder="Address" />
            {errors.address && touched.address ? (
              <div style={{ color: "red" }}>{errors.address}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="userType">User Type</label>
            <Field as="select" name="userType">
              <option value="" label="Select a User type" />
              <option value="buyer" label="Buyer" />
              <option value="farmer" label="Farmer" />
            </Field>
            <ErrorMessage name="userType" component="div" />
          </div>

          <button className="bg-green-500 p-2" type="submit">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default TempForm;
