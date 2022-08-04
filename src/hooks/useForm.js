import {useState} from "react";

export const useForm = (initialForm = {}) => {

  const [formState, setFormState] = useState(initialForm);

  const onInputChange = ({target}) => {
    const {name, value} = target;

    if (name === "urlImg") {
      // const url = target.files[0].name;
      // console.log(target.files[0]);
      const url = target.files[0];
      if(!!url) {
        setFormState({
          ...formState,
          [name] : url,
        });
      } else {
        setFormState({
          ...formState,
          [name] : "",
        });
      }
      return;
    }

    setFormState({
      ...formState,
      [name] : value,
    });
  }

  const onResetForm = () => {
    setFormState(initialForm);
  }
  
  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
  }

}
