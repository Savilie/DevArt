import React from 'react';
import './teamMemberCard.css';

const TeamMemberCard = ({ photo, name, position }) => {
  return (
    <div className="team-member-card">
      <div className="team-member-photo">
        <img src={photo} alt={`${name} - ${position}`} />
      </div>
      <div className="team-member-info">
        <h3 className="team-member-name">{name}</h3>
        <p className="team-member-position">{position}</p>
      </div>
    </div>
  );
};

export default TeamMemberCard; 