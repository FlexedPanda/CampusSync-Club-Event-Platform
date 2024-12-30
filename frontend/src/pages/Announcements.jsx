import { useState, useEffect } from "react";
import { ScrollText, LoaderCircle, Trash2 } from "lucide-react"; // Add Trash2 import
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Announcements() {
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    eventId: ""
  });
  
  const type = localStorage.getItem("type");
  const email = localStorage.getItem("email");
  const isPanel = email?.toLowerCase().startsWith('panel');
  const canCreateAnnouncement = type === "Panel" || type === "Officer";

  useEffect(() => {
    fetchAnnouncements();
    if (type === "Panel" || type === "Officer") {
      fetchEvents();
    }
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("/announcement/events", {
        headers: {
          token: localStorage.getItem("token"),
          type: localStorage.getItem("type")
        }
      });
      setEvents(res.data.events);
    } catch (error) {
      toast.error("Failed to fetch events");
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get("/announcement", {  // Remove 'api' prefix
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
          type: localStorage.getItem("type")
        }
      });

      if (res.data.success) {
        setAnnouncements(res.data.announcements);
      } else {
        toast.error(res.data.message || "Failed to fetch announcements");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch announcements");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate event selection for panels
    if (type === "Panel" && !form.eventId) {
      toast.error("Please select an event");
      return;
    }

    try {
      await axios.post("/announcement", form, {
        headers: {
          token: localStorage.getItem("token"),
          type: localStorage.getItem("type")
        }
      });
      toast.success("Announcement created!");
      setForm({ title: "", content: "", eventId: "" });
      setShowForm(false);
      fetchAnnouncements();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create announcement");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/announcement/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
          type: localStorage.getItem("type")
        }
      });

      if (res.data.success) {
        toast.success("Announcement deleted successfully");
        // Remove the deleted announcement from state
        setAnnouncements(announcements.filter(a => a._id !== id));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete announcement");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <LoaderCircle className="animate-spin" size={64} strokeWidth={1} />
      </div>
    );
  }

  return (
    <main className="p-6">
      {canCreateAnnouncement && (
        <div className="mb-6">
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="bg-slate-700 text-white hover:bg-slate-800"
          >
            {showForm ? "Cancel" : "Create Announcement"}
          </Button>

          {showForm && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>New Announcement</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Title"
                    value={form.title}
                    onChange={e => setForm({...form, title: e.target.value})}
                    required
                  />
                  <Textarea
                    placeholder="Content"
                    value={form.content}
                    onChange={e => setForm({...form, content: e.target.value})}
                    required
                  />
                  <Select 
                    value={form.eventId}
                    onValueChange={value => setForm({...form, eventId: value})}
                    required={type === "Panel"}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={type === "Panel" ? "Select Event (Required)" : "Select Event (Optional)"} />
                    </SelectTrigger>
                    <SelectContent>
                      {events.map(event => (
                        <SelectItem key={event._id} value={event._id}>
                          {event.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button type="submit">Post Announcement</Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <div className="grid gap-6">
        {announcements.map(announcement => (
          <Card key={announcement._id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{announcement.title}</CardTitle>
              {type === "Officer" && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(announcement._id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-100"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <p>{announcement.content}</p>
              <div className="mt-4 text-sm text-gray-500">
                Posted by {announcement.creator.name}
                {announcement.club && ` - ${announcement.club.name}`}
                {announcement.event && ` | Event: ${announcement.event.title}`}
                <br />
                {new Date(announcement.createdAt).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}