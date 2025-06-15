import React from 'react';
import { FaRocket, FaHandshake, FaGlobe, FaChartLine, FaUsers } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import TeamMember from '../../components/TeamMember';
import styles from './about.module.css';

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Adina Khalid',
      role: 'Founder & CEO',
      bio: 'Serial entrepreneur with 10+ years in the gig economy',
      image: 'assests/adina.jpeg'
    },
    {
      id: 2,
      name: 'Wardah Khurram',
      role: 'CTO',
      bio: 'Tech visionary specializing in scalable platforms',
      image: 'assests/wardah.jpeg'
    },
    {
      id: 3,
      name: 'Meerab Afzal',
      role: 'Head of Community',
      bio: 'Passionate about connecting talent with opportunity',
      image: 'assests/meerub.jpeg'
    }
  ];

  const stats = [
    { value: '50,000+', label: 'Freelancers' },
    { value: '15,000+', label: 'Completed Projects' },
    { value: '95%', label: 'Satisfaction Rate' },
    { value: '150+', label: 'Countries' }
  ];

  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>About FreelanceHub</h1>
          <p className={styles.heroSubtitle}>
            Revolutionizing the way businesses and freelancers connect
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <div className={styles.missionGrid}>
            <div className={styles.missionText}>
              <p>
                FreelanceHub is a modern platform designed to connect skilled freelancers with
                businesses looking to hire top talent for their projects. Whether you're a client
                or a freelancer, our platform makes the process seamless, transparent, and efficient.
              </p>
              <p>
                Our mission is to empower individuals by offering remote job opportunities, promoting
                financial independence, and supporting entrepreneurship. We believe in talent without
                borders — anyone, anywhere, can thrive through FreelanceHub.
              </p>
            </div>
            <div className={styles.missionImage}>
              <img src="assests/mission.png" alt="Team working together" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={${styles.section} ${styles.valuesSection}}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Core Values</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <FaRocket className={styles.valueIcon} />
              <h3>Innovation</h3>
              <p>We constantly evolve to provide cutting-edge solutions for the gig economy.</p>
            </div>
            <div className={styles.valueCard}>
              <FaHandshake className={styles.valueIcon} />
              <h3>Trust</h3>
              <p>Transparency and security are at the heart of every transaction.</p>
            </div>
            <div className={styles.valueCard}>
              <FaGlobe className={styles.valueIcon} />
              <h3>Global Reach</h3>
              <p>Connecting talent and opportunity across borders.</p>
            </div>
            <div className={styles.valueCard}>
              <MdSecurity className={styles.valueIcon} />
              <h3>Security</h3>
              <p>Your data and payments are protected with enterprise-grade security.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>By The Numbers</h2>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Meet The Team</h2>
          <p className={styles.sectionSubtitle}>
            The passionate people behind FreelanceHub
          </p>
          <div className={styles.teamGrid}>
            {teamMembers.map(member => (
              <TeamMember key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={${styles.section} ${styles.ctaSection}}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Ready to get started?</h2>
          <p className={styles.ctaText}>
            Join thousands of freelancers and businesses already growing with FreelanceHub
          </p>
          <div className={styles.ctaButtons}>
            <button className={styles.primaryButton}>Join as a Freelancer</button>
            <button className={styles.secondaryButton}>Hire Talent</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
