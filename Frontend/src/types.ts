export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  userEmail?: string;
  userPhone?: string;
  response?: string;
}