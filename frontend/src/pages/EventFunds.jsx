import { LoaderCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function EventFunds() {
  const [loading, setLoading] = useState(false);
  const [funds, setFunds] = useState([]);

  useEffect(() => {
    const fetchFundedEvents = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/fund/funded", {
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

    fetchFundedEvents();
  }, []);

  const handleDropFund = async (event, id) => {
    event.preventDefault();
    try {
      const res = await axios.delete(`/fund/funded/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.fund) {
        toast.success(res.data.message || "Drop Fund Successful");
        setFunds((prevFunds) => prevFunds.filter((fund) => fund._id !== id));
      } else {
        toast.error(res.data.message || "Drop Fund Failed");
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

  if (!funds || funds.length === 0) {
    return (
      <div className="h-[90vh] flex items-center justify-center p-6">
        <Card className="transition-transform transform hover:scale-125 shadow-md hover:shadow-lg">
          <CardHeader className="text-center text-2xl font-bold text-slate-700">
            Event Funds
          </CardHeader>
          <CardContent className="w-full space-y-4 rounded-lg shadow-lg text-center text-gray-600">
            Could Not Find Any Event Funds
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-auto flex items-center justify-center p-6">
      <Card className="w-full rounded-lg shadow-lg bg-slate-100">
        <CardHeader className="flex justify-center items-center">
          <CardTitle className="text-center text-3xl font-bold text-slate-700">
            Event Funds
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center text-slate-700">Invoice No.</TableHead>
                <TableHead className="text-center text-slate-700">Event</TableHead>
                <TableHead className="text-center text-slate-700">Cost</TableHead>
                <TableHead className="text-center text-slate-700">Funds</TableHead>
                <TableHead className="text-center text-slate-700">Funded By</TableHead>
                <TableHead className="text-center text-slate-700">Approval Date</TableHead>
                <TableHead className="text-center text-slate-700">Approved By</TableHead>
                <TableHead className="text-center text-slate-700">Amount</TableHead>
                <TableHead className="text-center text-slate-700">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {funds.map((fund) => (
                <TableRow key={fund._id}>
                  <TableCell className="text-center font-bold">
                    {fund._id.toString().slice(-6)}
                    </TableCell>
                  <TableCell className="text-center font-semibold text-muted-foreground">
                    {fund.event.title}
                  </TableCell>
                  <TableCell className="text-center font-semibold text-muted-foreground">
                    {fund.event.cost}
                  </TableCell>
                  <TableCell className="text-center font-semibold text-muted-foreground">
                    {fund.funds}
                  </TableCell>
                  <TableCell className="text-center font-semibold text-muted-foreground">
                    {fund.sponsor? fund.sponsor.company : fund.officer.name}
                  </TableCell>
                  <TableCell className="text-center font-semibold text-muted-foreground">
                    {new Date(fund.createdAt).toLocaleDateString("en-Uk", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell >
                    <TableCell className="text-center font-semibold text-muted-foreground">
                      {fund.officer.name}
                    </TableCell>
                  <TableCell className="text-center font-semibold text-muted-foreground">
                    {fund.amount}
                  </TableCell>
                  <TableCell className="text-center font-semibold text-muted-foreground">
                    <Button
                      variant="outline"
                      className="text-rose-700 hover:bg-rose-700 hover:text-white"
                      onClick={(e) => handleDropFund(e, fund._id)}>
                      Drop
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            {/* <TableFooter>
              <TableRow>
                <TableCell colSpan={7} className="font-bold text-right">
                  Total:
                </TableCell>
                <TableCell className="text-right">
                  {funds.reduce((total, fund) => total + (fund.amount || 0), 0)} Taka
                </TableCell>
              </TableRow>
            </TableFooter> */}
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
