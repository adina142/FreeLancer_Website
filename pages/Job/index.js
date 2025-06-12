import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './job.module.css';

const JobCard = ({ job }) => (
  <div className={styles.jobCard}>
    <div className={styles.jobHeader}>
      <div className={styles.jobTitleRow}>
        <h3>{job.title}</h3>
        <span className={styles.budget}>${job.budget}</span>
      </div>
      {job.skills && job.skills.length > 0 && (
        <div className={styles.skills}>
          <ul className={styles.skillsList}>
            {job.skills.map((skill, index) => (
              <li key={index} className={styles.skillBadge}>
                {skill}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    <p className={styles.jobDescription}>{job.description}</p>
    <div className={styles.jobMeta}>
      <div>
        <span className={styles.metaLabel}>Deadline:</span>
        <span>{new Date(job.deadline).toLocaleDateString()}</span>
      </div>
      {job.postedBy && (
        <div>
          <span className={styles.metaLabel}>Posted by:</span>
          <span>{job.postedBy.name || job.postedBy.email}</span>
        </div>
      )}
    </div>
    <button className={styles.applyButton}>Apply Now</button>
  </div>
);

const JobPostForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    skills: '',
    deadline: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [submitting, setSubmitting] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState([]);
  const [filters, setFilters] = useState({
    skills: [],
    minBudget: '',
    maxBudget: ''
  });
  const [filterInput, setFilterInput] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/jobs`);
      setJobs(res.data.jobs);
    } catch (err) {
      console.error('Error fetching jobs:', err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillKeyDown = (e) => {
    if (['Enter', ','].includes(e.key)) {
      e.preventDefault();
      const newSkill = skillInput.trim();
      if (newSkill && !skills.includes(newSkill)) {
        setSkills([...skills, newSkill]);
        setFormData(prev => ({
          ...prev,
          skills: [...skills, newSkill].join(', ')
        }));
      }
      setSkillInput('');
    }
  };

  const removeSkill = (index) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
    setFormData(prev => ({
      ...prev,
      skills: newSkills.join(', ')
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleFilterSkillKeyDown = (e) => {
    if (['Enter', ','].includes(e.key)) {
      e.preventDefault();
      const newSkill = filterInput.trim();
      if (newSkill && !filters.skills.includes(newSkill)) {
        setFilters(prev => ({
          ...prev,
          skills: [...prev.skills, newSkill]
        }));
      }
      setFilterInput('');
    }
  };

  const removeFilterSkill = (index) => {
    const newSkills = [...filters.skills];
    newSkills.splice(index, 1);
    setFilters(prev => ({
      ...prev,
      skills: newSkills
    }));
  };

  const clearFilters = () => {
    setFilters({
      skills: [],
      minBudget: '',
      maxBudget: ''
    });
    setFilterInput('');
  };

  const filterJobs = (jobs) => {
    return jobs.filter(job => {
      // Filter by skills
      if (filters.skills.length > 0) {
        const jobSkills = job.skills || [];
        const hasMatchingSkill = filters.skills.some(filterSkill => 
          jobSkills.some(jobSkill => 
            jobSkill.toLowerCase().includes(filterSkill.toLowerCase())
          )
        );
        if (!hasMatchingSkill) return false;
      }

      // Filter by budget
      const jobBudget = Number(job.budget);
      if (filters.minBudget && jobBudget < Number(filters.minBudget)) {
        return false;
      }
      if (filters.maxBudget && jobBudget > Number(filters.maxBudget)) {
        return false;
      }

      return true;
    });
  };

  const filteredJobs = filterJobs(jobs);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      const token = localStorage.getItem('token');

      const payload = {
        ...formData,
        skills: formData.skills
          .split(',')
          .map(skill => skill.trim())
          .filter(Boolean)
      };

      await axios.post(
        `${process.env.REACT_APP_API_URL}/jobs`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage({ text: 'Job posted successfully!', type: 'success' });
      setFormData({
        title: '',
        description: '',
        budget: '',
        skills: '',
        deadline: ''
      });
      setSkills([]);
      fetchJobs();
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || 'Error posting job',
        type: 'error'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <form className={styles.jobForm} onSubmit={handleSubmit}>
          <h2 className={styles.formTitle}>Post a Freelance Job</h2>

          <div className={styles.formGroup}>
            <label htmlFor="title">Job Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Web Developer Needed"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Job Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the job details..."
              required
              rows={5}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="budget">Budget ($)</label>
              <input
                id="budget"
                name="budget"
                type="number"
                value={formData.budget}
                onChange={handleChange}
                placeholder="500"
                required
                min={1}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="skills">Skills</label>
              <div className={styles.skillsInputWrapper}>
                {skills.map((skill, index) => (
                  <span key={index} className={styles.skillTag}>
                    {skill}
                    <button
                      type="button"
                      className={styles.removeSkill}
                      onClick={() => removeSkill(index)}
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  id="skills"
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                  placeholder="Type and press Enter to add"
                  className={styles.skillInput}
                />
              </div>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="deadline">Deadline</label>
            <input
              id="deadline"
              name="deadline"
              type="date"
              value={formData.deadline}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={submitting}
          >
            {submitting ? (
              <>
                <span className={styles.spinner}></span> Posting...
              </>
            ) : 'Post Job'}
          </button>

          {message.text && (
            <p className={`${styles.message} ${styles[message.type]}`}>
              {message.text}
            </p>
          )}
        </form>
      </div>

      <div className={styles.jobsSection}>
        <div className={styles.filterSection}>
          <h2 className={styles.sectionTitle}>Filter Jobs</h2>
          <div className={styles.filterControls}>
            <div className={styles.filterGroup}>
              <label>Skills</label>
              <div className={styles.skillsInputWrapper}>
                {filters.skills.map((skill, index) => (
                  <span key={index} className={styles.skillTag}>
                    {skill}
                    <button
                      type="button"
                      className={styles.removeSkill}
                      onClick={() => removeFilterSkill(index)}
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={filterInput}
                  onChange={(e) => setFilterInput(e.target.value)}
                  onKeyDown={handleFilterSkillKeyDown}
                  placeholder="Type and press Enter to add"
                  className={styles.skillInput}
                />
              </div>
            </div>

            <div className={styles.budgetFilter}>
              <div className={styles.formGroup}>
                <label htmlFor="minBudget">Min Budget ($)</label>
                <input
                  id="minBudget"
                  name="minBudget"
                  type="number"
                  value={filters.minBudget}
                  onChange={handleFilterChange}
                  placeholder="Min"
                  min={0}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="maxBudget">Max Budget ($)</label>
                <input
                  id="maxBudget"
                  name="maxBudget"
                  type="number"
                  value={filters.maxBudget}
                  onChange={handleFilterChange}
                  placeholder="Max"
                  min={0}
                />
              </div>
            </div>

            <button
              type="button"
              className={styles.clearFiltersButton}
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
        </div>

        <h2 className={styles.sectionTitle}>Posted Jobs</h2>
        {filteredJobs.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No jobs match your filters. Try adjusting your criteria.</p>
          </div>
        ) : (
          <div className={styles.jobsGrid}>
            {filteredJobs.map(job => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobPostForm;
