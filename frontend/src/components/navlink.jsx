import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function Navlink({ links }) {
	const navigate = useNavigate();
	const type = localStorage.getItem("type");
	const token = localStorage.getItem("token");

	const handleNavigation = async (path, title) => {
		try {
			const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/protect`, {
				method: "GET",
				headers: {
					token: token,
					type: type,
				},
			});

			const data = await res.json();
			if (data.user) {
				navigate(path);
				toast.success(`Displaying ${title}`);
			} else {
        localStorage.clear();
				navigate("/app/home/login");
        window.location.reload();
				toast.error(data.message || "Unauthorized Access");
			}
      console.log(data);
		} catch (error) {
			localStorage.clear();
			navigate("/app/home/login");
			toast.error("Something Went Wrong");
			window.location.reload();
			console.log(error);
		}
	};

	return (
		<SidebarGroup>
			<SidebarGroupLabel>{`${type} Dashboard`}</SidebarGroupLabel>
			<SidebarMenu>
				{links.map((link) => (
					<SidebarMenuItem key={link.title}>
						<SidebarMenuButton
							tooltip={link.title}
							onClick={() => handleNavigation(link.path, link.title)}>
							{link.icon && <link.icon />}
							<span>{link.title}</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
