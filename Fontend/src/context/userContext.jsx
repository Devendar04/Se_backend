import React,{useState} from 'react'
import { createContext } from 'react'

export const UserDataContext = createContext()
const userContext = ({children}) => {
    const [user, setUser] = useState({
        email:'',
        fullanme : {
            firstname:'',
            lastname:''
        },
        role:''
    })
  return (
    <div>
        <UserDataContext.Provider value={{user,setUser}}>
      {children}
        </UserDataContext.Provider>
    </div>
  )
}

export default userContext
