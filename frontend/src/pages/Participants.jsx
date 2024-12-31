import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { LoaderCircle, UserRound, Phone, Mail } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Participants() {
  const [loading, setLoading] = useState(true);
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const res = await axios.get("/auth/pending-registrations", {
        headers: {
          token: localStorage.getItem("token"),
          type: localStorage.getItem("type")
        }
      });

      if (res.data.success) {
        setRegistrations(res.data.registrations);
      } else {
        toast.error("Failed to fetch registrations");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch registrations");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await axios.post(`/auth/approve-registration/${id}`, {}, {
        headers: {
          token: localStorage.getItem("token"),
          type: localStorage.getItem("type")
        }
      });

      if (res.data.success) {
        toast.success("Registration approved successfully");
        setRegistrations(prev => prev.filter(reg => reg._id !== id));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to approve registration");
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await axios.delete(`/auth/reject-registration/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
          type: localStorage.getItem("type")
        }
      });

      if (res.data.success) {
        toast.success("Registration rejected successfully");
        setRegistrations(prev => prev.filter(reg => reg._id !== id));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reject registration");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <LoaderCircle className="animate-spin" size={64} strokeWidth={1} />
      </div>
    );
  }

  if (!registrations.length) {
    return (
      <div className="h-[90vh] flex items-center justify-center p-6">
        <Card className="transition-transform transform hover:scale-125 shadow-md hover:shadow-lg">
          <CardHeader className="text-center text-2xl font-bold text-slate-700">
            Registration Requests
          </CardHeader>
          <CardContent className="w-full space-y-4 rounded-lg shadow-lg text-center text-gray-600">
            No pending registration requests
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <main className="h-[90vh] p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {registrations.map((registration) => (
          <Card key={registration._id} className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-slate-700">
                Registration Request
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-2">
                  <UserRound className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Name:</p>
                    <p className="text-gray-600">{registration.name}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-2">
                  <Phone className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Phone:</p>
                    <p className="text-gray-600">{registration.phone}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-2">
                  <Mail className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Email:</p>
                    <p className="text-gray-600">{registration.email}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 bg-gray-200 flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => handleApprove(registration._id)}
                className="text-emerald-700 hover:text-white hover:bg-emerald-700"
              >
                Approve
              </Button>
              <Button
                variant="outline"
                onClick={() => handleReject(registration._id)}
                className="text-rose-700 hover:text-white hover:bg-rose-700"
              >
                Reject
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}