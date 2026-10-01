import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Home from "./pages/Home.jsx";

const PropertyDetails = lazy(
  () => import("./pages/PropertyDetails.jsx")
);

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0]">
      <p className="text-sm font-semibold text-stone-500">
        Loading...
      </p>
    </div>
  );
}

function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5F0] px-6 text-center">
      <h1 className="text-5xl font-black text-stone-900">
        404
      </h1>

      <p className="mt-3 text-stone-500">
        Page not found.
      </p>

      <a
        href="/"
        className="mt-6 bg-stone-900 text-white rounded-full px-6 py-3 text-xs font-bold uppercase tracking-widest"
      >
        Back Home
      </a>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/pg/:slug"
            element={<PropertyDetails />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
