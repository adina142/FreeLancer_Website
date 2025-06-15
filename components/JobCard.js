import React from 'react';
const JobCard = ({ job, onApply }) => {
  const matchedSkills = job.skills.filter(skill => job.userSkills.includes(skill));
  return (
    <div className="border p-4 mb-2">
      <h3>{job.title}</h3>
      <p>{job.description}</p>
      <div>
        {matchedSkills.map(skill => (
          <span key={skill} className="text-green-500 mr-2">{skill}</span>
        ))}
      </div>
      <button onClick={() => onApply(job._id)}>Apply</button>
    </div>
  );
};
export default JobCard;