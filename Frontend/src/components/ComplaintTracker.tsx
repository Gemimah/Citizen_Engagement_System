
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  Chip,
  Grid,
  Button,
  CircularProgress,
  Alert,
  Divider,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { format } from "date-fns";
import {
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Error as ErrorIcon,
  Assignment as AssignmentIcon,
  Update as UpdateIcon,
  Done as DoneIcon,
} from "@mui/icons-material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";

interface ComplaintStatus {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "resolved" | "rejected";
  createdAt: string;
  updatedAt: string;
  agency: string;
  category: string;
  priority: "low" | "medium" | "high";
  updates: {
    timestamp: string;
    status: string;
    message: string;
  }[];
}

const statusColors = {
  pending: "#FFA726",
  in_progress: "#29B6F6",
  resolved: "#66BB6A",
  rejected: "#EF5350",
} as const;

const priorityColors = {
  low: "#66BB6A",
  medium: "#FFA726",
  high: "#EF5350",
} as const;

const ComplaintTracker: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [complaint, setComplaint] = useState<ComplaintStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/complaints/${id}`
        );
        setComplaint(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch complaint details");
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !complaint) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <ErrorIcon color="error" sx={{ fontSize: 48, mb: 2 }} />
        <Typography variant="h5" color="error" gutterBottom>
          {error || "Complaint not found"}
        </Typography>
      </Box>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <PendingIcon />;
      case "in_progress":
        return <UpdateIcon />;
      case "resolved":
        return <DoneIcon />;
      case "rejected":
        return <ErrorIcon />;
      default:
        return <AssignmentIcon />;
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
        Complaint Status Tracker
      </Typography>

      <Grid container spacing={4}>
        {/* Status Overview Card */}
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Status Overview
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Chip
                  icon={getStatusIcon(complaint.status)}
                  label={complaint.status.replace("_", " ").toUpperCase()}
                  sx={{
                    bgcolor: statusColors[complaint.status],
                    color: "white",
                    fontWeight: 600,
                  }}
                />
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Complaint ID
                  </Typography>
                  <Typography variant="body1">{complaint.id}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Category
                  </Typography>
                  <Typography variant="body1">{complaint.category}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Priority
                  </Typography>
                  <Chip
                    label={complaint.priority.toUpperCase()}
                    size="small"
                    sx={{
                      bgcolor: priorityColors[complaint.priority],
                      color: "white",
                    }}
                  />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Assigned Agency
                  </Typography>
                  <Typography variant="body1">{complaint.agency}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Complaint Details Card */}
        <Grid item xs={12} md={8}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Complaint Details
              </Typography>
              <Typography variant="h5" gutterBottom>
                {complaint.title}
              </Typography>
              <Typography variant="body1" paragraph>
                {complaint.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Status Timeline
              </Typography>
              <Timeline>
                {complaint.updates.map((update, index) => (
                  <TimelineItem key={index}>
                    <TimelineOppositeContent color="text.secondary">
                      {format(new Date(update.timestamp), "PPPpp")}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot color="primary">
                        {getStatusIcon(update.status)}
                      </TimelineDot>
                      {index < complaint.updates.length - 1 && (
                        <TimelineConnector />
                      )}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {update.status.replace("_", " ").toUpperCase()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {update.message}
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ComplaintTracker;
