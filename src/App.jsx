import Home from './pages/Home'
import Collections from './pages/Collections'
import CardProducts from './pages/CardProducts'
import Orders from './pages/Orders'
import MyProfile from './pages/MyProfilePage'
import { BrowserRouter,Routes,Route } from 'react-router'
import { Provider } from "react-redux";
import store from "./redux/store";
import Favorite from './pages/Favourite'
import Checkout from './pages/Checkout'
import AdminPanel from "../src/pages/admin/AdminPanel";

function App(){

  return (
    <>
     <Provider store={store}> 
    <BrowserRouter>
    <Routes>
    <Route path='/' element={ <Home />}> </Route>
      <Route path='/collection' element={ <Collections/>}></Route>
      <Route path="/card" element={<CardProducts/>}></Route>
       <Route path="/orders" element={<Orders />} /> 
       <Route path='/favourite' element={<Favorite/>}></Route>
       <Route path='/myprofile' element={<MyProfile/>}></Route>
       <Route path='/checkout' element={<Checkout/>}></Route>
          {/* Admin routes */}
         
           <Route path="/admin/*" element={<AdminPanel />} />
        </Routes>
        </BrowserRouter>
     </Provider>
     
    </>
  )
}

export default App
