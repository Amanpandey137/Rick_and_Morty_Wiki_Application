import { useEffect, useState } from "react";

export default function useLocalStorage(key,inialValue){
   const [value,setValue]=useState(()=>{
        const stored=localStorage.getItem(key);
        return stored?JSON.parse(stored):inialValue;
    });
    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value));

    },[value,key]);
    return [value,setValue];
}