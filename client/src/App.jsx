
import {Route, Routes} from 'react-router-dom';
import { HomePage,
         LoginPage, 
         RegisterPage, 
         ProfilePage, 
         PlacesPage, 
         CreatePlacePage, 
         PlacePage, 
         BookingsPage, 
         BookingPage } from './pages';
import { Layout } from './components';
import axios from 'axios';
import { UserContextProvider } from './UserContext';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;
function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path="/account" element={<ProfilePage/>}/>
      <Route path='/account/places' element={<PlacesPage/>}/>
      <Route path='/account/places/new' element={<CreatePlacePage/>}/>
      <Route path='/account/places/:id' element={<CreatePlacePage/>}/>
      <Route path='/place/:id' element={<PlacePage/>}/>
      <Route path='/account/bookings' element={<BookingsPage/>}/>
      <Route path='/account/bookings/:id' element={<BookingPage/>}/>
      </Route>
      
    </Routes>
    </UserContextProvider>
  )
}

export default App;
