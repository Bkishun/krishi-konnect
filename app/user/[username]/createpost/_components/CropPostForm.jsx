"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createPost } from "@/lib/actions/post.action";

const postSchema = Yup.object().shape({
  cropName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  cropType: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  minprice: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  maxPrice: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  quantity: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string().min(2, "Too Short!").required("Required"),
  address: Yup.string().min(2, "Too Short!").required("Required"),
  pictureUrl: Yup.string().required("Required"),
});

const CropPostForm = () => {
  return (
    <Formik
      initialValues={{
        cropName: "",
        cropType: "",
        minprice: "",
        maxPrice: "",
        quantity: "",
        description: "",
        address: "",
        pictureUrl: "",
      }}
      validationSchema={postSchema}
      onSubmit={async (values) => {
        // same shape as initial values

        const result = await createPost(values)
        console.log(result);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div>
            <label htmlFor="cropName">Crop Name</label>
            <Field name="cropName" placeholder="Ex: Potato" />
            {errors.cropName && touched.cropName ? (
              <div style={{ color: "red" }}>{errors.cropName}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="cropType">Crop Type</label>
            <Field as="select" name="cropType">
              <option value="" label="Select a fruit" />
              <option value="apple" label="Apple" />
              <option value="banana" label="Banana" />
              <option value="orange" label="Orange" />
              <option value="grape" label="Grape" />
            </Field>
            {/* Error message */}
            <ErrorMessage name="cropType" component="div" />
          </div>

          <div>
            <label htmlFor="minprice">Min Price</label>
            <Field name="minprice" placeholder="Min Price" />
            {errors.minprice && touched.minprice ? (
              <div style={{ color: "red" }}>{errors.minprice}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="maxPrice">Max Price</label>
            <Field name="maxPrice" placeholder="Max Price" />
            {errors.maxPrice && touched.maxPrice ? (
              <div style={{ color: "red" }}>{errors.maxPrice}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <Field name="description" as="textarea" placeholder="Description" />
            {errors.description && touched.description ? (
              <div style={{ color: "red" }}>{errors.description}</div>
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
            <label htmlFor="quantity">Quantity</label>
            <Field name="quantity" placeholder="Quantity" />
            {errors.quantity && touched.quantity ? (
              <div style={{ color: "red" }}>{errors.quantity}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="pictureUrl">PictureUrl</label>
            <Field name="pictureUrl" placeholder="PictureUrl" />
            {errors.pictureUrl && touched.pictureUrl ? (
              <div style={{ color: "red" }}>{errors.pictureUrl}</div>
            ) : null}
          </div>

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default CropPostForm;
