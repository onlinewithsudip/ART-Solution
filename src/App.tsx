import React from 'react';
import { SiteProvider, useSite } from './context/SiteContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ToastContainer } from './components/ToastContainer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

const AppContent: React.FC = () => {
  const { page } = useSite();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <ToastContainer />
      <Navbar />

      <main className="flex-1">
        {page === 'home' && <HomePage />}
        {page === 'about' && <AboutPage />}
        {page === 'products' && <ProductsPage />}
        {page === 'product-details' && <ProductDetailPage />}
        {page === 'gallery' && <GalleryPage />}
        {page === 'contact' && <ContactPage />}
        {page === 'admin' && <AdminPage />}
      </main>

      <Footer />
      {page !== 'admin' && <WhatsAppButton />}
    </div>
  );
};

export default function App() {
  return (
    <SiteProvider>
      <AppContent />
    </SiteProvider>
  );
}
