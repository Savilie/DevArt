import React, { useState } from "react";
import "./cases.css";
import ReactPlayer from 'react-player';
import { useSwipeable } from "react-swipeable";

const cases = [
  { id: 1, src: "https://www.youtube.com/watch?v=vjBrN18wiuE", title: "Кейс 1" },
  { id: 2, src: "https://www.youtube.com/watch?v=vjBrN18wiuE", title: "Кейс 2" },
  { id: 3, src: "https://www.youtube.com/watch?v=vjBrN18wiuE", title: "Кейс 3" },
];

const Cases = () => {
  const [active, setActive] = useState(1); // индекс центрального видео

  // Получаем индексы для отображения (предыдущее, текущее, следующее)
  const prev = (active - 1 + cases.length) % cases.length;
  const next = (active + 1) % cases.length;

  const handlers = useSwipeable({
    onSwipedLeft: () => setActive((active + 1) % cases.length),
    onSwipedRight: () => setActive((active - 1 + cases.length) % cases.length),
  });

  return (
    <section className="cases-section">
      <h2 className="cases-title">НАШИ КЕЙСЫ</h2>
      <div className="cases-wrapper" {...handlers}>
        <div className="case-video small" onClick={() => setActive(prev)}>
          <ReactPlayer
            url={cases[prev].src}
            playing={false}
            controls={false}
            width="100%"
            height="100%"
            light={true}
          />
        </div>
        <div className="case-video large">
          <ReactPlayer
            url={cases[active].src}
            playing={true}
            controls={true}
            width="100%"
            height="100%"
          />
        </div>
        <div className="case-video small" onClick={() => setActive(next)}>
          <ReactPlayer
            url={cases[next].src}
            playing={false}
            controls={false}
            width="100%"
            height="100%"
            light={true}
          />
        </div>
      </div>
    </section>
  );
};

export default Cases; 