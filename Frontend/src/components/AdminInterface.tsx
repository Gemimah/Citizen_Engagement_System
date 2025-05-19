import { useState } from 'react';
import { Link } from 'react-router-dom';
import AnalyticsDashboard from './AnalyticsDashboard';

export default function AdminInterface() {
  const [showAnalytics, setShowAnalytics] = useState(false);

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Admin Interface</h2>
      <button
        onClick={() => setShowAnalytics(!showAnalytics)}
        className="bg-blue-500 text-white p-2 mb-4"
      >
        {showAnalytics ? 'Hide Analytics' : 'View Analytics'}
      </button>
      {showAnalytics && <AnalyticsDashboard />}
      <Link to="/tracker" className="text-blue-500 underline">
        View All Complaints
      </Link>
    </div>
  );
}