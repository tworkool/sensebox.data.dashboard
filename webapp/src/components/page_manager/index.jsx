import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DatenschutzPage from "../../pages/datenschutz";
import DashboardPage, { DashboardContextProvider } from "../../pages/dashboard";
import HomePage from "../../pages/home";
import { CubeSpinner } from "../spinners";

const PageManager = (_props) => {
  return (
    <>
      <Routes>
        <Route
          path="/datenschutz"
          element={
            <Suspense fallback={<CubeSpinner />}>
              <DatenschutzPage />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/:boxid"
          element={
            <Suspense fallback={<CubeSpinner />}>
              <DashboardContextProvider>
                <DashboardPage />
              </DashboardContextProvider>
            </Suspense>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<CubeSpinner />}>
              <DashboardContextProvider>
                <DashboardPage />
              </DashboardContextProvider>
            </Suspense>
          }
        />
        <Route
          path="/"
          element={
            <Suspense fallback={<CubeSpinner />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default PageManager;
