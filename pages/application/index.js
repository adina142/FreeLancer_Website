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

