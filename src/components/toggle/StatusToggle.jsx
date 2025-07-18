import usetoken from "@/api/usetoken";
import BASE_URL from "@/config/BaseUrl";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";

const StatusToggle = ({ initialStatus, teamId, onStatusChange }) => {
  const [status, setStatus] = useState(initialStatus);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const token = usetoken();
  const handleToggle = async () => {
    setIsLoading(true);
    const newStatus = status === "Active" ? "Inactive" : "Active";

    try {
      await axios.put(
        `${BASE_URL}/api/panel-update-team-status/${teamId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setStatus(newStatus);
      if (onStatusChange) {
        onStatusChange(newStatus);
      }

      toast({
        title: "Status Updated",
        description: `Team status changed to ${newStatus}`,
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`inline-flex items-center space-x-1 px-2 py-1 rounded 
        ${
          status === "Active"
            ? "text-green-800 hover:bg-green-100"
            : "text-gray-800 hover:bg-gray-100"
        } transition-colors`}
    >
      <RefreshCcw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
      <span>{status}</span>
    </button>
  );
};

export default StatusToggle;
