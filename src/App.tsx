import { HashRouter, Routes, Route } from 'react-router-dom';
import LanguageSwitcher from './components/LanguageSwitcher';
import HomePage from './pages/HomePage';
import CountryHubPage from './pages/CountryHubPage';
import CountryOverviewPage from './pages/CountryOverviewPage';
import CitiesPage from './pages/CitiesPage';
import ThoughtsPage from './pages/ThoughtsPage';
import TravelGuidePage from './pages/TravelGuidePage';

function App() {
  return (
    <HashRouter>
      <LanguageSwitcher />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/country/:countrySlug" element={<CountryHubPage />} />
        <Route path="/country/:countrySlug/overview" element={<CountryOverviewPage />} />
        <Route path="/country/:countrySlug/cities" element={<CitiesPage />} />
        <Route path="/country/:countrySlug/thoughts" element={<ThoughtsPage />} />
        <Route path="/country/:countrySlug/travel-guide" element={<TravelGuidePage />} />
      </Routes>
    </HashRouter>
  );
}
export default App;
    