
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Addcategory from './component/Addcategory';
import Category from './component/Category';
import MainNavbar from './component/MainNavbar';
import RootLayout from './component/RootLayout';
import Detail from './component/Detail';
import Update from './component/Update';
import Login from './component/Login';
import Signup from './component/Signup';
import{isLogin} from '../src/util/checkAuth';
import { Navigate } from "react-router-dom";


const router =createBrowserRouter([
  {path:'/', element:<Navigate to="/signup" />},
  {path:'/signup', element:<Signup />},
  {path:'/login', element:<Login />},
  {path:'dashboard', loader:isLogin, element:<RootLayout/>,children:[
  {path:'', element:<Category />},
  {path:'category', element:<Category />},
  {path:'addcategory', element:<Addcategory />},
  {path:'detail/:id', element:<Detail />},
  {path:'edit/:id', element:<Update />},
  ]}
])
function App() {
  return (
    <>
   
    <RouterProvider router={router}></RouterProvider>
    </>
  );
}
 
export default App;
