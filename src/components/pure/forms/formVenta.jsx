import React,{useState} from 'react';
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function FormVenta() {

  const [filas, setFilas] = useState(1);


//platilla de errores
  const loginSchema = Yup.object().shape({
    firstName: Yup.string().required("nombre requerido"),
    lastName: Yup.string().required("nombre requerido"),
    email: Yup.string()
      .email("formato de correo invalido")
      .required("correo requerido"),
  });

  //manejo de envio de formulario
  function submitHandle(values) {
    const valuesSend = {
      nombre: values.firstName,
      apellido: values.lastName,
      correo: values.email,
    };

    console.log(valuesSend);

    fetch("http://localhost:8080/cliente/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(valuesSend),
    }).then(() => {
      console.log("cliente agregado");
    });
  }

  //crear campos con boton
  function crearFields() {
    let fieldsCont = [];

    for (let i = 1; i <= filas; i++) {

      const idIt1 = `firstName${i}`;

      fieldsCont.push(
        <div key={i}>
          <label className="formik--label" htmlFor={idIt1}>
            First Name2
          </label>
          <Field
            className="formik--field"
            id= {idIt1}
            name={idIt1}
            placeholder="Jane2"
          />
        </div>
      );
    }

    return fieldsCont;
  }

  function aumentaFilas() {
    setFilas(filas+1)
}



  return (
    <div className="layout__container--form">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
        }}
        validationSchema={loginSchema}
        onSubmit={async (values) => {
          submitHandle(values);
        }}
      >
        {({
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
        }) => (
          <Form className="formik">
            <label className="formik--label" htmlFor="firstName">
              First Name
            </label>
            <Field
              className="formik--field"
              id="firstName"
              name="firstName"
              placeholder="Jane"
            />

            {errors.firstName && touched.firstName && (
              <ErrorMessage name="firstName" component="div"></ErrorMessage>
            )}

            <label className="formik--label" htmlFor="lastName">
              Last Name
            </label>
            <Field
              className="formik--field"
              id="lastName"
              name="lastName"
              placeholder="Doe"
            />

            {errors.lastName && touched.lastName && (
              <ErrorMessage name="lastName" component="div"></ErrorMessage>
            )}

            <label className="formik--label" htmlFor="email">
              Email
            </label>
            <Field
              className="formik--field"
              id="email"
              name="email"
              placeholder="jane@acme.com"
              type="email"
            />

            {errors.email && touched.email && (
              <ErrorMessage name="email" component="div"></ErrorMessage>
            )}

            {crearFields()}
            <button type='button' onClick={aumentaFilas}>aumentar</button>


            <button className="formik--button" type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
