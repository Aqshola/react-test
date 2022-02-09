import React, { useState } from "react";
import useStore from "../../store/zs";
import supabase from "../../supa/supabase";
import { Error } from "../../types/type";

function useLogin(): [
  (email: string, password: string) => void,
  any,
  boolean,
  Error
] {

  const setlogin=useStore(state=>state.login)
  const [error, seterror] = useState<Error>({
    message: "",
    status: false,
  });
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState<any>(null);

  return [
    async (email: string, password: string) => {
      setloading(true);
      const { user, error: errorSignIn } = await supabase.auth.signIn({
        email: email,
        password: password,
      });

      if (errorSignIn) {
        seterror({
          status: true,
          message: errorSignIn?.message,
        });
        
      } else {
        setlogin(user);
        setdata(user);
      }

      setloading(false);
    },
    data,
    loading,
    error,
  ];
}

export default useLogin;
