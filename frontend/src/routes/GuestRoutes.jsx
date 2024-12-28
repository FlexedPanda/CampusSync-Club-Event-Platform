import { Routes, Route } from "react-router-dom";

import Dashboard from "../components/Dashboard.jsx";
import Announcements from "../pages/Announcements.jsx";
import CampusEvents from "../pages/CampusEvents.jsx";
import ClubEvent from "../pages/ClubEvent.jsx";
import JoinedEvents from "../pages/JoinedEvents.jsx";
import UserProfile from "../pages/UserProfile.jsx";

export default function GuestRoutes() {
	return (
		<Routes>
			<Route path="dashboard" element={<Dashboard />}>
				<Route path="announcements" element={<Announcements />} />
				<Route path="events" element={<CampusEvents />} />
				<Route path="clubevent" element={<ClubEvent />} />
				<Route path="joined" element={<JoinedEvents />} />
				<Route path="profile" element={<UserProfile />} />
			</Route>
		</Routes>
	);
}
