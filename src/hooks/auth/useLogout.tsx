import React from "react";
import useStore from "../../store/zs";
import supabase from "../../supa/supabase";

function useLogout(): [()=>void] {
  const setLogout = useStore((state) => state.logout);

  
  return [
    async () => {
        await supabase.auth.signOut();
        setLogout();
    }
  ];
}

export default useLogout;
