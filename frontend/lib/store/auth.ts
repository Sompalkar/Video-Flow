
import {create} from 'zustand'


type User = {
    id:string,
    name:string,
    email:string
}


interface AuthState{
    user : User | null,
    loading:boolean, 
    setUser: (user:User | null)=>void,
    setLoading: (value: boolean) => void;
    logout:()=>void,
}


export const useAuthStore = create<AuthState>((set)=>({
    user:null,
    loading:false,
    setUser:(user:User | null | undefined)=>set({user}),
    setLoading:(value:boolean)=>set({loading:value}),
    logout:()=>set({user:null}),
   
}))

