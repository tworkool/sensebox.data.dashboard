import { lazy, Suspense } from "react";
/* import { PageSpinner2 } from '@components/shared/spinners/spinners'; */
import Footer from "@components/static/footer/footer";
import Header from "@components/static/header/header";
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import Spinner from "@components/shared/spinner/spinner";

// lazy load pages
const Home = lazy(() => import("@pages/home/home"));
const Impressum = lazy(() => import("@pages/impressum/impressum"));
const Datenschutz = lazy(() => import("@pages/datenschutz/datenschutz"));
const Info = lazy(() => import("@pages/info/info"));

// DASHBOARD
const Dashboard = lazy(() => import("@pages/dashboard/dashboard"));
const DashboardOverview = lazy(() => import("@pages/dashboard/overview/overview"));
const DashboardSettings = lazy(() => import("@pages/dashboard/settings/settings"));

const SharedLayout = () => {
  return <>
    <Header />
    <main className='page-container'>
      <div className="page-content">
        <Outlet />
      </div>
    </main>
    <Footer />
  </>;
};

const DashboardLayout = () => {
  return <main style={{ height: "100%" }}>
    <Outlet />
  </main>;
};

const router = createBrowserRouter([
  {
    path: "",
    element: <SharedLayout />,
    children: [
      {
        path: "",
        element: <Suspense fallback={<Spinner.Round size={"3rem"} />}><Home /></Suspense>,
      },
      {
        path: "impressum",
        element: <Suspense fallback={<Spinner.Round size={"3rem"} />}><Impressum /></Suspense>,
      },
      {
        path: "datenschutz",
        element: <Suspense fallback={<Spinner.Round size={"3rem"} />}><Datenschutz /></Suspense>,
      },
      {
        path: "info",
        element: <Suspense fallback={<Spinner.Round size={"3rem"} />}><Info /></Suspense>,
      }
    ]
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Suspense fallback={<Spinner.Round size={"3rem"} />}><Dashboard /></Suspense>,
        children: [
          {
            path: "overview/:boxId?",
            element: <Suspense fallback={<Spinner.Round size={"2rem"} />}><DashboardOverview /></Suspense>,
          },
          {
            path: "settings",
            element: <Suspense fallback={<Spinner.Round size={"2rem"} />}><DashboardSettings /></Suspense>,
          },
          {
            path: "",
            element: <Navigate to="overview" />
          }
        ]
      }
    ]
  },
  {
    path: "*",
    element: <div>404</div>
  }
]);

const PageRouter = () => {
  return <RouterProvider router={router} />;
};

export default PageRouter;
