import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Vans/Home";
import About from "./Pages/Vans/About";
import Vans from "./Pages/Vans/Vans";
import VanDetail from "./Pages/Vans/vanDetail";
import Layout from "./components/Layout";

import HostLayout from "./components/HostLayout";
import Dashboard from "./Pages/Host/Dashboard";
import Income from "./Pages/Host/Income";
import Reviews from "./Pages/Host/Reviews";
import HostVans from "./Pages/Host/HostVans";
// import VansDetailLayout from "./components/VansDetailLayout";
import HostInfo from "./Pages/Host/HostInfo";
import HostPhotos from "./Pages/Host/HostPhotos";
import HostPricing from "./Pages/Host/HostPricing";
import "./server";
import HostVansDetail from "./Pages/Host/HostVansDetail";

import NotFound from "./Pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="vans" element={<Vans />} />
          <Route path="vans/:id" element={<VanDetail />} />

          <Route path="host" element={<HostLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="income" element={<Income />} />
            <Route path="vans" element={<HostVans />} />

            <Route path="vans/:id" element={<HostVansDetail />}>
              <Route index element={<HostInfo />} />
              <Route path="pricing" element={<HostPricing />} />
              <Route path="photos" element={<HostPhotos />} />
            </Route>
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
