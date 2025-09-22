import { useState } from "react";
import Dashboard from "@/components/Dashboard";
import EthicsForm from "@/components/forms/EthicsForm";
import VisitForm from "@/components/forms/VisitForm";
import TravelForm from "@/components/forms/TravelForm";
import PurchaseForm from "@/components/forms/PurchaseForm";

type View = 'dashboard' | 'ethics' | 'visit' | 'travel' | 'purchase' | 'requests';

const Index = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const handleCreateRequest = (type: string) => {
    setCurrentView(type as View);
  };

  const handleViewRequests = (type?: string) => {
    setCurrentView('requests');
  };

  const handleBack = () => {
    setCurrentView('dashboard');
  };

  const renderView = () => {
    switch (currentView) {
      case 'ethics':
        return <EthicsForm onBack={handleBack} />;
      case 'visit':
        return <VisitForm onBack={handleBack} />;
      case 'travel':
        return <TravelForm onBack={handleBack} />;
      case 'purchase':
        return <PurchaseForm onBack={handleBack} />;
      case 'dashboard':
      default:
        return (
          <Dashboard 
            onCreateRequest={handleCreateRequest}
            onViewRequests={handleViewRequests}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="container mx-auto px-4 py-8">
        {renderView()}
      </div>
    </div>
  );
};

export default Index;