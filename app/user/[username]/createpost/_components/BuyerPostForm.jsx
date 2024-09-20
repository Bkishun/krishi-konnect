"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios"; // Include axios for making requests
import imageCompression from "browser-image-compression";
import { createBuyerLandPost } from "@/lib/actions/buyerlandpost.action";

const postSchema = Yup.object().shape({
  cropName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  contractType: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  landArea: Yup.string().required("Required"),
  description: Yup.string().min(2, "Too Short!").required("Required"),
  address: Yup.string().min(2, "Too Short!").required("Required"),
  imageUrl: Yup.string().required("Required"),
});

const BuyerPostForm = () => {
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
      imageData.append("upload_preset", "KrishiKonnect-buyerpost");
      imageData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        imageData
      );

      const imageUrl = response.data.secure_url;
      // Set the uploaded image URL in the Formik field
      setFieldValue("imageUrl", imageUrl);
      setShowUploadMessage(true);
    } catch (error) {
      console.error("Image upload failed:", error);
      throw new Error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        cropName: "",
        contractType: "",
        landArea: "",
        description: "",
        address: "",
        imageUrl: "",
      }}
      validationSchema={postSchema}
      onSubmit={async (values) => {
        console.log(values)
        const result = await createBuyerLandPost(values);
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
            <label htmlFor="contractType">Contract Type</label>
            <Field as="select" name="contractType">
              <option value="" label="Select a Contract type" />
              <option value="market-specification" label="Market Specification" />
              <option value="resource-providing" label="Resource-Providing" />
              <option value="production management" label="Production Management" />
              <option value="total contracts" label="Total Contracts" />
            </Field>
            <ErrorMessage name="contractType" component="div" />
          </div>
          <div>
            <label htmlFor="landArea">Land area</label>
            <Field name="landArea" placeholder="" />
            {errors.landArea && touched.landArea ? (
              <div style={{ color: "red" }}>{errors.landArea}</div>
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

          {/* Picture URL with image upload logic */}
          <div>
            <label htmlFor="imageUrl">Select Image</label>
            <input type="file" name="imageUrl" onChange={handleFileChange} />
            <button
              className="bg-blue-600 p-2"
              type="button"
              onClick={() => handleImageUpload(setFieldValue)}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Image"}
            </button>
            {showUploadMessage && "Image successfully uploaded."}
            <ErrorMessage
              className="text-red-600"
              name="pictureUrl"
              component="div"
            />
          </div>

          <button className="bg-green-500 p-2" type="submit">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default BuyerPostForm;
