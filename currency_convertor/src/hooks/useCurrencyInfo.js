// custom hooks can use buildin hooks like useeffect,useRef,UseState etc

import { useState,useEffect } from "react";

function useCurrencyInfo(currency){
    const [data,setData]=useState({});
    useEffect(()=>{
      fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`)
      .then((res)=> res.json())
      .then((res)=> setData(res[currency]))

      
    },[currency])
    // console.log(data);
    return data;
}
export default useCurrencyInfo;