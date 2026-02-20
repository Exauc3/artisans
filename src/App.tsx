import { useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { DemoDataInitializer } from "./components/DemoDataInitializer";
import { ClientHomeScreen } from "./components/ClientHomeScreen";
import { SearchFilterScreen } from "./components/SearchFilterScreen";
import { ArtisanListScreen } from "./components/ArtisanListScreen";
import { ArtisanProfileScreen } from "./components/ArtisanProfileScreen";
import { ContactScreen } from "./components/ContactScreen";
import { ArtisanLoginScreen } from "./components/ArtisanLoginScreen";
import { ArtisanDashboard } from "./components/ArtisanDashboard";
import { ProfileManagementScreen } from "./components/ProfileManagementScreen";
import { AvailabilityScreen } from "./components/AvailabilityScreen";
import { ClientRequestsScreen } from "./components/ClientRequestsScreen";
import { Artisan } from "./types";

export type Screen =
  | "client-home"
  | "search-filter"
  | "artisan-list"
  | "artisan-profile"
  | "contact"
  | "artisan-login"
  | "artisan-dashboard"
  | "profile-management"
  | "availability"
  | "client-requests";

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("client-home");
  const [selectedArtisan, setSelectedArtisan] =
    useState<Artisan | null>(null);
  const [searchCategory, setSearchCategory] =
    useState<string>("");
  const [filters, setFilters] = useState({
    maxDistance: "",
    priceRange: "",
    minRating: 0,
    availability: "",
  });

  const navigateToArtisanProfile = (artisan: Artisan) => {
    setSelectedArtisan(artisan);
    setCurrentScreen("artisan-profile");
  };

  const navigateToContact = (artisan: Artisan) => {
    setSelectedArtisan(artisan);
    setCurrentScreen("contact");
  };

  return (
    <AuthProvider>
      <DemoDataInitializer />
      <div className="min-h-screen bg-gray-50">
        {/* Mobile-first responsive container */}
        <div className="max-w-[428px] lg:max-w-2xl xl:max-w-4xl mx-auto bg-white min-h-screen shadow-2xl">
          {currentScreen === "client-home" && (
            <ClientHomeScreen
              onNavigateToSearch={(category) => {
                if (category) setSearchCategory(category);
                setCurrentScreen("search-filter");
              }}
              onNavigateToArtisanLogin={() =>
                setCurrentScreen("artisan-login")
              }
            />
          )}

          {currentScreen === "search-filter" && (
            <SearchFilterScreen
              onBack={() => setCurrentScreen("client-home")}
              onSearch={() => setCurrentScreen("artisan-list")}
              category={searchCategory}
              setCategory={setSearchCategory}
              filters={filters}
              setFilters={setFilters}
            />
          )}

          {currentScreen === "artisan-list" && (
            <ArtisanListScreen
              onBack={() => setCurrentScreen("search-filter")}
              onSelectArtisan={navigateToArtisanProfile}
              onContact={navigateToContact}
              category={searchCategory}
              filters={filters}
            />
          )}

          {currentScreen === "artisan-profile" &&
            selectedArtisan && (
              <ArtisanProfileScreen
                artisan={selectedArtisan}
                onBack={() => setCurrentScreen("artisan-list")}
                onContact={() =>
                  navigateToContact(selectedArtisan)
                }
              />
            )}

          {currentScreen === "contact" && selectedArtisan && (
            <ContactScreen
              artisan={selectedArtisan}
              onBack={() => setCurrentScreen("artisan-profile")}
              onComplete={() => setCurrentScreen("client-home")}
            />
          )}

          {currentScreen === "artisan-login" && (
            <ArtisanLoginScreen
              onBack={() => setCurrentScreen("client-home")}
              onLogin={() =>
                setCurrentScreen("artisan-dashboard")
              }
            />
          )}

          {currentScreen === "artisan-dashboard" && (
            <ArtisanDashboard
              onNavigateToProfile={() =>
                setCurrentScreen("profile-management")
              }
              onNavigateToAvailability={() =>
                setCurrentScreen("availability")
              }
              onNavigateToRequests={() =>
                setCurrentScreen("client-requests")
              }
              onLogout={() => setCurrentScreen("client-home")}
            />
          )}

          {currentScreen === "profile-management" && (
            <ProfileManagementScreen
              onBack={() => setCurrentScreen("artisan-dashboard")}
            />
          )}

          {currentScreen === "availability" && (
            <AvailabilityScreen
              onBack={() => setCurrentScreen("artisan-dashboard")}
            />
          )}

          {currentScreen === "client-requests" && (
            <ClientRequestsScreen
              onBack={() => setCurrentScreen("artisan-dashboard")}
            />
          )}
        </div>
      </div>
    </AuthProvider>
  );
}