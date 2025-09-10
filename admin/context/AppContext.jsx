import { createContext } from "react";

export const AppContext=createContext();
const AppContextProvider=(props)=>{
        const months=["","JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
const slotdateformat=(slotDate)=>{
    const dateArray=slotDate.split("_");
    return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2]
  }
  const currency="$"
    const calculateAge=(dob)=>{
        const today=new Date();
        const birthDay=new Date(dob);

        let age=today.getFullYear()-birthDay.getFullYear();
        return age;
    }
    const value={calculateAge,slotdateformat,currency}
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider