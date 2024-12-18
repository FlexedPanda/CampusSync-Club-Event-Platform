import { Routes, Route } from "react-router-dom";

import Dashboard from "../components/Dashboard.jsx";
import Announcements from "../pages/Announcements.jsx";
import CampusEvents from "../pages/CampusEvents.jsx";
import ClubEvent from "../pages/ClubEvent.jsx";
import CreatePost from "../pages/CreatePost.jsx";
import RequestEvent from "../pages/RequestEvent.jsx";
import Participants from "../pages/Participants.jsx";
import Applications from "../pages/Applications.jsx";
import ProposedEvent from "../pages/ProposedEvent.jsx";
import UserProfile from "../pages/UserProfile.jsx";

export default function PanelRoutes() {
	return (
		<Routes>
			<Route path="dashboard" element={<Dashboard />}>
				<Route path="announcements" element={<Announcements />} />
				<Route path="events" element={<CampusEvents />} />
				<Route path="clubevent" element={<ClubEvent />} />
				<Route path="post" element={<CreatePost />} />
				<Route path="request" element={<RequestEvent />} />
				<Route path="participants" element={<Participants />} />
				<Route path="applications" element={<Applications />} />
				<Route path="proposed" element={<ProposedEvent />} />
				<Route path="profile" element={<UserProfile />} />
			</Route>
		</Routes>
	);
}
