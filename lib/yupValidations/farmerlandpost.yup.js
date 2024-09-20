export const createFarmerPostYup = Yup.object().shape({
    contractType: Yup.string().required(),
    landArea: Yup.string().required(),
    description: Yup.string().required(),
    address: Yup.string().required(),
    imageUrl: Yup.string().required()
})
export const editFarmerLandPostYup = Yup.object().shape({
    contractType: Yup.string().required(),
    landArea: Yup.string().required(),
    description: Yup.string().required(),
    address: Yup.string().required(),
    imageUrl: Yup.string().required()
})