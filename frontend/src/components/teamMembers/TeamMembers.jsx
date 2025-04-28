import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import TeamMemberCard from '../teamMemberCard/TeamMemberCard';
import './teamMembers.css';

const TeamMembers = ({ teamMembers }) => {
  const isDesktopSwiper = teamMembers.length > 4;

  return (
    <section>
      <h2 className="team-title">НАША КОМАНДА</h2>
      <Swiper
        modules={[Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: isDesktopSwiper ? 4 : teamMembers.length }
        }}
        style={{ paddingBottom: '40px' }}
      >
        {teamMembers.map((member, idx) => (
          <SwiperSlide key={member.id || idx}>
            <TeamMemberCard {...member} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TeamMembers; 