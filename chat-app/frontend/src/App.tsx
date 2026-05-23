import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Welcome from "./component/welcome";
import MainLayout from "./layout/MainLayout";
import ChatsTabsLayout from "./layout/ChatTabsLayout";
import LoginForm from "./pages/loginPage";
import SignupForm from "./pages/signupPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import GuestRoute from "./routes/GuestRoute";
import { useEffect } from "react";
import useAuth from "./hooks/useAuth";
import ChatArea from "./component/chatArea";

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
              element: <div className="p-6 text-zinc-400 text-center">Select a conversation to start chatting</div>
            },
            {
              path: ":id",
              element: <ChatArea />
            },
            ]
          },
        ],
      },
    ],
  },
]);

function App() {
  const {checkauth,isLoading}=useAuth();

  useEffect(()=>{
    checkauth();
  },[])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950 text-white font-mono">
        Checking session...
      </div>
    );
  }
  return <RouterProvider router={router} />;
}

export default App;