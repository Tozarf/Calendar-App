import React from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'

export const AppRouter = () => {
    return (
        <Router>
            <Routes>
            <Route exact path='/login' element ={<LoginScreen/>}/>
            <Route exact path='/' element ={<CalendarScreen/>}/>
            <Route path='*' element ={<Navigate replace to ='/'/>}/>
            </Routes>
        </Router>
    )
}
