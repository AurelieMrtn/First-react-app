import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// import './App.css';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import ToDoList from './pages/ToDoList';
import NasaImage from './pages/NasaImage';

const ProtectedRoute = ({children}: { children: JSX.Element }) => {
  // TODO Use selector in order to retrieve isAuth
  // use component/class with emotion instead of 'css='
  // Use store instead of protectedRoute ??
  const isAuthenticated = localStorage.getItem('isAuthenticated'); 
    return isAuthenticated ? children : <Navigate to='/login' replace/>
};

function App() {
  return (
    <BrowserRouter >
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/home' element={
              <ProtectedRoute>
                <HomePage/>
              </ProtectedRoute>
            }
          />
          <Route path='/todo' element={
              <ProtectedRoute>
                <ToDoList/>
              </ProtectedRoute>
            }
          />
          <Route path='/nasa-image' element={
              <ProtectedRoute>
                <NasaImage/>
              </ProtectedRoute>
            }
          />
        <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App

