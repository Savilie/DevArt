import React from 'react';
import TeamMemberCard from '../teamMemberCard/TeamMemberCard';
import './teamMembers.css';

const TeamMembers = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'СЕРГЕЙ СУЛАВКО',
      position: 'Топ-менеджер, основатель компании',
      photo: 'sulavko.png' // Замените на реальный путь к изображению
    },
    {
      id: 2,
      name: 'СЕРГЕЙ СУЛАВКО',
      position: 'Топ-менеджер, основатель компании',
      photo: 'sulavko.png'
    },
    {
      id: 3,
      name: 'СЕРГЕЙ СУЛАВКО',
      position: 'Топ-менеджер, основатель компании',
      photo: 'sulavko.png'
    },
    {
      id: 4,
      name: 'СЕРГЕЙ СУЛАВКО',
      position: 'Топ-менеджер, основатель компании',
      photo: 'sulavko.png'
    }
  ];

  return (
    <div className="team-members-container">
      {teamMembers.map(member => (
        <TeamMemberCard 
          key={member.id}
          photo={member.photo} 
          name={member.name} 
          position={member.position} 
        />
      ))}
      
      {/* Индикаторы слайдера (точки) для мобильной версии */}
      <div className="team-slider-indicators">
        <span className="indicator active"></span>
        <span className="indicator"></span>
        <span className="indicator"></span>
      </div>
    </div>
  );
};

export default TeamMembers; 