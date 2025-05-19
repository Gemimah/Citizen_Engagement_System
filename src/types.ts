export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "pending" | "in_progress" | "resolved" | "rejected";
  priority: "low" | "medium" | "high";
  agency: string;
  userEmail?: string;
  userPhone?: string;
  location?: {
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
  updates: ComplaintUpdate[];
  assignedTo?: string;
}

export interface ComplaintUpdate {
  id: string;
  complaint_id: string;
  timestamp: string;
  status: "pending" | "in_progress" | "resolved" | "rejected";
  message: string;
  responder?: string;
}

export interface ComplaintRequestBody {
  title: string;
  description: string;
  category?: string;
  userEmail?: string;
  userPhone?: string;
}

export interface Agency {
  id: string;
  name: string;
  description: string;
  categories: string[];
  contactEmail: string;
  contactPhone: string;
  address: string;
  operatingHours: {
    start: string;
    end: string;
    days: string[];
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "citizen" | "admin" | "agency_staff";
  agencyId?: string;
  phone?: string;
  createdAt: Date;
  lastLogin?: Date;
}

export interface NotificationPayload {
  email: string;
  complaintId: string;
  status: "pending" | "in_progress" | "resolved" | "rejected";
  message: string;
}
