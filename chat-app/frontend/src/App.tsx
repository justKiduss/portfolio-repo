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
import GroupTabsLayout from "./layout/groupTabsLayout";
import GroupChat from "./component/groupChat";
import CreateGroup from "./component/createGroup";
import AddGroupMember from "./component/addGroupMembers";
import { Profile } from "./component/profile";

const router = createBrowserRouter([
  {
    element: <GuestRoute />,
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
        // Combined into a SINGLE children array
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
          {
            path: "group_chats", 
            element: <GroupTabsLayout />,
            children: [
              {
                index: true,
                element: <div className="p-6 text-zinc-400 text-center">Select a group conversation to start chatting</div>
              },
              {
                path: "create-group", 
                element: <CreateGroup />
              },
              {
                path: ":id",
                children: [
                  {
                    index: true, 
                    element: <GroupChat />
                  },
                  {
                    path: "add-member", 
                    element: <AddGroupMember /> 
                  }
                ]
              }
            ]
          },
          {
            path:"profile/:id",
            element:<Profile/>
          }
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