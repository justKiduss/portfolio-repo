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
  return <RouterProvider router={router} />;
}

export default App;
