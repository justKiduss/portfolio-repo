import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Welcome from "./component/welcome"
import MainLayout from "./layout/MainLayout"
import ChatsTabsLayout from "./layout/ChatTabsLayout"
const router=createBrowserRouter([
  {
    path:'/',
      element:<MainLayout/>,
      children:[
        {
          path:"chats",
          element:<ChatsTabsLayout/>,
          children:[
            {
              index:true,
              // element:<
            }
          ]
        }
      ]
  }
])
function App() {

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
