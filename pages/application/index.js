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

