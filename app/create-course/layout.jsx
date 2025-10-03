"use client"
import React, { useState } from 'react'
import { UserInputContext } from '../_context/UserInputContext';
import Footer from '@/components/Footer';

const layout = ({children}) => {
    const [userCourseInput, setUserCourseInput]=useState([]);
  return (
    <UserInputContext.Provider value={{userCourseInput, setUserCourseInput}}>
    <>
    {children}
    <Footer/>
    </>
    </UserInputContext.Provider>
  )
}

export default layout