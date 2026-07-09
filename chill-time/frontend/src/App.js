import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
// import Home from "./pages/Home";
import LoginPage from "./page/loginPage";
import SignUpPage from "./page/signupPage";
import DashBoard from "./components/DashBoard";
import MovieDetail from "./page/movieDetail";
import TvDetail from "./page/tvDetail";
import Search from "./components/search";
import Movie from "./page/movie";
import Series from "./page/series";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useEffect } from "react";
import { checkAuth,isLoading } from "./hooks/useAuth";
import useAuth from "./hooks/useAuth";
import RedirectAuthenticatedUser from "./redirectAuthenticatetion";
import {QueryClient,QueryClientProvider} from "@tanstack/react-query";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Wrap pages in a common layout
    children: [
      {
        index: true,
        element: <DashBoard />,
      },
      {
        path: "login",
        element: ( 
          <RedirectAuthenticatedUser>
            <LoginPage/>
          </RedirectAuthenticatedUser>
        ),
      },
      {
        path:"signup",
        element:(
          <RedirectAuthenticatedUser>
            <SignUpPage/> 
          </RedirectAuthenticatedUser>
        ),
      },
      {
        path: "movie/:movieId",
        element: <MovieDetail/>,
      },
      {
        path: "tv/:movieId",
        element: <TvDetail/> 
      },
      {
        path:"/search",
        element:<Search/>
      },
      {
        path:"/movies",
        element:<Movie/>
      },
      {
        path:"/series",
        element:<Series/>
      }
    ],
  },
]); 
const queryClient = new QueryClient();

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

  return (
        <div>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
            </QueryClientProvider>
            <Analytics/>
            <SpeedInsights/>
        </div>
      );
}

export default App;
