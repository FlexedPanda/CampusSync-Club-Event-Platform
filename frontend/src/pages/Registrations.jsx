import {
  ScrollText,
  UserRound,
  Phone,
  Mail,
  Users,
  LoaderCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";

export default function Registrations() {
  const [loading, setLoading] = useState(true);
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await axios.get("/auth/registrations", {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
            type: localStorage.getItem("type"),
          },
        });

        if (res.data.registrations) {
          setRegistrations(res.data.registrations);
        } else {
          toast.error(res.data.message || "Failed to Fetch Registrations");
        }
      } catch (error) {
        toast.error("Something Went Wrong");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  const handleApprove = async (event, id) => {
    event.preventDefault();
    try {
      const res = await axios.post(`/auth/registrations/${id}`, {}, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"), 
          type: localStorage.getItem("type"),
        },
      });

      if (res.data.registration) {
        toast.success(res.data.message || "Registration Approved");
        setRegistrations(registrations.filter((reg) => reg._id !== id));
      } else {
        toast.error(res.data.message || "Approval Failed");
      }
    } catch (error) {
      toast.error("Something Went Wrong");
      console.error(error);
    }
  };

  const handleReject = async (event, id) => {
    event.preventDefault();
    try {
      const res = await axios.delete(`/auth/registrations/${id}`, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
          type: localStorage.getItem("type"), 
        },
      });

      if (res.data.registration) {
        toast.success(res.data.message || "Registration Rejected");
        setRegistrations(registrations.filter((reg) => reg._id !== id));
      } else {
        toast.error(res.data.message || "Rejection Failed");
      }
    } catch (error) {
      toast.error("Something Went Wrong");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="animate-spin text-muted-foreground">
          <LoaderCircle size={64} strokeWidth={1} />
        </div>
      </div>
    );
  }

  if (!registrations || registrations.length === 0) {
    return (
      <div className="h-[90vh] flex items-center justify-center p-6">
        <Card className="transition-transform transform hover:scale-125 shadow-md hover:shadow-lg">
          <CardHeader className="text-center text-2xl font-bold text-slate-700">
            Registration Requests
          </CardHeader>
          <CardContent className="w-full space-y-4 rounded-lg shadow-lg text-center text-gray-600">
            No Registration Requests Found
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
                {registration.club && (
                  <>
                    <Separator />
                    <div className="flex items-start gap-2">
                      <Users className="text-gray-600 w-5 h-7" />
                      <div>
                        <p className="font-bold text-gray-800">Club:</p>
                        <p className="text-gray-600">{registration.club.name}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter className="p-4 bg-gray-200 flex justify-center gap-4">
              <Button
                variant="outline" 
                onClick={(e) => handleApprove(e, registration._id)}
                className="text-emerald-700 hover:text-white hover:bg-emerald-700">
                Approve
              </Button>
              <Button
                variant="outline"
                onClick={(e) => handleReject(e, registration._id)}
                className="text-rose-700 hover:text-white hover:bg-rose-700">
                Reject
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}