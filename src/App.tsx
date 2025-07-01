import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import CookieConsent from './components/CookieConsent';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Solutions = lazy(() => import('./pages/Solutions'));
const GastronomyHospitality = lazy(() => import('./pages/solutions/GastronomyHospitality'));
const IndustrialManufacturing = lazy(() => import('./pages/solutions/IndustrialManufacturing'));
const FinanceSecurity = lazy(() => import('./pages/solutions/FinanceSecurity'));
const SmartLiving = lazy(() => import('./pages/solutions/SmartLiving'));
const Healthcare = lazy(() => import('./pages/solutions/Healthcare'));
const Retail = lazy(() => import('./pages/solutions/Retail'));
const EAMethod = lazy(() => import('./pages/EAMethod'));
const WhyEA = lazy(() => import('./pages/WhyEA'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Router>
          <Layout>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/solutions" element={<Solutions />} />
                <Route path="/solutions/gastronomy-hospitality" element={<GastronomyHospitality />} />
                <Route path="/solutions/industrial-manufacturing" element={<IndustrialManufacturing />} />
                <Route path="/solutions/finance-security" element={<FinanceSecurity />} />
                <Route path="/solutions/smart-living" element={<SmartLiving />} />
                <Route path="/solutions/healthcare" element={<Healthcare />} />
                <Route path="/solutions/retail" element={<Retail />} />
                <Route path="/ea-method" element={<EAMethod />} />
                <Route path="/why-ea" element={<WhyEA />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Suspense>
          </Layout>
          <CookieConsent />
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;