import React, { useState } from "react";
import supabase from "../../supa/supabase";
import { Note, Error } from "../../types/type";

function useDelete(): [(id: string) => void, Error] {
  const [error, seterror] = useState<Error>({
    message: "",
    status: false,
  });

  return [
    async (id: string) => {
      const { data, error } = await supabase
        .from("note")
        .delete()
        .match({ id: id });
      if (error) {
        seterror({
          status: true,
          message: error.message,
        });
      }
    },
    error,
  ];
}

export default useDelete;
