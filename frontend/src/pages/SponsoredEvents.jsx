import { 
  LoaderCircle,
  Album,
  CircleDollarSign, 
  CalendarFold,
  UserRound,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";

export default function SponsoredEvents() {
  const [loading, setLoading] = useState(false);
  const [funds, setFunds] = useState([]);

  useEffect(() => {
    const fetchSponsoredEvents = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/fund/sponsored", {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
            type: localStorage.getItem("type"),
          },
        });

        if (res.data.funds) {
          setFunds(res.data.funds);
        } else {
          toast.error(res.data.message || "Failed to Fetch Funds");
        }
      } catch (error) {
        toast.error("Something Went Wrong");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsoredEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="animate-spin text-muted-foreground">
          <LoaderCircle size={64} strokeWidth={1} />
        </div>
      </div>
    );
  }

  if (!funds || funds.length === 0) {
    return (
      <div className="h-[90vh] flex items-center justify-center p-6">
        <Card className="transition-transform transform hover:scale-125 shadow-md hover:shadow-lg">
          <CardHeader className="text-center text-2xl font-bold text-slate-700">
            Sponsored Events
          </CardHeader>
          <CardContent className="w-full space-y-4 rounded-lg shadow-lg text-center text-gray-600">
            Could Not Find Any Sponsored Events
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <main className="h-[90vh] p-4">
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {funds.map((fund) => (
          <Card
            key={fund._id}
            className="transition-transform transform hover:scale-95 shadow-md hover:shadow-lg border border-gray-300 rounded-lg bg-gray-50">
            <CardHeader className="flex flex-col items-center bg-gradient-to-r from-slate-600 to-zinc-800 text-white rounded-t-lg p-4"> 
              <CardTitle className="text-lg tracking-widest">
                {fund._id.toString().slice(-6)}
              </CardTitle>
            </CardHeader>
            <CardContent className="py-2 pl-4">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Album className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Event:</p>
                    <p className="text-gray-600">{fund.event.title}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CircleDollarSign className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Fund:</p>
                    <p className="text-gray-600">{fund.amount} Taka</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CalendarFold className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Date:</p>
                    <p className="text-gray-600">
                      {new Date(fund.createdAt).toLocaleDateString("en-UK", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-200 py-2 pl-4">
              <div className="flex items-start gap-2">
                <UserRound className="text-gray-600 w-5 h-7" />
                <div>
                  <p className="font-bold text-gray-800">Approved By:</p>
                  <p className="text-gray-600 font-semibold">
                    {fund.officer.name}
                  </p>
                  <p className="text-gray-600">
                    {`${fund.officer.role}, ${fund.officer.designation}`}
                  </p>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
