import React, { useState } from "react";
import supabase from "../../supa/supabase";
import { Note, Error } from "../../types/type";

function useCreate(): [
  (title: string, content: string, userId: string) => void,
  Error
] {
  
  const [error, seterror] = useState<Error>({
    message: "",
    status: false,
  });

  return [
    async (title: string, content: string, userId: string) => {
      await supabase.from("note").insert({
        title: title,
        content: content,
        userId: userId,
      });

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

export default useCreate;
