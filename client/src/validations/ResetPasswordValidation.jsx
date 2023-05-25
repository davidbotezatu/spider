import * as yup from "yup";

const ResetPasswordValidation = yup.object().shape({
  email: yup
    .string()
    .required("Câmp obligatoriu")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Adresa de email este invalidă"
    ),
});

export default ResetPasswordValidation;
