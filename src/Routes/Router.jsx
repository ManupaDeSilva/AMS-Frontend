import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loadable from "@/components/ui/loadable/Loadable";

// Lazy-loaded pages
const Login = Loadable(React.lazy(() => import("../pages/Login")));
const Home = Loadable(React.lazy(() => import("../pages/Home/home")));
const NotFound = Loadable(React.lazy(() => import("../pages/NotFound")));
const FullLayout = Loadable(React.lazy(() => import("../components/ui/layouts/FullLayout")));
const Spinner = Loadable(React.lazy(() => import("../components/ui/spinner/Spinner")));
const Report = Loadable(React.lazy(() => import("../pages/Home/Report")));

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<Home />} />

        {/* FullLayout Wrapper for Nested Routes */}
        {/* <Route path="/" element={<FullLayout />}>
          <Route path="home" element={<Home />} /> 
          <Route path="spinner" element={<Spinner />} />
          <Route path="report" element={<Report/>} />
        </Route> */}

        {/* Catch-All Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
