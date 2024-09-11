import * as Yup from 'yup'


export const editPostYup = Yup.object().shape({
    cropName : Yup.string(),
    cropType : Yup.string(),
    minprice : Yup.string(),
    maxPrice : Yup.string(),
    quantity : Yup.string(),
    description : Yup.string(),
    address : Yup.string(),
})