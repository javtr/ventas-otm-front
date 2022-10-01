import React from 'react';
import { useForm } from "react-hook-form";


export default function FormTest() {
  const { register, watch } = useForm();
  // const myValue = watch("fruits", "default");
  const [myVal, setMyVal] = React.useState('Default')

  const fruits = register("fruits");


  return (
    <div className="App">
      <h1>{myVal}</h1>
      <select
        onChange={(e) => {
          fruits.onChange(e);
          setMyVal(e.target.value); // react hook form onChange
          console.log("Here would go the my onChange"); // my onChange
        }}
        onBlur={fruits.onBlur}
        ref={fruits.ref}
      >
        <option value="1Banana">Banana</option>
        <option value="1Kiwi">Kiwi</option>
        <option value="1Mango">Mango</option>
      </select>
    </div>
  );
}