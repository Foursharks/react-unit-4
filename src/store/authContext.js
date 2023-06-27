import { useState, useEffect, useCallback, createContext } from 'react'

//About context: Context is primarily used when some data needs to be accessible by many components at different nesting levels. Apply it sparingly because it makes component reuse more difficult.

let logoutTimer;
//provide authentication to components
const AuthContext = createContext({
  token: '',
  //set login and logout methods to...nothing? 
  login: () => {},
  logout: () => {},
  userId: null
})

const calculateRemainingTime = (exp) => {
  const currentTime = new Date().getTime()
  const expTime = exp 
  const remainingTime = expTime - currentTime
  return remainingTime
}

const getLocalData = () => {
  const storedToken = localStorage.getItem('token')
  const storedExp = localStorage.getItem('exp')
  const storedId = localStorage.getItem('userId')
  const remainingTime = calculateRemainingTime(storedExp)

  if (remainingTime <= 1000 * 60 * 30) {
    localStorage.removeItem('token')
    localStorage.removeItem('exp')
    localStorage.removeItem('userId')
    return null
  }


  return {
    token: storedToken,
    duration: remainingTime,
    userId: storedId
  }
}



export const AuthContextProvider = (props) => {
  const localData = getLocalData()
  
  let initialToken
  let initialId
  if (localData) {
    initialToken = localData.token
    initialId = localData.userId
  }

  const [token, setToken] = useState(initialToken)
  const [userId, setUserId] = useState(initialId)


  const logout = () => {
    setToken(null)
    setUserId(null)
    console.log(token, userId)
    localStorage.clear(); 
  
    if (logoutTimer !== 0) {
      clearTimeout(logoutTimer);
    } else {
      // do nothing
    }
    
  }

  const login = (token, exp, userId) => {
    setToken(token)
    setUserId(userId)
    localStorage.setItem('token', token)
    localStorage.setItem('exp', exp)
      
    //we already initialized remainingTime elsewhere
    const remainingTime = calculateRemainingTime(exp)
      
    logoutTimer = setTimeout(logout, remainingTime)
    }

  const contextValue = {
    token,
    login,
    logout, 
    userId
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
