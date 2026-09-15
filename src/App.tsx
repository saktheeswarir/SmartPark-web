import React, { useState, useEffect, useCallback } from 'react';
import { PageId, ParkingSlot } from './types';
import { INITIAL_PARKING_SLOTS } from './data/mockParkingData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SlotDetailModal } from './components/SlotDetailModal';
import { LandingPage } from './pages/LandingPage';
import { LiveParkingPage } from './pages/LiveParkingPage';
import { AiDetectionPage } from './pages/AiDetectionPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AboutProjectPage } from './pages/AboutProjectPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('landing');
  const [slots, setSlots] = useState<ParkingSlot[]>(INITIAL_PARKING_SLOTS);
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('Just now');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Compute availability
  const totalSlots = slots.length;
  const availableCount = slots.filter((s) => s.status === 'AVAILABLE').length;

  // Handle navigation
  const handleNavigate = useCallback((page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Open slot details
  const handleSelectSlot = useCallback((slot: ParkingSlot) => {
    // Look up the freshest slot state from our state array
    const current = slots.find((s) => s.id === slot.id) || slot;
    setSelectedSlot(current);
    setIsModalOpen(true);
  }, [slots]);

  // Toggle a slot's status
  const handleToggleSlotStatus = useCallback((slotId: string) => {
    setSlots((prev) =>
      prev.map((slot) => {
        if (slot.id === slotId) {
          const nextStatus = slot.status === 'AVAILABLE' ? 'OCCUPIED' : 'AVAILABLE';
          const updated: ParkingSlot = {
            ...slot,
            status: nextStatus,
            confidenceScore: nextStatus === 'OCCUPIED' ? 0.96 : 0.98,
            occupiedSince: nextStatus === 'OCCUPIED' ? 'Just now' : undefined,
          };
          // Also update selectedSlot if the modal is open for this slot
          if (selectedSlot?.id === slotId) {
            setSelectedSlot(updated);
          }
          return updated;
        }
        return slot;
      })
    );

    // Show temporary feedback toast
    setToastMessage(`Slot ${slotId} status toggled.`);
    setTimeout(() => setToastMessage(null), 3000);
  }, [selectedSlot]);

  // Add slot from Admin
  const handleAddSlot = useCallback((newSlotData: Partial<ParkingSlot>) => {
    const newSlot: ParkingSlot = {
      id: newSlotData.id || `C${slots.length + 1}`,
      zone: newSlotData.zone || 'Zone A',
      row: newSlotData.row || 3,
      col: newSlotData.col || (slots.length % 6) + 1,
      status: newSlotData.status || 'AVAILABLE',
      type: newSlotData.type || 'STUDENT',
      confidenceScore: 0.97,
      distanceMeters: 75,
      walkingTimeMinutes: 2,
    };

    setSlots((prev) => [...prev, newSlot]);
    setToastMessage(`Slot ${newSlot.id} added successfully.`);
    setTimeout(() => setToastMessage(null), 3000);
  }, [slots.length]);

  // Refresh slots simulation
  const handleRefreshSlots = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Pick 1 random slot to toggle to demonstrate dynamic YOLO detection
      setSlots((prev) => {
        const randomIndex = Math.floor(Math.random() * prev.length);
        return prev.map((slot, index) => {
          if (index === randomIndex) {
            const nextStatus = slot.status === 'AVAILABLE' ? 'OCCUPIED' : 'AVAILABLE';
            return {
              ...slot,
              status: nextStatus,
              confidenceScore: Number((0.92 + Math.random() * 0.07).toFixed(2)),
              occupiedSince: nextStatus === 'OCCUPIED' ? 'Just now' : undefined,
            };
          }
          return slot;
        });
      });

      const now = new Date();
      setLastUpdated(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
      setIsRefreshing(false);
      setToastMessage('Live inference feed refreshed.');
      setTimeout(() => setToastMessage(null), 2500);
    }, 650);
  }, []);

  // Periodic heartbeat simulation (every 45s, update time)
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setLastUpdated(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    }, 45000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Dynamic Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-2xl border border-slate-700 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        availableCount={availableCount}
        totalCount={totalSlots}
      />

      {/* Primary Page Route Rendering */}
      <main className="flex-1">
        {currentPage === 'landing' && (
          <LandingPage
            slots={slots}
            onNavigate={handleNavigate}
            onSelectSlot={handleSelectSlot}
          />
        )}

        {currentPage === 'live' && (
          <LiveParkingPage
            slots={slots}
            onSelectSlot={handleSelectSlot}
            onRefreshSlots={handleRefreshSlots}
            isRefreshing={isRefreshing}
            lastUpdated={lastUpdated}
          />
        )}

        {currentPage === 'detection' && (
          <AiDetectionPage />
        )}

        {currentPage === 'how-it-works' && (
          <HowItWorksPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'admin' && (
          <AdminDashboardPage
            slots={slots}
            onToggleSlotStatus={handleToggleSlotStatus}
            onAddSlot={handleAddSlot}
          />
        )}

        {currentPage === 'about' && (
          <AboutProjectPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Bottom Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Slot Details Modal */}
      <SlotDetailModal
        slot={selectedSlot}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onToggleStatus={handleToggleSlotStatus}
      />
    </div>
  );
}
