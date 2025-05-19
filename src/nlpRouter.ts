
import { Complaint } from './types';

export function categorizeComplaint(complaint: Complaint): string {
  if (complaint.category === 'Auto-detect (NLP)') {
    const text = complaint.description.toLowerCase();
    if (text.includes('road') || text.includes('pothole')) return 'Roads';
    if (text.includes('water') || text.includes('electricity')) return 'Utilities';
    if (text.includes('crime') || text.includes('safety')) return 'Public Safety';
    return 'General';
  }
  return complaint.category;
}
