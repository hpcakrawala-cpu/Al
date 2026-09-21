import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import CompanyProfile from "./pages/CompanyProfile";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import DocumentList from "./pages/admin/DocumentList";
import InvoiceCreate from "./pages/admin/InvoiceCreate";
import KwitansiCreate from "./pages/admin/KwitansiCreate";
import DocumentView from "./pages/admin/DocumentView";
import ScrollToTop from "./components/ScrollToTop";

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#060d1a]">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/tentang" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/layanan" element={<PublicLayout><Services /></PublicLayout>} />
          <Route path="/portofolio" element={<PublicLayout><Portfolio /></PublicLayout>} />
          <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
          <Route path="/kontak" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/company-profile" element={<CompanyProfile />} />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dokumen" element={<DocumentList />} />
            <Route path="invoice/baru" element={<InvoiceCreate />} />
            <Route path="kwitansi/baru" element={<KwitansiCreate />} />
            <Route path="dokumen/:id" element={<DocumentView />} />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
