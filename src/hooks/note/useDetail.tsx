import React, { useState } from "react";
import supabase from "../../supa/supabase";
import { Error, Note } from "../../types/type";

function useDetail():[(id:string)=>void, Note|any, boolean,Error ] {
  const [data, setdata] = useState<Note | any>();
  const [loading, setloading] = useState<boolean>(false);
  const [error, seterror] = useState<Error>({
    status: false,
    message: "",
  });

  return [
    async (id: string) => {
      setloading(true);
      const { data, error: errorDetail } = await supabase
        .from("note")
        .select("id, title, content, userId")
        .match({
          id: id,
        })
        .single();

      if (errorDetail) {
        seterror({
          status: true,
          message: errorDetail.message,
        });
      } else {
        setdata(data);
      }
      setloading(false);
    },
    data,
    loading,
    error
  ];
}

export default useDetail;
