import React, { Component } from 'react';
import Students from './Components/ManageStudent/ManageClass';
import Exams from './Components/ManageExam/ManageExam';
import DataStudents from './Components/ManageStudent/Tables/DataStudents';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';

const routes = [
    {
        path: '/login',
        exact: false,
        component: Login
    },
    {
        path: '/students',
        exact: true,
        component: Students
    },
    {
        path: '/exams',
        exact: true,
        component: Exams
    },
    {
        path: '/students/manage/:courseID/:classID',
        exact: false,
        component: DataStudents
    },
    {
        path: '/exams/subject/manage/:semesterID',
        exact: true,
        component: DataStudents
    },
    {
        path: '/home',
        exact: false,
        component: Home
    }
]

export default routes;