export const createBuyerPostYup = Yup.object().shape({
    cropName: Yup.string().required(),
    contractType: Yup.string().required(),
    landArea: Yup.string().required(),
    description: Yup.string().required(),
    address: Yup.string().required(),
    imageUrl: Yup.string().required()
})
export const editBuyerLandPostYup = Yup.object().shape({
    cropName: Yup.string().required(),
    contractType: Yup.string().required(),
    landArea: Yup.string().required(),
    description: Yup.string().required(),
    address: Yup.string().required(),
    imageUrl: Yup.string().required()
})