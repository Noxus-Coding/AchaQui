import { AuthenticatedHeader } from "../components/AuthenticatedHeader";
import { WelcomeSection } from "../sections/WelcomeSection";
import { QuickActionsSection } from "../sections/QuickActionsSection";
import { QuickSearchSection } from "../sections/QuickSearchSection";
import { ProfessionalAreaSection } from "../sections/ProfessionalAreaSection";

export function DashboardPage() {
  return (
    <div className="min-h-screen bg-white">
      <AuthenticatedHeader />
      <WelcomeSection />
      <QuickActionsSection />
      <QuickSearchSection />
      <ProfessionalAreaSection />
    </div>
  );
}