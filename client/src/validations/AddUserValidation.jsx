import * as yup from "yup";

const AddUserValidation = yup.object().shape({
  email: yup
    .string()
    .required("Câmp obligatoriu")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Adresa de email este invalidă"
    ),
  password: yup.string().required("Câmp obligatoriu"),
  nume: yup.string().required("Câmp obligatoriu"),
  prenume: yup.string().required("Câmp obligatoriu"),
  rol: yup.string().required("Câmp obligatoriu"),
});

export default AddUserValidation;
