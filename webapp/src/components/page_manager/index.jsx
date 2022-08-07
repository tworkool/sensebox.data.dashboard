import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DatenschutzPage from "../../pages/datenschutz";
import HomePage from "../../pages/home";
import { CubeSpinner } from "../spinners";

const PageManager = () => {
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
          path="/"
          element={
            <Suspense fallback={<CubeSpinner />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={<Navigate to="/" replace/>}
        />
      </Routes>
    </>
  );
};

export default PageManager;
