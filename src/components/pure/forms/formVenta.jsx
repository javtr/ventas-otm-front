import React from "react";
import { Form, Formik, Field } from "formik";

export default function FormVenta() {
  return (
    <div className="layout__container--form">
      <Formik 
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form className="formik">
          <label className="formik--label"
          htmlFor="firstName">First Name</label>
          <Field className="formik--field"
          id="firstName" name="firstName" placeholder="Jane" />

          <label className="formik--label"
          htmlFor="lastName">Last Name</label>
          <Field className="formik--field"
          id="lastName" name="lastName" placeholder="Doe" />

          <label className="formik--label"
          htmlFor="email">Email</label>
          <Field className="formik--field"
            id="email"
            name="email"
            placeholder="jane@acme.com"
            type="email"
          />
          <button className="formik--button"
          type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}
