import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css'
import AppLayout from './layout/app-layout'
import Home from './Pages/Home'
import Categories from './Pages/categories'
import Search from './Pages/search'
import SingleGif from './Pages/single-gif'
import Favourites from './Pages/favourites'
import GifProvider from './context/context'

const router = createBrowserRouter([
  {
    element:<AppLayout/>,

    children: [
      {
        path:'/',
        element:<Home/>,
      },
      {
        path:'/:category',
        element:<Categories/>,
      },
      {
        path:'/search/:query',
        element:<Search/>,
      },
      {
        path:'/:type/:slug',
        element:<SingleGif/>,
      },
      {
        path:'/favourites',
        element:<Favourites/>,
      }
    ]
  }
])

function App(){
  return( 
    <GifProvider> 
      <RouterProvider router = {router}/>
    </GifProvider>
  )
}

export default App