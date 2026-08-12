import { createBrowserRouter } from 'react-router'
import RootLayout from './RootLayout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Skills from './pages/Skills'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: 'projects', Component: Projects },
      { path: 'skills', Component: Skills },
    ],
  },
])
