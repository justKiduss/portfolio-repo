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
        element: <LoginPage/>,
      },
      {
        path:"signup",
        element:<SignUpPage/> 
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

function App() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // Save it exactly like your normal login does
      localStorage.setItem("token", token);
      
      // Clean the URL so the token doesn't stay visible
      window.history.replaceState({}, document.title, "/");
      
      // Optional: Refresh to ensure AuthContext picks up the new token
      window.location.reload();
    }
  }, []);
  return (
        <div>
          <RouterProvider router={router} />
          <Analytics/>
          <SpeedInsights/>
        </div>
      );
}

export default App;
