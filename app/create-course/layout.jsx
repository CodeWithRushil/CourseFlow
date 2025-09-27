"use client"
import React, { useState } from 'react'
import { UserInputContext } from '../_context/UserInputContext';

const layout = ({children}) => {
    const [userCourseInput, setUserCourseInput]=useState([]);
  return (
    <UserInputContext.Provider value={{userCourseInput, setUserCourseInput}}>
    <>
    {children}
    </>
    </UserInputContext.Provider>
  )
}

export default layout