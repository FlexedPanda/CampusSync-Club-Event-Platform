import { Routes, Route } from "react-router-dom";

import Dashboard from "../components/Dashboard.jsx";
import Announcements from "../pages/Announcements.jsx";
import CampusEvents from "../pages/CampusEvents.jsx";
import SponsoredEvents from "../pages/SponsoredEvents.jsx";
import FundsOffered from "../pages/FundsOffered.jsx";
import UserProfile from "../pages/UserProfile.jsx";

export default function SponsorRoutes() {
	return (
		<Routes>
			<Route path="dashboard" element={<Dashboard />}>
				<Route path="announcements" element={<Announcements />} />
				<Route path="events" element={<CampusEvents />} />
				<Route path="sponsored" element={<SponsoredEvents />} />
				<Route path="offered" element={<FundsOffered />} />
				<Route path="profile" element={<UserProfile />} />
			</Route>
		</Routes>
	);
}
