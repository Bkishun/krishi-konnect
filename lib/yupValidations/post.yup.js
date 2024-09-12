import * as Yup from 'yup'


export const editPostYup = Yup.object().shape({
    cropName : Yup.string().required(),
    cropType : Yup.string().required(),
    minprice : Yup.string().required(),
    maxPrice : Yup.string().required(),
    quantity : Yup.string().required(),
    description : Yup.string().required(),
    address : Yup.string().required(),
    pictureUrl: Yup.string().required()
})

export const createPostYup = Yup.object().shape({
    cropName : Yup.string().required(),
    cropType : Yup.string().required(),
    minprice : Yup.string().required(),
    maxPrice : Yup.string().required(),
    quantity : Yup.string().required(),
    description : Yup.string().required(),
    address : Yup.string().required(),
    pictureUrl: Yup.string().required()
})