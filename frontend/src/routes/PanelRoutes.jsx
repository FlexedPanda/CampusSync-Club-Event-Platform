import { Routes, Route } from "react-router-dom";

import Dashboard from "../components/Dashboard.jsx";
import Announcements from "../pages/Announcements.jsx";
import CampusEvents from "../pages/CampusEvents.jsx";
import ClubEvent from "../pages/ClubEvent.jsx";
import HostEvent from "../pages/HostEvent.jsx";
import RequestEvent from "../pages/RequestEvent.jsx";
import Participants from "../pages/Participants.jsx";
import JoinedEvents from "../pages/JoinedEvents.jsx";
import RequestedEvent from "../pages/RequestedEvent.jsx";
import UserProfile from "../pages/UserProfile.jsx";

export default function PanelRoutes() {
	return (
		<Routes>
			<Route path="dashboard" element={<Dashboard />}>
				<Route path="announcements" element={<Announcements />} />
				<Route path="events" element={<CampusEvents />} />
				<Route path="clubevent" element={<ClubEvent />} />
				<Route path="host" element={<HostEvent />} />
				<Route path="request" element={<RequestEvent />} />
				<Route path="participants" element={<Participants />} />
				<Route path="joined" element={<JoinedEvents />} />
				<Route path="requested" element={<RequestedEvent />} />
				<Route path="profile" element={<UserProfile />} />
			</Route>
		</Routes>
	);
}
