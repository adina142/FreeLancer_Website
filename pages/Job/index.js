import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './job.module.css';
import EmojiPicker from 'emoji-picker-react';
import { FaSmile, FaComment, FaPaperPlane } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const JobCard = ({ 
  job, 
  showBookmarkOption = true, 
  onBookmarkToggle,
  showComments = false,
  onToggleComments,
  comments = [],
  onCommentSubmit,
  commentText = '',
  onCommentInputChange
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkBookmarkStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await axios.get(
          ${process.env.REACT_APP_API_URL}/bookmarks/${job._id}/status,
          { headers: { Authorization: Bearer ${token} } }
        );
        setIsBookmarked(res.data.bookmarked);
      } catch (err) {
        console.error('Error checking bookmark status:', err);
      }
    };

    checkBookmarkStatus();
  }, [job._id]);

  const handleBookmark = async () => {
    if (bookmarkLoading) return;
    setBookmarkLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await axios.post(
        ${process.env.REACT_APP_API_URL}/bookmarks/${job._id},
        {},
        { headers: { Authorization: Bearer ${token} } }
      );

      setIsBookmarked(res.data.bookmarked);

      if (onBookmarkToggle) {
        onBookmarkToggle(job._id, res.data.bookmarked);
      }
    } catch (err) {
      console.error('Error toggling bookmark:', err);
    } finally {
      setBookmarkLoading(false);
    }
  };

  const handleApplyClick = () => {
    navigate(/apply/${job._id});
  };

  const handleCommentSubmitClick = async () => {
    if (!commentText.trim() || commentLoading) return;
    setCommentLoading(true);

    try {
      await onCommentSubmit(); // jobId can be passed from parent scope
    } catch (err) {
      console.error('Error submitting comment:', err);
    } finally {
      setCommentLoading(false);
    }
  };

  return (
    <div className={styles.jobCard}>
      <div className={styles.jobHeader}>
        <div className={styles.jobTitleRow}>
          <h3>{job.title}</h3>
          <span className={styles.budget}>${job.budget}</span>
        </div>

        {job.skills?.length > 0 && (
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
          <span className={styles.metaLabel}>Deadline:</span>{' '}
          <span>{new Date(job.deadline).toLocaleDateString()}</span>
        </div>

        {job.postedBy && (
          <div>
            <span className={styles.metaLabel}>Posted by:</span>{' '}
            <span>{job.postedBy.name || job.postedBy.email}</span>
          </div>
        )}
      </div>

            <div className={styles.jobActions}>
        <button className={styles.applyButton} onClick={handleApplyClick}>
          Apply Now
        </button>



        <div className={styles.secondaryActions}>
          {showBookmarkOption && (
            <button
              className={`${styles.bookmarkButton} ${
                isBookmarked ? styles.bookmarked : ''
              }`}
              onClick={handleBookmark}
              disabled={bookmarkLoading}
            >
              {isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
            </button>
          )}

          <button
            className={styles.commentToggle}
            onClick={() => onToggleComments(job._id)}
          >
            <FaComment /> {showComments ? 'Hide Comments' : 'Show Comments'}
          </button>
        </div>
      </div>

      {showComments && (
        <div className={styles.commentsSection}>
          <div className={styles.commentsList}>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment._id} className={styles.comment}>
                  <div className={styles.commentHeader}>
                    <div className={styles.userInfo}>
                      {comment.author?.avatar ? (
                        <img
                          src={comment.author.avatar}
                          alt={comment.author.name || comment.author.email}
                          className={styles.userAvatar}
                        />
                      ) : (
                        <div className={styles.avatarPlaceholder}>
                          {comment.author?.name?.charAt(0) ||
                            comment.author?.email?.charAt(0) ||
                            'U'}
                        </div>
                      )}
                      <div>
                        {comment.author?.name ? (
                          <strong className={styles.userName}>
                            {comment.author.name}
                          </strong>
                        ) : (
                          <>
                            <strong className={styles.userName}>Anonymous</strong>
                            <span className={styles.userEmail}>
                              {comment.author?.email}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <span className={styles.commentDate}>
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className={styles.commentText}>{comment.text}</p>
                </div>
              ))
            ) : (
              <p className={styles.noComments}>
                No comments yet. Be the first to ask a question!
              </p>
            )}
          </div>

          <div className={styles.commentForm}>
            <textarea
              value={commentText}
              onChange={(e) => onCommentInputChange(e.target.value)}
              placeholder="Ask a question or provide clarification..."
              rows={2}
            />
            <button
              onClick={handleCommentSubmitClick}
              disabled={!commentText.trim() || commentLoading}
              className={styles.commentSubmit}
            >
              <FaPaperPlane /> {commentLoading ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [comments, setComments] = useState({});
  const [activeCommentsJobId, setActiveCommentsJobId] = useState(null);
  const [commentInputs, setCommentInputs] = useState({}); // { jobId: 'text' }

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(${process.env.REACT_APP_API_URL}/jobs);
      setJobs(res.data.jobs);
    } catch (err) {
      console.error('Error fetching jobs:', err.message);
    }
  };

  const fetchComments = async (jobId) => {
    try {
      const res = await axios.get(${process.env.REACT_APP_API_URL}/comments/${jobId});
      setComments(prev => ({
        ...prev,
        [jobId]: res.data
      }));
    } catch (err) {
      console.error('Error fetching comments:', err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEmojiClick = (emojiData) => {
    setFormData(prev => ({
      ...prev,
      description: prev.description + emojiData.emoji
    }));
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
      if (filters.skills.length > 0) {
        const jobSkills = job.skills || [];
        const hasMatchingSkill = filters.skills.some(filterSkill =>
          jobSkills.some(jobSkill =>
            jobSkill.toLowerCase().includes(filterSkill.toLowerCase())
          )
        );
        if (!hasMatchingSkill) return false;
      }

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
        ${process.env.REACT_APP_API_URL}/jobs,
        payload,
        { headers: { Authorization: Bearer ${token} } }
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

  const toggleComments = (jobId) => {
    if (activeCommentsJobId === jobId) {
      setActiveCommentsJobId(null);
    } else {
      setActiveCommentsJobId(jobId);
      if (!comments[jobId]) {
        fetchComments(jobId);
      }
    }
  };

  const handleCommentSubmit = async (jobId) => {
    const commentText = commentInputs[jobId]?.trim();
    if (!commentText) return;

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        ${process.env.REACT_APP_API_URL}/comments/${jobId},
        { text: commentText },
        { headers: { Authorization: Bearer ${token} } }
      );

      setComments(prev => ({
        ...prev,
        [jobId]: [...(prev[jobId] || []), res.data]
      }));

      setCommentInputs(prev => ({
        ...prev,
        [jobId]: ''
      }));
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };
  const filteredJobs = filterJobs(jobs);

  return (
    <div className={styles.container}>
      {/* FORM */}
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
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <div className={styles.descriptionWithEmoji}>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
              />
              <button
                type="button"
                onClick={() => setShowEmojiPicker(prev => !prev)}
                className={styles.emojiButton}
              >
                <FaSmile />
              </button>
              {showEmojiPicker && (
                <div className={styles.emojiPickerWrapper}>
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Budget ($)</label>
              <input
                name="budget"
                type="number"
                value={formData.budget}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Skills</label>
              <div className={styles.skillsInputWrapper}>
                {skills.map((skill, index) => (
                  <span key={index} className={styles.skillTag}>
                    {skill}
                    <button type="button" onClick={() => removeSkill(index)}>×</button>
                  </span>
                ))}
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                  placeholder="Type and press Enter"
                />
              </div>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Deadline</label>
            <input
              name="deadline"
              type="date"
              value={formData.deadline}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={styles.submitButton} disabled={submitting}>
            {submitting ? 'Posting...' : 'Post Job'}
          </button>

          {message.text && (
            <p className={${styles.message} ${styles[message.type]}}>
              {message.text}
            </p>
          )}
        </form>
      </div>
      {/* JOB LISTING */}
      <div className={styles.jobsSection}>
        <h2>Posted Jobs</h2>
        {filteredJobs.length === 0 ? (
          <p>No jobs match your filters.</p>
        ) : (
          <div className={styles.jobsGrid}>
            {filteredJobs.map(job => (
              <JobCard
                key={job._id}
                job={job}
                showComments={activeCommentsJobId === job._id}
                onToggleComments={toggleComments}
                comments={comments[job._id] || []}
                onCommentSubmit={() => handleCommentSubmit(job._id)}
                commentText={commentInputs[job._id] || ''}
                onCommentInputChange={(text) =>
                  setCommentInputs(prev => ({ ...prev, [job._id]: text }))
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobPostForm;

