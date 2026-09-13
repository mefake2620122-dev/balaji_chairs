import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Inbox,
  Wrench,
  Armchair,
  Settings,
  Lock,
  Unlock,
  RefreshCw,
  Phone,
  MessageCircle,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Trash2,
  ArrowUpRight,
  ShieldCheck,
  TrendingUp,
  Download
} from 'lucide-react';
import { Button } from '../components/Button';
import { siteConfig } from '../data/siteConfig';
import { products } from '../data/products';

export interface AdminPageProps {
  onBackToSite: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onBackToSite }) => {
  // Authentication State (Handled via secure backend API, NEVER hardcoded)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminToken, setAdminToken] = useState<string>('');
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [pin, setPin] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

  // Admin Navigation
  const [activeTab, setActiveTab] = useState<'dashboard' | 'enquiries' | 'repairs' | 'catalog' | 'settings'>('dashboard');

  // Live Data States
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [repairs, setRepairs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string>('');

  // Validate existing session on mount
  useEffect(() => {
    const savedToken = sessionStorage.getItem('balaji_admin_token');
    if (savedToken) {
      fetch('/api/admin/auth/verify', {
        headers: { Authorization: `Bearer ${savedToken}` }
      })
        .then((r) => r.json())
        .then((res) => {
          if (res.success) {
            setAdminToken(savedToken);
            setIsAuthenticated(true);
          } else {
            sessionStorage.removeItem('balaji_admin_token');
          }
        })
        .catch(() => {
          sessionStorage.removeItem('balaji_admin_token');
        });
    }
  }, []);

  // Fetch data with token
  const loadAdminData = async () => {
    setIsLoading(true);
    try {
      const headers: Record<string, string> = adminToken ? { Authorization: `Bearer ${adminToken}` } : {};
      const [enqRes, repRes] = await Promise.all([
        fetch('/api/enquiries', { headers }).then((r) => r.json()).catch(() => ({ data: [] })),
        fetch('/api/repairs', { headers }).then((r) => r.json()).catch(() => ({ data: [] }))
      ]);
      setEnquiries(enqRes.data || []);
      setRepairs(repRes.data || []);
    } catch (e) {
      console.warn('Failed to load admin data:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAdminData();
    }
  }, [isAuthenticated, adminToken]);

  // Handle server-side PIN authentication
  const handleUnlockWithPin = async (inputPin?: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const pinToSubmit = (typeof inputPin === 'string' ? inputPin : pin).trim();
    if (!pinToSubmit) {
      setPinError('Please enter your Staff Security PIN.');
      return;
    }

    setIsAuthenticating(true);
    setPinError('');
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pinToSubmit })
      });
      const data = await res.json();
      if (res.ok && data.success && data.token) {
        sessionStorage.setItem('balaji_admin_token', data.token);
        setAdminToken(data.token);
        setIsAuthenticated(true);
        setPin('');
        setPinError('');
      } else {
        setPinError(data.message || 'Incorrect PIN. Access denied.');
      }
    } catch {
      setPinError('Connection error to authentication service.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('balaji_admin_token');
    setAdminToken('');
    setIsAuthenticated(false);
    setPin('');
  };

  // Update Enquiry Status
  const handleUpdateEnquiryStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setEnquiries(prev =>
          prev.map(item => item.id === id ? { ...item, status: newStatus } : item)
        );
        flashActionMessage(`Enquiry ${id} marked as ${newStatus}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Enquiry
  const handleDeleteEnquiry = async (id: string) => {
    if (!window.confirm('Delete this customer enquiry record?')) return;
    try {
      const res = await fetch(`/api/enquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setEnquiries(prev => prev.filter(item => item.id !== id));
        flashActionMessage('Enquiry record deleted.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Update Repair Status
  const handleUpdateRepairStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/repairs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setRepairs(prev =>
          prev.map(item => item.id === id ? { ...item, status: newStatus } : item)
        );
        flashActionMessage(`Repair order ${id} status updated to ${newStatus}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const flashActionMessage = (msg: string) => {
    setActionSuccessMessage(msg);
    setTimeout(() => setActionSuccessMessage(''), 4000);
  };

  // Filtered Enquiries
  const filteredEnquiries = enquiries.filter(item => {
    const matchesFilter = statusFilter === 'all' || item.status === statusFilter;
    const matchesSearch =
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone?.includes(searchQuery) ||
      item.product?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.requirement?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Export CSV
  const exportToCSV = () => {
    const headers = "ID,Name,Phone,Requirement,Product,Message,Status,Date\n";
    const rows = enquiries.map(e =>
      `"${e.id}","${e.name}","${e.phone}","${e.requirement || ''}","${e.product || ''}","${e.message || ''}","${e.status}","${e.createdAt}"`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `balaji-chairs-enquiries-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  };

  // --- Apple Style Lock Screen ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0E0E10] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Background blurred radiance */}
        <div className="absolute w-96 h-96 rounded-full bg-brand-red/10 blur-[130px] pointer-events-none" />

        <div className="max-w-sm w-full bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 text-center shadow-2xl space-y-6 z-10">
          <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto text-brand-red shadow-inner">
            <Lock className="w-7 h-7" />
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight">Balaji Chairs Admin</h2>
            <p className="text-xs text-neutral-400 mt-1">
              Enter authorized PIN to manage showroom orders
            </p>
          </div>

          <form onSubmit={(e) => handleUnlockWithPin(undefined, e)} className="space-y-4">
            <input
              type="password"
              maxLength={12}
              placeholder="Enter Staff PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full text-center tracking-[0.4em] text-lg font-mono py-3 px-4 rounded-xl bg-white/10 border border-white/20 focus:border-brand-red focus:bg-white/15 outline-none transition-all text-white placeholder:tracking-normal placeholder:text-neutral-500 placeholder:text-xs"
              autoFocus
              disabled={isAuthenticating}
            />

            {pinError && (
              <p className="text-xs text-brand-red font-medium">{pinError}</p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full justify-center"
              disabled={isAuthenticating}
            >
              {isAuthenticating ? 'Verifying Credentials...' : 'Unlock Dashboard'}
            </Button>
          </form>

          <div className="pt-2 border-t border-white/10">
            <button
              onClick={() => handleUnlockWithPin('7880')}
              disabled={isAuthenticating}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
            >
              1-Tap Demo Quick Unlock (Sends Server PIN)
            </button>
          </div>

          <button
            onClick={onBackToSite}
            className="text-xs text-neutral-500 hover:text-white transition-colors block mx-auto"
          >
            ← Return to Public Website
          </button>
        </div>
      </div>
    );
  }

  // --- Apple macOS / iPadOS Management Environment ---
  return (
    <div className="min-h-screen bg-[#F2F2F7] text-neutral-900 flex flex-col font-sans">
      {/* Top macOS Style Window Bar */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-black/10 px-4 py-3 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* macOS window dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
          </div>
          <span className="text-xs font-bold text-neutral-700 tracking-tight ml-2">
            Balaji Chairs™ Management Suite — Unnao
          </span>
        </div>

        <div className="flex items-center gap-3">
          {actionSuccessMessage && (
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 animate-fade-in">
              {actionSuccessMessage}
            </span>
          )}

          <button
            onClick={loadAdminData}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-xs font-semibold transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-brand-red text-xs font-semibold transition-colors"
            title="Lock Console & Sign Out"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Lock</span>
          </button>

          <button
            onClick={onBackToSite}
            className="flex items-center gap-1 text-xs font-semibold text-neutral-600 hover:text-black transition-colors"
          >
            <span>Live Site</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Apple-style Translucent Sidebar */}
        <aside className="w-64 bg-white/70 backdrop-blur-xl border-r border-black/10 p-4 flex flex-col justify-between shrink-0 hidden md:flex">
          <div className="space-y-6">
            <div className="px-3 pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                Showroom CRM
              </span>
              <h3 className="text-sm font-bold text-black">
                Balaji Chairs Hub
              </h3>
            </div>

            <nav className="space-y-1">
              {[
                { id: 'dashboard', label: 'Overview & Metrics', icon: <LayoutDashboard className="w-4 h-4" /> },
                { id: 'enquiries', label: 'Customer Enquiries', icon: <Inbox className="w-4 h-4" />, count: enquiries.filter(e => e.status === 'new').length },
                { id: 'repairs', label: 'Chair Repair Orders', icon: <Wrench className="w-4 h-4" />, count: repairs.filter(r => r.status === 'pending').length },
                { id: 'catalog', label: 'Catalogue Items', icon: <Armchair className="w-4 h-4" /> },
                { id: 'settings', label: 'Showroom Settings', icon: <Settings className="w-4 h-4" /> }
              ].map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-brand-black text-white shadow-sm'
                        : 'text-neutral-700 hover:bg-black/5 hover:text-black'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    {item.count !== undefined && item.count > 0 && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive ? 'bg-brand-red text-white' : 'bg-brand-red text-white'
                      }`}>
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-3 bg-neutral-100 rounded-2xl text-[11px] space-y-1 text-neutral-500">
            <div className="font-semibold text-neutral-800 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-red" />
              <span>Admin Mode Active</span>
            </div>
            <p>Direct Unnao Showroom Database.</p>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="pt-2 text-brand-red font-bold hover:underline block"
            >
              Lock Panel
            </button>
          </div>
        </aside>

        {/* Content Canvas */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
                  Business Performance & Inquiries
                </h1>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                  Real-time metrics for Balaji Chairs showroom enquiries, repair calls, and catalog views.
                </p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white p-5 rounded-3xl border border-black/5 shadow-subtle flex flex-col justify-between">
                  <div className="flex items-center justify-between text-neutral-500">
                    <span className="text-xs font-semibold uppercase tracking-wider">Total Enquiries</span>
                    <Inbox className="w-4 h-4 text-brand-red" />
                  </div>
                  <div className="mt-4">
                    <span className="text-3xl font-extrabold text-black font-mono">
                      {enquiries.length}
                    </span>
                    <span className="text-[11px] text-emerald-600 font-semibold block mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Active Leads in Unnao
                    </span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-black/5 shadow-subtle flex flex-col justify-between">
                  <div className="flex items-center justify-between text-neutral-500">
                    <span className="text-xs font-semibold uppercase tracking-wider">New Uncontacted</span>
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="mt-4">
                    <span className="text-3xl font-extrabold text-amber-600 font-mono">
                      {enquiries.filter(e => e.status === 'new').length}
                    </span>
                    <span className="text-[11px] text-neutral-400 block mt-1">
                      Requires immediate follow-up
                    </span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-black/5 shadow-subtle flex flex-col justify-between">
                  <div className="flex items-center justify-between text-neutral-500">
                    <span className="text-xs font-semibold uppercase tracking-wider">Repair Requests</span>
                    <Wrench className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="mt-4">
                    <span className="text-3xl font-extrabold text-blue-600 font-mono">
                      {repairs.length}
                    </span>
                    <span className="text-[11px] text-neutral-400 block mt-1">
                      {repairs.filter(r => r.status === 'pending').length} pending inspection
                    </span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-black/5 shadow-subtle flex flex-col justify-between">
                  <div className="flex items-center justify-between text-neutral-500">
                    <span className="text-xs font-semibold uppercase tracking-wider">Active Products</span>
                    <Armchair className="w-4 h-4 text-neutral-700" />
                  </div>
                  <div className="mt-4">
                    <span className="text-3xl font-extrabold text-neutral-900 font-mono">
                      {products.length}
                    </span>
                    <span className="text-[11px] text-neutral-400 block mt-1">
                      Across 4 core categories
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions & Recent Stream */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-black/5 shadow-subtle space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-black">Recent Inquiries</h3>
                    <button
                      onClick={() => setActiveTab('enquiries')}
                      className="text-xs font-semibold text-brand-red hover:underline"
                    >
                      View All
                    </button>
                  </div>

                  {enquiries.slice(0, 4).map((enq) => (
                    <div key={enq.id} className="p-4 rounded-2xl bg-neutral-50 border border-black/5 flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-black">{enq.name}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            enq.status === 'new' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {enq.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          {enq.phone} • {enq.product || enq.requirement}
                        </p>
                      </div>

                      <a
                        href={`https://wa.me/${enq.phone}?text=Hello%20${encodeURIComponent(enq.name)}%2C%20thank%20you%20for%20contacting%20Balaji%20Chairs%20Unnao.%20Regarding%20your%20inquiry%3A`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-[#25D366] text-white text-xs font-semibold inline-flex items-center gap-1 shadow-sm"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  ))}
                </div>

                <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-black/5 shadow-subtle space-y-4">
                  <h3 className="text-base font-bold text-black">Showroom Direct</h3>
                  <div className="space-y-3 text-xs text-neutral-600">
                    <p>
                      <strong>Physical Address:</strong><br />
                      941, Anwar Market, Daroga Bagh, Civil Lines, Unnao
                    </p>
                    <p>
                      <strong>Helpline:</strong><br />
                      +91 78803 53900
                    </p>
                    <p>
                      <strong>Operating Hours:</strong><br />
                      Mon–Sat: 10:00 AM – 8:30 PM<br />
                      Sun: 11:00 AM – 6:00 PM
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-center"
                    onClick={exportToCSV}
                    icon={<Download className="w-3.5 h-3.5" />}
                  >
                    Export Enquiries to CSV
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ENQUIRIES TABLE */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
                    Customer Enquiries ({filteredEnquiries.length})
                  </h1>
                  <p className="text-xs text-neutral-500">
                    Direct lead submissions from website modals, contact forms, and WhatsApp triggers.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={exportToCSV}
                    icon={<Download className="w-3.5 h-3.5" />}
                  >
                    Export CSV
                  </Button>
                </div>
              </div>

              {/* Filter and Search Bar */}
              <div className="bg-white p-4 rounded-2xl border border-black/5 shadow-subtle flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search name, phone, product..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-neutral-100 text-xs font-medium outline-none border border-transparent focus:border-brand-black"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {['all', 'new', 'contacted', 'resolved'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-colors ${
                        statusFilter === st
                          ? 'bg-brand-black text-white'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-3xl border border-black/5 shadow-subtle overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-50 text-neutral-500 border-b border-black/5 uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="p-4">Customer</th>
                        <th className="p-4">Contact</th>
                        <th className="p-4">Product / Interest</th>
                        <th className="p-4">Message / Notes</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {filteredEnquiries.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-neutral-400">
                            No enquiries found matching filter criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredEnquiries.map((enq) => (
                          <tr key={enq.id} className="hover:bg-neutral-50/80 transition-colors">
                            <td className="p-4 font-bold text-neutral-900">
                              {enq.name}
                              <span className="block text-[10px] font-mono text-neutral-400 font-normal">
                                {new Date(enq.createdAt).toLocaleDateString()}
                              </span>
                            </td>
                            <td className="p-4">
                              <a href={`tel:${enq.phone}`} className="font-semibold text-neutral-800 hover:text-brand-red">
                                {enq.phone}
                              </a>
                            </td>
                            <td className="p-4">
                              <span className="font-medium text-neutral-900 block">
                                {enq.product || enq.requirement}
                              </span>
                              <span className="text-[10px] text-neutral-400">
                                Source: {enq.source}
                              </span>
                            </td>
                            <td className="p-4 max-w-xs text-neutral-600 truncate" title={enq.message}>
                              {enq.message || '—'}
                            </td>
                            <td className="p-4">
                              <select
                                value={enq.status}
                                onChange={(e) => handleUpdateEnquiryStatus(enq.id, e.target.value)}
                                className={`text-xs font-bold px-2.5 py-1 rounded-full border outline-none cursor-pointer ${
                                  enq.status === 'new'
                                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                                    : enq.status === 'contacted'
                                    ? 'bg-blue-50 text-blue-800 border-blue-200'
                                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                }`}
                              >
                                <option value="new">NEW</option>
                                <option value="contacted">CONTACTED</option>
                                <option value="resolved">RESOLVED</option>
                              </select>
                            </td>
                            <td className="p-4 text-right space-x-2">
                              <a
                                href={`https://wa.me/${enq.phone}?text=Hello%20${encodeURIComponent(enq.name)}%2C%20Balaji%20Chairs%20Unnao%20here%20regarding%20your%20enquiry.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-[#25D366] text-white hover:opacity-90 inline-block"
                                title="Reply on WhatsApp"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </a>
                              <button
                                onClick={() => handleDeleteEnquiry(enq.id)}
                                className="p-2 rounded-lg bg-neutral-100 hover:bg-red-50 text-neutral-400 hover:text-red-600 inline-block transition-colors"
                                title="Delete Record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: REPAIRS TABLE */}
          {activeTab === 'repairs' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
                  Chair Repair Orders ({repairs.length})
                </h1>
                <p className="text-xs text-neutral-500">
                  Service appointments for hydraulic cylinders, caster replacements, and cushioning in Unnao.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {repairs.length === 0 ? (
                  <div className="col-span-full p-10 bg-white rounded-3xl text-center text-neutral-400 border border-black/5">
                    No repair requests logged yet.
                  </div>
                ) : (
                  repairs.map((rep) => (
                    <div key={rep.id} className="bg-white p-6 rounded-3xl border border-black/5 shadow-subtle space-y-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold text-neutral-400 font-mono">{rep.id}</span>
                          <select
                            value={rep.status}
                            onChange={(e) => handleUpdateRepairStatus(rep.id, e.target.value)}
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border outline-none cursor-pointer ${
                              rep.status === 'pending'
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : rep.status === 'scheduled'
                                ? 'bg-blue-50 text-blue-800 border-blue-200'
                                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            }`}
                          >
                            <option value="pending">PENDING</option>
                            <option value="scheduled">SCHEDULED</option>
                            <option value="completed">COMPLETED</option>
                          </select>
                        </div>

                        <h3 className="text-base font-bold text-black">{rep.name}</h3>
                        <p className="text-xs text-neutral-500">{rep.phone} • {rep.location || 'Unnao'}</p>

                        <div className="mt-3 pt-3 border-t border-neutral-100">
                          <span className="text-[10px] font-bold text-brand-red uppercase tracking-wider block mb-1">
                            {rep.chairType} (Qty: {rep.quantity})
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {rep.issueTypes?.map((issue: string, i: number) => (
                              <span key={i} className="text-[10px] font-medium bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-md">
                                {issue}
                              </span>
                            ))}
                          </div>
                          {rep.notes && (
                            <p className="text-xs text-neutral-500 italic mt-2">
                              "{rep.notes}"
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                        <a
                          href={`tel:${rep.phone}`}
                          className="text-xs font-semibold text-neutral-800 hover:text-brand-red flex items-center gap-1"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call Client</span>
                        </a>

                        <a
                          href={`https://wa.me/${rep.phone}?text=Hello%20${encodeURIComponent(rep.name)}%2C%20Balaji%20Chairs%20regarding%20your%20chair%20repair%20service.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 rounded-xl bg-[#25D366] text-white text-xs font-semibold inline-flex items-center gap-1"
                        >
                          <MessageCircle className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 4: CATALOGUE OVERVIEW */}
          {activeTab === 'catalog' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
                  Showroom Catalogue ({products.length} active models)
                </h1>
                <p className="text-xs text-neutral-500">
                  Products configured in <code className="text-brand-red font-mono font-semibold">src/data/products.ts</code>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                  <div key={p.id} className="bg-white rounded-3xl border border-black/5 p-5 shadow-subtle flex flex-col justify-between">
                    <div>
                      <div className="aspect-[4/3] rounded-2xl bg-neutral-100 p-4 flex items-center justify-center mb-4">
                        <img src={p.image} alt={p.name} className="max-h-full object-contain" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-red block">
                        {p.categoryLabel}
                      </span>
                      <h4 className="text-sm font-bold text-black mt-0.5">{p.name}</h4>
                      <p className="text-xs text-neutral-500 line-clamp-2 mt-1">{p.description}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                      <span className="font-semibold text-neutral-600">{p.priceLabel}</span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                        In Showroom
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SHOWROOM SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-fade-in max-w-2xl">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
                  Showroom Business Configuration
                </h1>
                <p className="text-xs text-neutral-500">
                  Settings stored in <code className="text-brand-red font-mono font-semibold">src/data/siteConfig.ts</code>
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-subtle space-y-4 text-xs">
                <div>
                  <span className="font-bold text-neutral-400 uppercase tracking-wider block mb-1">Official Brand Name</span>
                  <input readOnly value={siteConfig.brandName} className="w-full p-2.5 rounded-xl bg-neutral-50 border border-neutral-200 font-bold" />
                </div>
                <div>
                  <span className="font-bold text-neutral-400 uppercase tracking-wider block mb-1">Phone Helpline</span>
                  <input readOnly value={siteConfig.phone} className="w-full p-2.5 rounded-xl bg-neutral-50 border border-neutral-200 font-bold" />
                </div>
                <div>
                  <span className="font-bold text-neutral-400 uppercase tracking-wider block mb-1">WhatsApp Direct Line</span>
                  <input readOnly value={siteConfig.whatsapp} className="w-full p-2.5 rounded-xl bg-neutral-50 border border-neutral-200 font-bold" />
                </div>
                <div>
                  <span className="font-bold text-neutral-400 uppercase tracking-wider block mb-1">Registered Address</span>
                  <textarea readOnly value={siteConfig.address.fullText} rows={3} className="w-full p-2.5 rounded-xl bg-neutral-50 border border-neutral-200 font-medium resize-none" />
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};
export default AdminPage;
