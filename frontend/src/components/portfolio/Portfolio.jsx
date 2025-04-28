import React, { useState, useEffect } from 'react';
import InfoCard from '../../components/infoCard/InfoCard';
import Header from '../../components/header/Header';
import InfoCardSlider from '../../components/infoCardSlider/InfoCardSlider';
import TeamMembers from '../../components/teamMembers/TeamMembers';
import Cases from '../../components/Cases/Cases';
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

    const teamMembers = [
        {
            id: 1,
            name: 'СЕРГЕЙ СУЛАВКО',
            position: 'Топ-менеджер, основатель компании',
            photo: 'sulavko.png'
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
        },
    ]

    const cases = [
        { id: 1, src: "https://www.youtube.com/watch?v=vjBrN18wiuE", title: "Кейс 1" },
        { id: 2, src: "https://www.youtube.com/watch?v=vjBrN18wiuE", title: "Кейс 2" },
        { id: 3, src: "https://www.youtube.com/watch?v=vjBrN18wiuE", title: "Кейс 3" },
      ];

    return (
        <div className='portfolio-page'>

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
                        <div className="portfolio-team-members-cards">
                            <TeamMembers teamMembers={teamMembers}/>
                        </div>
                    </div>

                    <div className="portfolio-cases">
                        <Cases cases={cases}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Portfolio
