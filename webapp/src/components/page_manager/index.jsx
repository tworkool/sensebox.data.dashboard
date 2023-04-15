import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DatenschutzPage from "../../pages/datenschutz";
import DashboardPage, { DashboardContextProvider } from "../../pages/dashboard";
import HomePage from "../../pages/home";
import { CubeSpinner } from "../spinners";
import InfoPage from "../../pages/info";
import ImpressumPage from "../../pages/impressum";

const PageManager = (_props) => {
  return (
    <>
      <Routes>
        <Route
          path="/info"
          element={
            <Suspense fallback={<CubeSpinner />}>
              <InfoPage />
            </Suspense>
          }
        />
        <Route
          path="/impressum"
          element={
            <Suspense fallback={<CubeSpinner />}>
              <ImpressumPage />
            </Suspense>
          }
        />
        <Route
          path="/datenschutz"
          element={
            <Suspense fallback={<CubeSpinner />}>
              <DatenschutzPage />
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
