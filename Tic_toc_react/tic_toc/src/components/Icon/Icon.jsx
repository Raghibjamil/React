import { FaPen, FaRegCircle, FaTimes } from 'react-icons/fa';

function Icon({name}){

    // inside this component conditional returing happening.....
   if(name == "circle"){
    return <FaRegCircle/>
   } else if(name == "cross"){
    return <FaTimes/>
   }else{
    return <FaPen/>
   }

}

export default Icon;