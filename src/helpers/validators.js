
// import {helpers} from "@vuelidate/validators"

export const supportedFileType = (value) =>{
    if(!value) {return true}
    const allowedFormats = ["jpg", "png", "jpeg", "svg"]
    const extention = value.split(".").pop()
    return allowedFormats.includes(extention)
}