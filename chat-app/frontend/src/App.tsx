import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Welcome from "./component/welcome";
import MainLayout from "./layout/MainLayout";
import ChatsTabsLayout from "./layout/ChatTabsLayout";
import LoginForm from "./pages/loginPage";
import SignupForm from "./pages/signupPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import GuestRoute from "./routes/GuestRoute";
import { useEffect } from "react";
import { checkAuth } from "./service/UserService";

const router = createBrowserRouter([
  {
    element: <GuestRoute/>,
    children: [
      {
        path: "/",
        element: <Welcome />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/signup",
        element: <SignupForm />,
      },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <MainLayout />,
        children: [
          {
            path: "chats",
            element: <ChatsTabsLayout />,
            children: [
              {
                index: true,
                element: (
                  <div>
                    Select a chat thread to get started
                  </div>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {

  useEffect(()=>{
    checkAuth();
  },[])
  return <RouterProvider router={router} />;
}

export default App;