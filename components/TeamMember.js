import React from 'react';
import styles from './TeamMember.module.css';

const TeamMember = ({ member }) => {
  return (
    <div className={styles.teamMember}>
      <div className={styles.memberImageContainer}>
        <img 
          src={member.image} 
          alt={member.name} 
          className={styles.memberImage}
          onError={(e) => {
            e.target.src = '/images/placeholder-avatar.jpg';
          }}
        />
      </div>
      <div className={styles.memberInfo}>
        <h3 className={styles.memberName}>{member.name}</h3>
        <p className={styles.memberRole}>{member.role}</p>
        <p className={styles.memberBio}>{member.bio}</p>
        <div className={styles.socialLinks}>
          <a href="#" aria-label={LinkedIn profile of ${member.name}}>
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#" aria-label={Twitter profile of ${member.name}}>
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" aria-label={GitHub profile of ${member.name}}>
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
