import React, { Component } from 'react';
import Students from './Components/ManageStudent/ManageClass';
import Exams from './Components/ManageExam/ManageExam';
import DataStudentsFromManageStudent from './Components/ManageStudent/Tables/DataStudents';
import DataStudentsFromManageExam from './Components/ManageExam/Tables/DataStudents';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import DataSubjectClass from './Components/ManageExam/Tables/DataSubjectClass';

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
        component: DataStudentsFromManageStudent,
        role: 1
    },
    {
        path: '/exams/subject/manage/:semesterID/:subjectID',
        exact: true,
        component: DataSubjectClass,
        role: 1
    },
    {
        path: '/exams/subject/manage/:semesterID/:subjectID/:subjectClassID',
        exact: true,
        component: DataStudentsFromManageExam,
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