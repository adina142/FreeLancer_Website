import React, { useState } from 'react';
import styles from './application.module.css';

const Application = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    coverLetter: '',
    resume: null
  });

  const [message, setMessage] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('coverLetter', form.coverLetter);
    if (form.resume) formData.append('resume', form.resume);

    try {
      const res = await fetch(${process.env.REACT_APP_API_URL}/applications, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to submit application.');

      setMessage({ 
        text: 'Application submitted successfully!', 
        type: 'success' 
      });
      setForm({ name: '', email: '', coverLetter: '', resume: null });
    } catch (err) {
      setMessage({ 
        text: 'There was an error submitting your application.', 
        type: 'error' 
      });
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Job Application</h2>
        <p className={styles.subtitle}>Complete the form below to apply for this position</p>
      </div>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label}>Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={styles.input}
            placeholder="John Doe"
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Email Address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={styles.input}
            placeholder="john@example.com"
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Cover Letter</label>
          <textarea
            name="coverLetter"
            value={form.coverLetter}
            onChange={handleChange}
            className={styles.textarea}
            rows="6"
            placeholder="Tell us why you'd be a great fit for this position..."
            required
          ></textarea>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Resume (PDF, max 5MB)</label>
          <div className={styles.fileInputContainer}>
            <input
              type="file"
              name="resume"
              accept=".pdf"
              onChange={handleChange}
              className={styles.fileInput}
              required
            />
            <div className={styles.fileInputLabel}>
              {form.resume ? form.resume.name : 'Choose file...'}
            </div>
            <button type="button" className={styles.fileInputButton}>
              Browse
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          className={styles.submitBtn}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className={styles.spinner}></span>
          ) : (
            'Submit Application'
          )}
        </button>

        {message.text && (
          <div className={${styles.message} ${styles[message.type]}}>
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
};

export default Application;

