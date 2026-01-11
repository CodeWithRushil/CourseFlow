"use client"
import React, { useState } from 'react'
import { UserInputContext } from '@/app/_context/UserInputContext';
import Footer from '@/components/Footer';
import { Toaster } from "react-hot-toast";


const layout = ({children}) => {
    const [userCourseInput, setUserCourseInput]=useState([]);
  return (
    <UserInputContext.Provider value={{userCourseInput, setUserCourseInput}}>
    <>
    {children}
    <Toaster position="bottom-center" />
    <Footer/>
    </>
    </UserInputContext.Provider>
  )
}

export default layout