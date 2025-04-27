import React, { useState, useEffect } from 'react';
import InfoCard from '../../components/infoCard/InfoCard';
import Header from '../../components/header/Header';
import InfoCardSlider from '../../components/infoCardSlider/InfoCardSlider';
import TeamMembers from '../../components/teamMembers/TeamMembers';
import './portfolio.css';

const Portfolio = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const infoCards = [
        {
            image: "binoculars.svg",
            text: "Вы и ваш клиент можете увидить проект прямо перед вашими глазами ещё до того, как он будет закончен"
        },
        {
            image: "handshake.svg",
            text: "Отличная возможность выделиться среди конкурентов, в мире постоянной диджитализации для кого-то проект в vr может оказаться решающим для закрытия сделки."
        },
        {
            image: "sofa.svg",
            text: "Можно очутиться в дизайнерском интерьере не выходя из дома и осмотреть каждый уголок"
        }
    ];

    return (
        <div className='portfolio-page'>
            <div className='background-blur'></div>
            <Header theme={true} />
            <div className="container">
                <div className="portfolio-inner">
                    <div className="portfolio-information">
                        <h2 className='portfolio-big-text'>почему vr становится популярнее<br /> в бизнесе?</h2>

                        {isMobile ? (
                            <InfoCardSlider cards={infoCards} />
                        ) : (
                            <div className="portfolio-info-cards">
                                {infoCards.map((card, index) => (
                                    <InfoCard key={index} image={card.image} text={card.text} />
                                ))}
                            </div>
                        )
                        }
                    </div>


                    <div className="portfolio-team-members">
                        <h2 className='portfolio-team-big-text'>
                            Наша команда
                        </h2>

                        <TeamMembers/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Portfolio
