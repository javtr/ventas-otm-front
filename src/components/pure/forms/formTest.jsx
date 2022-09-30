import { useForm, useFieldArray } from "react-hook-form";

export default function FormTest() {

  const { register, control, handleSubmit } = useForm();
  const { fields, remove, append } = useFieldArray({
    control,
    name: "students",
  });


  const subs = [
    { name: "Math", price: 20 },
    { name: "English", price: 70 },
  ];


  const registerSubmit = (data) => {
    console.log(data);
  };

  
  return (
    <div className="App">
      <form onSubmit={handleSubmit(registerSubmit)}>
        <input
          {...register("parents_name")}
          placeholder="parents_name"
          type="text"
        />
        <br />
        <input
          {...register("phone_number")}
          placeholder="phone_number"
          type="text"
        />
        <br />
        <input {...register("city")} placeholder="city" type="text" />
        <br />
        <input {...register("address")} placeholder="address" type="text" />
        <br />
        <input {...register("email")} placeholder="email" type="email" />
        <br />
        
        
        {fields.map(({ id, subjects, name, age, grade, user_img }, index) => (
          <div key={id}>
            <input
              {...register(`students[${index}].name`)}
              placeholder="name"
              defaultValue={name}
              type="text"
            />
            <br />
            <input
              {...register(`students[${index}].age`)}
              placeholder="age"
              defaultValue={age}
              type="number"
            />
            <br />
            <input
              {...register(`students[${index}].grade`)}
              placeholder="grade"
              defaultValue={grade}
              type="text"
            />
            <br />
            <span>subject</span>
            <br />
            {subs.map((sub, i) => (
              <div key={i}>
                <input
                  type="checkbox"
                  {...register(`students[${index}].subjects`)}
                />
                {sub.name}
              </div>
            ))}
            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        ))}



        <button type="button" onClick={() => append({})}>
          Add Student
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
