import React, { useState } from "react";

function useForm<T>(initialState: T): [ (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,T] {
  const [form, setform] = useState<T | any>(initialState);
  const formChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (typeof form === "object") {
      setform({ ...form, [e.target.name]: e.target.value });
    } else {
      setform(e.target.value);
    }
    return
  };

  return [formChange, form];
}

export default useForm;
