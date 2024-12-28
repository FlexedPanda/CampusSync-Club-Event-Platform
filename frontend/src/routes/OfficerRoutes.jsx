import { Routes, Route } from "react-router-dom";

import Dashboard from "../components/Dashboard.jsx";
import Announcements from "../pages/Announcements.jsx";
import CampusEvents from "../pages/CampusEvents.jsx";
import Registrations from "@/pages/Registrations.jsx";
import Sponsorships from "@/pages/Sponsorships.jsx";
import UserDirectory from "@/pages/UserDirectory.jsx";
import EventProposals from "@/pages/EventProposals.jsx";
import SponsoredFunds from "@/pages/SponsoredFunds.jsx";
import EventFunds from "@/pages/EventFunds.jsx";
import UserProfile from "../pages/UserProfile.jsx";

export default function OfficerRoutes() {
	return (
		<Routes>
			<Route path="dashboard" element={<Dashboard />}>
				<Route path="announcements" element={<Announcements />} />
				<Route path="events" element={<CampusEvents />} />
				<Route path="registrations" element={<Registrations />} />
				<Route path="sponsorships" element={<Sponsorships />} />
				<Route path="users" element={<UserDirectory />} />
				<Route path="proposals" element={<EventProposals />} />
				<Route path="sponsors" element={<SponsoredFunds />} />
				<Route path="funds" element={<EventFunds />} />
				<Route path="profile" element={<UserProfile />} />
			</Route>
		</Routes>
	);
}
