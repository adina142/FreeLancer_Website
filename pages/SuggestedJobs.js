import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import JobCard from '../components/JobCard';
const SuggestedJobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    if (!user) return;
    API.get('/applications/suggested', { headers: { Authorization: `Bearer ${user.token}` } })
      .then(res => setJobs(res.data));
  }, [user]);

  const applyToJob = jobId => {
    API.post('/applications/apply', { jobId }, { headers: { Authorization: `Bearer ${user.token}` } })
      .then(() => alert('Applied successfully'));
  };

  return (
    <div>
      <h2>Suggested Jobs</h2>
      {jobs.map(job => (
        <JobCard key={job._id} job={{ ...job, userSkills: user.skills }} onApply={applyToJob} />
      ))}
    </div>
  );
};
export default SuggestedJobs;