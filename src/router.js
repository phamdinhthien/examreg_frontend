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
        component: Login,
        role: 0
    },
    {
        path: '/students',
        exact: true,
        component: Students,
        role: 1
    },
    {
        path: '/exams',
        exact: true,
        component: Exams,
        role: 1
    },
    {
        path: '/students/manage/:courseID/:classID',
        exact: false,
        component: DataStudents,
        role: 1
    },
    {
        path: '/exams/subject/manage/:semesterID',
        exact: true,
        component: DataStudents,
        role: 1
    },
    {
        path: '/home',
        exact: false,
        component: Home,
        role: 0
    }
]

export default routes;