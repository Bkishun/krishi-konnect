import * as Yup from "yup";

export const registerUserYup = Yup.object().shape({
  name: Yup.string().required(),
  password: Yup.string(),
  adhaarNumber: Yup.string().required(),
  address: Yup.string().required(),
  userType: Yup.string().required()
});

export const editUserYup = Yup.object().shape({
  name: Yup.string().required(),
  password: Yup.string().required(),
  address: Yup.string().required(),
  userType: Yup.string().required()
});

