import create from "zustand";
import Login from "../pages/Login";




const useStore = create((set:any) => ({
    loading:true,
    auth:{
        isAuthenticated: false,
        user: null
    },
    login: (user:any) => {
        set((state:any) => ({
            auth: {
                isAuthenticated: true,
                user: user
            },
            loading: false
        }));
    },
    logout: () => {
        set((state:any) => ({
            auth: {
                isAuthenticated: false,
                user: null
            },
            loading: false
        }));
    }
    
    
}));


export default useStore;