import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DatenschutzPage from "../../pages/datenschutz";
import DashboardPage from "../../pages/dashboard";
import HomePage from "../../pages/home";
import { CubeSpinner } from "../spinners";

const PageManager = (props) => {
  const { routeMap = undefined } = props;
  return (
    <>
      <Routes>
        {routeMap !== undefined ? (
          routeMap.map((e, i) => (
            <Route
              key={i}
              path={e.to}
              element={
                <Suspense fallback={<CubeSpinner />}>{e.content}</Suspense>
              }
            />
          ))
        ) : (
          <>
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
                  <DashboardPage />
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
          </>
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default PageManager;
