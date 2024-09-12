import * as Yup from "yup";

export const registerUserYup = Yup.object().shape({
  name: Yup.string().required(),
  password: Yup.string().required(),
  adhaarNumber: Yup.string().required(),
  address: Yup.string().required(),
  userType: Yup.string().required(),
//   profileUrl: Yup.string()
});
