import * as Yup from "yup"
import dayjs from "dayjs";

const currentDate= dayjs();
export const todoValidationSchema=Yup.object({
    title:Yup.string().max(20,"Title must be at max 20 characters").trim().required("Title is required"),
    // description:Yup.string().required("Description is required.".trim().max(57,"Description must be at most 57 characters")),
    description:Yup.string().trim().required("Description is required."),
    date:Yup.date().min(currentDate,"Date cannot be past").required("Date is Required"),
})
export const emailValidationSchema=Yup.string().email("Must be a valid email").trim().lowercase();