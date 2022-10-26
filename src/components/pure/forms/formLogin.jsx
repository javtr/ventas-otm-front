import React from "react";
import { useForm } from "react-hook-form";

export default function FormLogin() {
  const { register, control, handleSubmit, watch } = useForm();

  function submit(data) {
    console.log(data);
  }

  return (
    <div style={{display:"flex",justifyContent:"center"}}>
      <form onSubmit={handleSubmit(submit)}>
        <input
          {...register("email")}
          placeholder="Email"
          type="text"
        />

        <input
          {...register("password")}
          placeholder="Password"
          type="text"
        />

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}
