import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { MobileMenu } from './components/MobileMenu';
import { Footer } from './components/Footer';
import { FloatingActionBar } from './components/FloatingActionBar';
import { EnquiryModal } from './components/EnquiryModal';
import { Toast } from './components/Toast';
import { PageTransition } from './components/PageTransition';
import { SEO } from './components/SEO';
import { LoadingScreen } from './components/LoadingScreen';

// Pages
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { RepairPage } from './pages/RepairPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { AdminPage } from './pages/AdminPage';

export function App() {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedProductForEnquiry, setSelectedProductForEnquiry] = useState<string>('');
  const [selectedRequirementForEnquiry, setSelectedRequirementForEnquiry] = useState<string>('Office Furniture Inquiry');
  const [toast, setToast] = useState<{ show: boolean; message: string; type?: 'success' | 'error' }>({
    show: false,
    message: ''
  });
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);

  // Initial luxury Apple preloader effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 750);
    return () => clearTimeout(timer);
  }, []);

  // Handle URL changes & browser history
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    // Initial sync
    setCurrentPath(window.location.pathname || '/');
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path.split('?')[0]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEnquiry = (productName?: string, requirement?: string) => {
    setSelectedProductForEnquiry(productName || '');
    setSelectedRequirementForEnquiry(requirement || 'Office Furniture Inquiry');
    setEnquiryModalOpen(true);
  };

  const triggerToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 5000);
  };

  const cleanPath = currentPath.split('?')[0];

  // Dynamic Route SEO Metadata
  const getRouteSEO = (path: string) => {
    switch (path) {
      case '/products':
        return {
          title: 'Ergonomic Office Chairs & Revolving Seating Collection',
          description: 'Browse executive high-back chairs, breathable mesh task seating, hydraulic stools, and visitor chairs with 1-year warranty and express delivery in Unnao.',
          schemaType: 'product' as const
        };
      case '/solutions':
        return {
          title: 'Turnkey Workspace & Commercial Furniture Solutions',
          description: 'Corporate workstation chairs, conference suites, doctor clinic chairs, and educational bulk seating solutions engineered by Balaji Chairs Unnao.',
          schemaType: 'service' as const
        };
      case '/repair':
        return {
          title: 'Same-Day Office Chair Repair & Gas-Lift Overhaul Services',
          description: 'Quick genuine chair repair in Unnao: class-4 hydraulic gas lift cylinders, silent nylon castors, heavy-duty tilt mechanisms, and foam re-upholstery.',
          schemaType: 'service' as const
        };
      case '/about':
        return {
          title: 'Showroom Heritage & Ergonomic Craftsmanship',
          description: 'Discover Balaji Chairs (Innovative Creations) in Unnao — trusted since 2012 by top professionals, clinics, and businesses for handcrafted ergonomic furniture.',
          schemaType: 'website' as const
        };
      case '/contact':
        return {
          title: 'Visit Showroom, Test Sit & Commercial Inquiries',
          description: '941 Anwar Market, Daroga Bagh, Civil Lines, Unnao – 209801. Call +91 78803 53900 or connect on WhatsApp for instant quotes and personalized chair consultations.',
          schemaType: 'contact' as const
        };
      case '/privacy':
        return {
          title: 'Privacy Policy',
          description: 'Data security guidelines and inquiry confidentiality commitments at Balaji Chairs Unnao.'
        };
      case '/terms':
        return {
          title: 'Commercial Terms of Supply & Warranty',
          description: 'Comprehensive warranty guidelines, fast regional delivery policies, and institutional procurement terms for Balaji Chairs.'
        };
      case '/admin':
        return {
          title: 'Staff & Management Console',
          description: 'Balaji Chairs macOS-inspired administration console for enquiry triage, repair tracking, and catalog overview.'
        };
      default:
        return {
          title: 'Balaji Chairs™ | Innovative Creations — Office Chairs & Furniture in Unnao',
          description: 'Unnao’s premier office chair showroom and manufacturer. High-back executive chairs, mesh workstations, revolving stools, and prompt repair services. 941 Anwar Market, Civil Lines.',
          schemaType: 'website' as const
        };
    }
  };

  // Dedicated Admin Screen (Full Screen Apple macOS Console)
  if (cleanPath === '/admin') {
    return (
      <div className="min-h-screen bg-[#F5F5F7] text-brand-black">
        <SEO
          {...getRouteSEO(cleanPath)}
          canonicalPath={cleanPath}
        />
        <Toast
          show={toast.show}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(prev => ({ ...prev, show: false }))}
        />
        <PageTransition routeKey="/admin">
          <AdminPage onBackToSite={() => navigateTo('/')} />
        </PageTransition>
      </div>
    );
  }

  // Render appropriate public page view
  const renderCurrentPage = () => {
    switch (cleanPath) {
      case '/':
        return (
          <HomePage
            onNavigate={navigateTo}
            onOpenEnquiry={handleOpenEnquiry}
          />
        );
      case '/products':
        return (
          <ProductsPage
            onOpenEnquiry={(product) => handleOpenEnquiry(product)}
          />
        );
      case '/solutions':
        return (
          <SolutionsPage
            onOpenEnquiry={(req) => handleOpenEnquiry(undefined, req)}
            onNavigate={navigateTo}
          />
        );
      case '/repair':
        return (
          <RepairPage
            onSuccess={(msg) => triggerToast(msg, 'success')}
          />
        );
      case '/projects':
        return (
          <HomePage
            onNavigate={navigateTo}
            onOpenEnquiry={handleOpenEnquiry}
          />
        );
      case '/about':
        return (
          <AboutPage
            onOpenEnquiry={() => handleOpenEnquiry(undefined, "Showroom Consultation")}
            onNavigate={navigateTo}
          />
        );
      case '/contact':
        return (
          <ContactPage
            onSuccess={(msg) => triggerToast(msg, 'success')}
          />
        );
      case '/privacy':
        return <PrivacyPage />;
      case '/terms':
        return <TermsPage />;
      default:
        return (
          <HomePage
            onNavigate={navigateTo}
            onOpenEnquiry={handleOpenEnquiry}
          />
        );
    }
  };

  const routeSEO = getRouteSEO(cleanPath);

  return (
    <div className="flex flex-col min-h-screen bg-brand-offwhite text-brand-black">
      {/* Apple Luxury Preloader */}
      <LoadingScreen isLoading={isInitialLoading} />

      {/* Route SEO Meta Ingestion */}
      <SEO
        title={routeSEO.title}
        description={routeSEO.description}
        canonicalPath={cleanPath}
        schemaType={routeSEO.schemaType}
      />

      {/* Toast Notification */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(prev => ({ ...prev, show: false }))}
      />

      {/* Global Navigation Bar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onOpenEnquiryModal={() => handleOpenEnquiry()}
      />

      {/* Mobile Drawer Sheet */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        currentPath={currentPath}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={navigateTo}
        onOpenEnquiry={() => handleOpenEnquiry()}
      />

      {/* Page Content with Apple Spring Route Transition */}
      <main className="flex-grow">
        <PageTransition routeKey={cleanPath}>
          {renderCurrentPage()}
        </PageTransition>
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenEnquiry={() => handleOpenEnquiry()}
      />

      {/* Mobile Sticky Floating Action Bar */}
      <FloatingActionBar
        onOpenEnquiry={() => handleOpenEnquiry()}
      />

      {/* Global Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        defaultProduct={selectedProductForEnquiry}
        defaultRequirement={selectedRequirementForEnquiry}
        onSuccess={(msg) => triggerToast(msg, 'success')}
      />
    </div>
  );
}

export default App;
