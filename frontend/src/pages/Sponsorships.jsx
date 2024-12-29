import {
  UserRound,
  Building2,
  Mail,
  Phone,
  LoaderCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Sponsorships() {
  const [sponsorships, setSponsorships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSponsorships = async () => {
      try {
        const res = await axios.get("/auth/sponsorships", {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
            type: localStorage.getItem("type"),
          }
        });
        if (res.data.success) {
          setSponsorships(res.data.sponsorships);
        }
      } catch (error) {
        toast.error("Failed to fetch sponsorships");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsorships();
  }, []);

  const handleApprove = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/auth/sponsor/approve/${id}`, {}, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
          type: localStorage.getItem("type"),
        }
      });
      
      if (res.data.success) {
        toast.success(res.data.message || "Sponsorship Approved Successfully");
        setSponsorships(sponsorships.filter((s) => s._id !== id));
      } else {
        toast.error(res.data.message || "Approval Failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something Went Wrong");
      console.error(error);
    }
  };

  const handleReject = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`/auth/sponsor/reject/${id}`, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
          type: localStorage.getItem("type"),
        }
      });
      if (res.data.success) {
        toast.success("Sponsorship Rejected Successfully");
        setSponsorships(sponsorships.filter((s) => s._id !== id));
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

  if (!sponsorships || sponsorships.length === 0) {
    return (
      <div className="h-[90vh] flex items-center justify-center p-6">
        <Card className="transition-transform transform hover:scale-125 shadow-md hover:shadow-lg">
          <CardHeader className="text-center text-2xl font-bold text-slate-700">
            Sponsorship Requests
          </CardHeader>
          <CardContent className="w-full space-y-4 rounded-lg shadow-lg text-center text-gray-600">
            No Sponsorship Requests Found
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <main className="h-[90vh] p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sponsorships.map((sponsorship) => (
          <Card key={sponsorship._id} className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-slate-700">
                Sponsorship Request
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-2">
                  <UserRound className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Representative:</p>
                    <p className="text-gray-600">{sponsorship.name}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-2">
                  <Building2 className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Organization:</p>
                    <p className="text-gray-600">{sponsorship.organization}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-2">
                  <Phone className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Phone:</p>
                    <p className="text-gray-600">{sponsorship.phone}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-2">
                  <Mail className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Email:</p>
                    <p className="text-gray-600">{sponsorship.email}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 bg-gray-200 flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={(e) => handleApprove(e, sponsorship._id)}
                className="text-emerald-700 hover:text-white hover:bg-emerald-700"
              >
                Approve
              </Button>
              <Button
                variant="outline"
                onClick={(e) => handleReject(e, sponsorship._id)}
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