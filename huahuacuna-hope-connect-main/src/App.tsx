import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import RegisterSponsor from "./pages/RegisterSponsor";
import Catalog from "./pages/Catalog";
import ChildDetail from "./pages/ChildDetail";
import Donations from "./pages/Donations";
import Volunteering from "./pages/Volunteering";
import Blog from "./pages/Blog";
import Projects from "./pages/Projects";
import Events from "./pages/Events";

// Admin Pages
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminApplications from "./pages/admin/AdminApplications";
import AdminChildren from "./pages/admin/AdminChildren";
import AdminSponsorships from "./pages/admin/AdminSponsorships";

// Sponsor Pages
import SponsorLayout from "./pages/sponsor/SponsorLayout";
import SponsorProfile from "./pages/sponsor/SponsorProfile";
import SponsorCatalog from "./pages/sponsor/SponsorCatalog";
import SponsorHistory from "./pages/sponsor/SponsorHistory";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes with Navbar and Footer */}
            <Route
              path="/"
              element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <div className="flex-1">
                    <Home />
                  </div>
                  <Footer />
                </div>
              }
            />
            <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />
            <Route path="/recuperar-contrasena" element={<><Navbar /><ForgotPassword /><Footer /></>} />
            <Route path="/registro-apadrinador" element={<><Navbar /><RegisterSponsor /><Footer /></>} />
            <Route path="/apadrina" element={<><Navbar /><Catalog /><Footer /></>} />
            <Route path="/apadrina/:id" element={<><Navbar /><ChildDetail /><Footer /></>} />
            <Route path="/donaciones" element={<><Navbar /><Donations /><Footer /></>} />
            <Route path="/voluntariado" element={<><Navbar /><Volunteering /><Footer /></>} />
            <Route path="/bitacora" element={<><Navbar /><Blog /><Footer /></>} />
            <Route path="/proyectos" element={<><Navbar /><Projects /><Footer /></>} />
            <Route path="/eventos" element={<><Navbar /><Events /><Footer /></>} />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="solicitudes" element={<AdminApplications />} />
              <Route path="ninos" element={<AdminChildren />} />
              <Route path="apadrinamientos" element={<AdminSponsorships />} />
            </Route>

            {/* Sponsor Routes */}
            <Route
              path="/apadrinador"
              element={
                <ProtectedRoute allowedRoles={['sponsor']}>
                  <SponsorLayout />
                </ProtectedRoute>
              }
            >
              <Route path="perfil" element={<SponsorProfile />} />
              <Route path="catalogo" element={<SponsorCatalog />} />
              <Route path="historial" element={<SponsorHistory />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<><Navbar /><NotFound /><Footer /></>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;