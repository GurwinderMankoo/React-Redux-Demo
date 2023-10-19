import { createBrowserRouter } from "react-router-dom";

import Home from "./components/pages/HomePage";
import DetailedTask from "./components/task/DetailedTask";
import MainLayout from "./components/layout/MainLayout";
import React from "react";

type routeObject = {
  element: React.ReactNode;
  path: string;
};

type routesObject = {
  element: React.ReactNode;
  children: routeObject[];
  loader?: () => void;
};

const routes: routesObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "task/:id",
        element: <DetailedTask />
        // loader: teamLoader,
      },
      {
        path: "*",
        element: <div className="not-found-page">Page Not Found</div>
      }
    ]
  }
];

const router = createBrowserRouter(routes);

export default router;
