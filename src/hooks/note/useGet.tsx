import React, {  useState } from "react";
import supabase from "../../supa/supabase";
import { Note, Error } from "../../types/type";

function useGet(): [
  (userId: string) => void,
  Array<Note> | any,
  boolean,
  Error
] {
  const [loading, setloading] = useState<boolean>(false);
  const [noteList, setnoteList] = useState<Note[] | null>([]);
  const [error, seterror] = useState<Error>({
    message: "",
    status: false,
  });

  return [
    async (userId: string) => {
      setloading(true);
      const { data, error } = await supabase
        .from("note")
        .select("id, title, content, userId")
        .match({
          userId: userId,
        }).order("created_at",{
          ascending:false
        })

      if (error) {
        seterror({
          status: true,
          message: error.message,
        });
        return;
      }
      setnoteList(data);
      setloading(false);
    },
    noteList,
    loading,
    error,
  ];
}

export default useGet;
