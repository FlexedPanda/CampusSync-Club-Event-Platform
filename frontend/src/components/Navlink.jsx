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

	const handleRedirect = async (path, title) => {
		try {
			const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/protect`, {
				method: "GET",
				headers: {
					token: localStorage.getItem("token"),
					type: localStorage.getItem("type"),
				},
			});

			const data = await res.json();
			if (data.user) {
				navigate(path);
				toast.success(`Redirected to ${title}`);
			} else {
        localStorage.clear();
				navigate("/app/home/login");
			}
      console.log(data);
		} catch (error) {
			localStorage.clear();
			navigate("/app/home/login");
		}
	};

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Sidebar Menu</SidebarGroupLabel>
			<SidebarMenu>
				{links.map((link) => (
					<SidebarMenuItem key={link.title}>
						<SidebarMenuButton
							tooltip={link.title}
							onClick={() => handleRedirect(link.path, link.title)}>
							{link.icon && <link.icon />}
							<span>{link.title}</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
