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

export const postYup = Yup.object().shape({
    cropName : Yup.string().required(),
    cropType : Yup.string().required(),
    minprice : Yup.string().required(),
    maxPrice : Yup.string().required(),
    quantity : Yup.string().required(),
    description : Yup.string().required(),
    address : Yup.string().required(),
})