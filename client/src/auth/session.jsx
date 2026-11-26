import {createContext,useContext,useState} from 'react';
const Session = createContext(null);
export function SessionProvider({children}) {
 const [session,setSession] = useState(()=>{try{return JSON.parse(sessionStorage.getItem('portfolio-session'))}catch{return null}});
 function save(value){if(value)sessionStorage.setItem('portfolio-session',JSON.stringify(value));else sessionStorage.removeItem('portfolio-session');setSession(value)}
 return <Session.Provider value={{session,save}}>{children}</Session.Provider>;
}
export const useSession=()=>useContext(Session);
export async function request(path,method='GET',body,token){
 const response=await fetch(path,{method,headers:{...(body?{'Content-Type':'application/json'}:{}),...(token?{Authorization:`Bearer ${token}`}:{})},...(body?{body:JSON.stringify(body)}:{})});
 const data=await response.json(); if(!response.ok)throw new Error(data.error||`HTTP ${response.status}`);return data;
}
