"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createPost } from "@/lib/actions/post.action";
import axios from "axios"; // Include axios for making requests
import imageCompression from "browser-image-compression";

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
  const [image, setImage] = useState(null); // State for selected image
  const [uploading, setUploading] = useState(false); // State for uploading status
  const [showUploadMessage, setShowUploadMessage] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleImageUpload = async (setFieldValue) => {
    if (!image) {
      alert("Please select an image first");
      return;
    }

    

    try {

      setUploading(true);

      

      const options = {
        maxSizeMB: 0.1, // Max size in MB (100KB)
        maxWidthOrHeight: 1920, // Resize the image to a maximum width or height
        useWebWorker: true,
      };

      // Compress the image
      const compressedFile = await imageCompression(image, options);
      console.log("Compressed File:", compressedFile);

      const imageData = new FormData();
      imageData.append("file", compressedFile);
      imageData.append("upload_preset", "KrishiKonnect");
      imageData.append("cloud_name", "bkishun");


      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        imageData
      );

      const imageUrl = response.data.secure_url;
      // Set the uploaded image URL in the Formik field
      setFieldValue("pictureUrl", imageUrl);
      setShowUploadMessage(true)
    } catch (error) {
      console.error("Image upload failed:", error);
      throw new Error(error)
    } finally {
      setUploading(false);
    }
  };

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
        // Submit form values
        const result = await createPost(values);
        console.log(result);
      }}
    >
      {({ errors, touched, setFieldValue }) => (
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

          {/* Picture URL with image upload logic */}
          <div>
            <label htmlFor="pictureUrl">Select Image</label>
            <input
              type="file"
              name="pictureUrl"
              onChange={handleFileChange}
            />
            <button
            className="bg-blue-600 p-2"
              type="button"
              onClick={() => handleImageUpload(setFieldValue)}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Image"}
            </button>
            {showUploadMessage && "Image successfully uploaded."}
            <ErrorMessage className="text-red-600" name="pictureUrl" component="div" />
          </div>

          <button className="bg-green-500 p-2" type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default CropPostForm;
