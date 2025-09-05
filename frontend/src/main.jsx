import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, Route, RouterProvider } from 'react-router'
import { createRoutesFromElements } from 'react-router'
import { Provider } from 'react-redux'
import store from './store/store.js'
import {Login, ProtectedRoute, Signup} from "./components/index.js"
import DashBoard from './pages/DashBoard.jsx'
import Note from './pages/Note.jsx'
import NoteFrom from './components/Notes-Form.jsx'
import AddNote from './pages/AddNote.jsx'
import EditNote from './pages/EditNote.jsx'
import Home from './pages/Home.jsx'
import ShareNote from './pages/ShareNote.jsx'


const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
       {/* Index route for home page */}
       <Route index element={<Home />} />

       <Route path='login' element= {
            <ProtectedRoute authentication={false}> 
                <Login />
            </ProtectedRoute>
        } />

        <Route path='signup' element= {
            <ProtectedRoute authentication={false}> 
                <Signup />
            </ProtectedRoute>
        } />

        <Route path='dashboard' element= {
            <ProtectedRoute authentication={true} > 
                <DashBoard />
            </ProtectedRoute>
        } />

         <Route path='notes/:slug' element= {
            <ProtectedRoute authentication={true} > 
                <Note />
            </ProtectedRoute>
        } />

        <Route path='edit-note/:slug' element= {
            <ProtectedRoute authentication={true} > 
                <EditNote />
            </ProtectedRoute>
        } />

         <Route path='addNote' element= {
            <ProtectedRoute authentication={true} > 
                <AddNote />
            </ProtectedRoute>
        } />

         <Route path='allNotes' element= {
            <ProtectedRoute authentication={true} > 
                <Home />
            </ProtectedRoute>
        } />

        <Route path='share/:sharetoken' element= {
            <ProtectedRoute authentication={false} > 
                <ShareNote />
            </ProtectedRoute>
        } />




        
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
       <RouterProvider router={route} />
    </Provider>
  </StrictMode>,
)
