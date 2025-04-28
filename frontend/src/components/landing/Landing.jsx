import React, { useEffect } from 'react'
import './landing.css'
import ConsultationBtn from '../consultationBtn/ConsultationBtn'
import Header from '../header/Header'

const Landing = () => {
    useEffect(() => {
        // Код для первого созвездия
        const constellationContainer = document.querySelector('.constellation-container');
        const stars = document.querySelectorAll('.star');

        // Удаляем существующие линии, если они есть
        document.querySelectorAll('.constellation-line').forEach(line => line.remove());

        // Функция для создания линий
        function createLine(star1, star2, index) {
            const line = document.createElement('div');
            line.className = 'constellation-line';
            line.id = `line-${index}`;

            // Получаем координаты центров звезд
            const x1 = star1.offsetLeft + star1.offsetWidth / 2;
            const y1 = star1.offsetTop + star1.offsetHeight / 2;
            const x2 = star2.offsetLeft + star2.offsetWidth / 2;
            const y2 = star2.offsetTop + star2.offsetHeight / 2;

            // Вычисляем длину и угол линии
            const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

            // Устанавливаем свойства линии
            line.style.width = `${length}px`;
            line.style.left = `${x1}px`;
            line.style.top = `${y1}px`;
            line.style.transform = `rotate(${angle}deg)`;
            line.style.transformOrigin = '0 0';

            // Сохраняем координаты начала и конца линии для дальнейших вычислений
            line.dataset.x1 = x1;
            line.dataset.y1 = y1;
            line.dataset.x2 = x2;
            line.dataset.y2 = y2;

            // Добавляем линию в контейнер
            constellationContainer.appendChild(line);
            return line;
        }

        // Создаем линии между звездами в порядке, который образует правильное созвездие
        const lines = [];

        // Основные линии созвездия
        lines.push(createLine(stars[0], stars[2], 0)); // Соединяем 1 и 3
        lines.push(createLine(stars[2], stars[1], 1)); // Соединяем 3 и 2
        // lines.push(createLine(stars[2], stars[3], 2)); // Соединяем 3 и 4
        lines.push(createLine(stars[3], stars[4], 3)); // Соединяем 4 и 5
        lines.push(createLine(stars[0], stars[1], 4)); // Соединяем 1 и 2
        // lines.push(createLine(stars[1], stars[4], 5)); // Соединяем 2 и 5
        lines.push(createLine(stars[2], stars[4], 6)); // Соединяем 3 (центральную) и 5 (крайнюю)

        console.log(`Created ${lines.length} lines for constellation`);

        // Функция для вычисления расстояния от точки до линии
        function distanceFromPointToLine(px, py, x1, y1, x2, y2) {
            // Длина линии
            const lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

            // Если длина линии равна нулю, возвращаем расстояние до точки
            if (lineLength === 0) return Math.sqrt(Math.pow(px - x1, 2) + Math.pow(py - y1, 2));

            // Проекция точки на линию
            const t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / (lineLength * lineLength);

            // Ограничиваем значение t в пределах [0, 1]
            const tClamped = Math.max(0, Math.min(1, t));

            // Находим ближайшую точку на линии
            const closestX = x1 + tClamped * (x2 - x1);
            const closestY = y1 + tClamped * (y2 - y1);

            // Возвращаем расстояние до ближайшей точки
            return Math.sqrt(Math.pow(px - closestX, 2) + Math.pow(py - closestY, 2));
        }

        // Функция для управления видимостью линий в зависимости от расстояния
        function updateLinesVisibility(container, lines, mouseX, mouseY, edgeFactor = 1) {
            const radius = 400; // Увеличенный радиус видимости линий вокруг курсора

            lines.forEach(line => {
                const x1 = parseFloat(line.dataset.x1);
                const y1 = parseFloat(line.dataset.y1);
                const x2 = parseFloat(line.dataset.x2);
                const y2 = parseFloat(line.dataset.y2);

                // Вычисляем расстояние от курсора до линии
                const distance = distanceFromPointToLine(mouseX, mouseY, x1, y1, x2, y2);

                // Если расстояние меньше радиуса, показываем линию с плавным затуханием
                if (distance <= radius) {
                    // Вычисляем прозрачность в зависимости от расстояния с учетом дополнительного фактора затухания
                    const opacity = (1 - distance / radius) * edgeFactor;
                    line.style.opacity = opacity;
                    // if (opacity > 0.5) {
                    //     line.classList.add('active');
                    // } else {
                    //     line.classList.remove('active');
                    // }
                } else {
                    // Плавно скрываем линию
                    line.classList.remove('active');
                    line.style.opacity = 0;
                }
            });
        }

        // Отслеживаем движение мыши внутри контейнера
        constellationContainer.addEventListener('mousemove', function (event) {
            // Получаем координаты курсора относительно контейнера
            const containerRect = constellationContainer.getBoundingClientRect();
            const mouseX = event.clientX - containerRect.left;
            const mouseY = event.clientY - containerRect.top;

            updateLinesVisibility(constellationContainer, lines, mouseX, mouseY);
        });

        // Отслеживаем движение мыши также во всем документе для реакции на приближение к созвездию
        document.addEventListener('mousemove', function (event) {
            const containerRect = constellationContainer.getBoundingClientRect();

            // Вычисляем относительные координаты курсора к контейнеру
            const mouseX = event.clientX - containerRect.left;
            const mouseY = event.clientY - containerRect.top;

            // Создаем небольшой буфер для более плавного перехода
            const bufferDistance = 50;

            // Проверяем, находится ли курсор в диапазоне +/- 300px от контейнера
            if (mouseX >= -400 && mouseX <= containerRect.width + 400 &&
                mouseY >= -400 && mouseY <= containerRect.height + 400) {

                // Дополнительный коэффициент затухания для краев
                let edgeFactor = 1;

                // Если курсор находится рядом с границей контейнера, применяем дополнительное затухание
                if (mouseY > containerRect.height || mouseY < 0) {
                    // Вычисляем, насколько далеко за границей контейнера находится курсор
                    const distanceFromEdge = mouseY > containerRect.height ?
                        mouseY - containerRect.height : -mouseY;

                    // Применяем плавное затухание на границе с буфером
                    if (distanceFromEdge < bufferDistance) {
                        edgeFactor = 1 - (distanceFromEdge / bufferDistance);
                    }
                }

                // Обновляем видимость с учетом дополнительного затухания
                updateLinesVisibility(constellationContainer, lines, mouseX, mouseY, edgeFactor);
            } else {
                // Если курсор далеко от контейнера, скрываем все линии плавно
                lines.forEach(line => {
                    line.classList.remove('active');
                    // Плавно уменьшаем прозрачность
                    line.style.opacity = 0;
                });
            }

            // Проверяем также взаимодействие со вторым созвездием
            handleUrsaMinorInteraction(event);
        });

        // При уходе мыши из контейнера, скрываем все линии
        constellationContainer.addEventListener('mouseleave', function () {
            lines.forEach(line => {
                line.classList.remove('active');
                line.style.opacity = 0;
            });
        });

        // Также обрабатываем наведение на звезды для более точного эффекта
        stars.forEach(star => {
            star.addEventListener('mouseenter', function () {
                const starRect = star.getBoundingClientRect();
                const containerRect = constellationContainer.getBoundingClientRect();

                // Координаты центра звезды относительно контейнера
                const starX = starRect.left - containerRect.left + star.offsetWidth / 2;
                const starY = starRect.top - containerRect.top + star.offsetHeight / 2;

                // Обновляем видимость линий относительно звезды
                updateLinesVisibility(constellationContainer, lines, starX, starY);
            });
        });

        // Код для созвездия Малой Медведицы
        const ursaMinorContainer = document.querySelector('.ursa-minor-container');
        const ursaMinorStars = document.querySelectorAll('.ursa-minor-star');

        // Удаляем существующие линии, если они есть
        document.querySelectorAll('.ursa-minor-line').forEach(line => line.remove());

        // Функция для создания линий для Малой Медведицы
        function createUrsaMinorLine(star1, star2, index) {
            const line = document.createElement('div');
            line.className = 'constellation-line ursa-minor-line';
            line.id = `ursa-minor-line-${index}`;

            // Получаем координаты центров звезд
            const x1 = star1.offsetLeft + star1.offsetWidth / 2;
            const y1 = star1.offsetTop + star1.offsetHeight / 2;
            const x2 = star2.offsetLeft + star2.offsetWidth / 2;
            const y2 = star2.offsetTop + star2.offsetHeight / 2;

            // Вычисляем длину и угол линии
            const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

            // Устанавливаем свойства линии
            line.style.width = `${length}px`;
            line.style.left = `${x1}px`;
            line.style.top = `${y1}px`;
            line.style.transform = `rotate(${angle}deg)`;
            line.style.transformOrigin = '0 0';

            // Сохраняем координаты начала и конца линии для дальнейших вычислений
            line.dataset.x1 = x1;
            line.dataset.y1 = y1;
            line.dataset.x2 = x2;
            line.dataset.y2 = y2;

            // Добавляем линию в контейнер
            ursaMinorContainer.appendChild(line);
            return line;
        }

        // Создаем линии между звездами в порядке, соответствующем Малой Медведице
        const ursaMinorLines = [];

        // Создаем "ковш" Малой Медведицы
        ursaMinorLines.push(createUrsaMinorLine(ursaMinorStars[0], ursaMinorStars[1], 0)); // Полярная к звезде 2
        ursaMinorLines.push(createUrsaMinorLine(ursaMinorStars[0], ursaMinorStars[3], 0)); // Полярная к звезде 2
        ursaMinorLines.push(createUrsaMinorLine(ursaMinorStars[1], ursaMinorStars[2], 1)); // 2 к 3
        ursaMinorLines.push(createUrsaMinorLine(ursaMinorStars[2], ursaMinorStars[3], 2)); // 3 к 4
        ursaMinorLines.push(createUrsaMinorLine(ursaMinorStars[3], ursaMinorStars[4], 3)); // 4 к 5
        ursaMinorLines.push(createUrsaMinorLine(ursaMinorStars[4], ursaMinorStars[5], 4)); // 5 к 6

        console.log(`Created ${ursaMinorLines.length} lines for Ursa Minor constellation`);

        // Обрабатываем взаимодействие с созвездием Малой Медведицы
        function handleUrsaMinorInteraction(event) {
            const containerRect = ursaMinorContainer.getBoundingClientRect();

            // Вычисляем относительные координаты курсора к контейнеру
            const mouseX = event.clientX - containerRect.left;
            const mouseY = event.clientY - containerRect.top;

            // Создаем небольшой буфер для более плавного перехода
            const bufferDistance = 50;

            // Проверяем, находится ли курсор в диапазоне +/- 400px от контейнера
            if (mouseX >= -400 && mouseX <= containerRect.width + 400 &&
                mouseY >= -400 && mouseY <= containerRect.height + 400) {

                // Дополнительный коэффициент затухания для краев
                let edgeFactor = 1;

                // Если курсор находится рядом с границей контейнера, применяем дополнительное затухание
                if (mouseY > containerRect.height || mouseY < 0) {
                    // Вычисляем, насколько далеко за границей контейнера находится курсор
                    const distanceFromEdge = mouseY > containerRect.height ?
                        mouseY - containerRect.height : -mouseY;

                    // Применяем плавное затухание на границе с буфером
                    if (distanceFromEdge < bufferDistance) {
                        edgeFactor = 1 - (distanceFromEdge / bufferDistance);
                    }
                }

                // Обновляем видимость с учетом дополнительного затухания
                updateLinesVisibility(ursaMinorContainer, ursaMinorLines, mouseX, mouseY, edgeFactor);
            } else {
                // Если курсор далеко от контейнера, скрываем все линии плавно
                ursaMinorLines.forEach(line => {
                    line.classList.remove('active');
                    line.style.opacity = 0;
                });
            }
        }

        // Отслеживаем движение мыши внутри контейнера Малой Медведицы
        ursaMinorContainer.addEventListener('mousemove', function (event) {
            // Получаем координаты курсора относительно контейнера
            const containerRect = ursaMinorContainer.getBoundingClientRect();
            const mouseX = event.clientX - containerRect.left;
            const mouseY = event.clientY - containerRect.top;

            updateLinesVisibility(ursaMinorContainer, ursaMinorLines, mouseX, mouseY);
        });

        // При уходе мыши из контейнера Малой Медведицы, скрываем все линии
        ursaMinorContainer.addEventListener('mouseleave', function () {
            ursaMinorLines.forEach(line => {
                line.classList.remove('active');
                line.style.opacity = 0;
            });
        });

        // Также обрабатываем наведение на звезды Малой Медведицы
        ursaMinorStars.forEach(star => {
            star.addEventListener('mouseenter', function () {
                const starRect = star.getBoundingClientRect();
                const containerRect = ursaMinorContainer.getBoundingClientRect();

                // Координаты центра звезды относительно контейнера
                const starX = starRect.left - containerRect.left + star.offsetWidth / 2;
                const starY = starRect.top - containerRect.top + star.offsetHeight / 2;

                // Обновляем видимость линий относительно звезды
                updateLinesVisibility(ursaMinorContainer, ursaMinorLines, starX, starY);
            });
        });

        // Добавляем обработку свечения текста
        const bigText = document.querySelector('.landing-text');
        const highlightLayer = document.querySelector('.landing-text-highlight');

        document.addEventListener('mousemove', function (event) {
            const textRect = bigText.getBoundingClientRect();

            // Получаем позицию курсора относительно текста
            const x = event.clientX - textRect.left;
            const y = event.clientY - textRect.top;

            // Обновляем позицию и размер радиального градиента
            const radius = 600;
            const gradientValue = `circle ${radius}px at ${x}px ${y}px`;

            highlightLayer.style.webkitMaskImage = `radial-gradient(${gradientValue}, black 0%, transparent 100%)`;
            highlightLayer.style.maskImage = `radial-gradient(${gradientValue}, black 0%, transparent 100%)`;
        });

        // Добавляем обработку свечения разделителя
        const dividerContainer = document.querySelector('.divider-container');
        const dividerLine = document.querySelector('.divider-line');
        const dividerLineHighlight = document.querySelector('.divider-line-highlight');
        const dividerStar = document.querySelector('.divider-star-image');
        const HOVER_RADIUS = 300; // Радиус действия эффекта в пикселях

        document.addEventListener('mousemove', (e) => {
            const rect = dividerContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Расстояние от курсора до линии (только по вертикали)
            const distanceY = Math.abs(y - rect.height / 2);

            // Управление подсветкой линии и звезды
            if (distanceY <= HOVER_RADIUS) {
                const xPercentage = (x / rect.width) * 100;
                dividerLineHighlight.style.opacity = '1';
                dividerLineHighlight.style.webkitMaskImage = `radial-gradient(circle ${HOVER_RADIUS}px at ${xPercentage}% 50%, white 0%, transparent 100%)`;
                dividerLineHighlight.style.maskImage = `radial-gradient(circle ${HOVER_RADIUS}px at ${xPercentage}% 50%, white 0%, transparent 100%)`;

                // Проверяем расстояние до звезды для её подсветки
                const centerX = rect.width / 2;
                const distanceToStar = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - rect.height / 2, 2));

                if (distanceToStar <= HOVER_RADIUS) {
                    // Добавляем тени для звезды
                    dividerStar.style.filter = `
                    drop-shadow(0 0 0.336px rgba(255, 255, 255, 0.8))
                    drop-shadow(0 0 0.672px rgba(255, 255, 255, 0.8))
                    drop-shadow(0 0 2.352px rgba(255, 255, 255, 0.6))
                    drop-shadow(0 0 3px rgba(255, 255, 255, 0.5))
                    drop-shadow(0 0 5px rgba(255, 255, 255, 0.4))
                    drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))
                `;
                } else {
                    dividerStar.style.filter = `
                    drop-shadow(0 0 0.336px rgba(255, 255, 255, 0))
                    drop-shadow(0 0 0.672px rgba(255, 255, 255, 0))
                    drop-shadow(0 0 2.352px rgba(255, 255, 255, 0))
                    drop-shadow(0 0 3px rgba(255, 255, 255, 0))
                    drop-shadow(0 0 5px rgba(255, 255, 255, 0))
                    drop-shadow(0 0 10px rgba(255, 255, 255, 0))
                `;
                }
            } else {
                dividerLineHighlight.style.opacity = '0';
                dividerStar.style.filter = `
                drop-shadow(0 0 0.336px rgba(255, 255, 255, 0))
                drop-shadow(0 0 0.672px rgba(255, 255, 255, 0))
                drop-shadow(0 0 2.352px rgba(255, 255, 255, 0))
                drop-shadow(0 0 3px rgba(255, 255, 255, 0))
                drop-shadow(0 0 5px rgba(255, 255, 255, 0))
                drop-shadow(0 0 10px rgba(255, 255, 255, 0))
            `;
            }
        });
    }, []);

    return (
        <section className='landing'>
                <Header theme={true} />
            <div className="container">
                <div className="landing__inner">
                    <div className="constellations">
                        <div className="ursa-minor-container">
                            <div className="ursa-minor-star ursa-minor-star-1"></div>
                            <div className="ursa-minor-star ursa-minor-star-2"></div>
                            <div className="ursa-minor-star ursa-minor-star-3"></div>
                            <div className="ursa-minor-star ursa-minor-star-4"></div>
                            <div className="ursa-minor-star ursa-minor-star-5"></div>
                            <div className="ursa-minor-star ursa-minor-star-6"></div>
                        </div>
                        <div className="constellation-container">
                            <div className="star star-1"></div>
                            <div className="star star-2"></div>
                            <div className="star star-3"></div>
                            <div className="star star-4"></div>
                            <div className="star star-5"></div>
                        </div>
                    </div>
                    <div className="landing-main">
                        <div className="landing-content">
                            <h1 className='landing-text'>Разработаем <br /> ваш <span className="purple-text">vr/ar</span> <br /> проект</h1>
                            <h1 className='landing-text-highlight'>Разработаем <br /> ваш <span className="purple-text">vr/ar</span> <br /> проект</h1>
                        </div>
                        <div className="landing-image">
                            {/* <img src="vr-background.svg" alt=""/>
                  <img src="vr-glasses.svg" alt=""/> */}
                            <img src="vr-glasses-block.png" alt="Glasses" />
                        </div>
                    </div>

                    <div className="divider-container">
                        <div className="divider-line"></div>
                        <div className="divider-line-highlight"></div>
                        <div className="divider-star">
                            <img src="star.svg" alt="star" className="divider-star-image" />
                        </div>
                    </div>
                    <div className="consultation-container">
                        <div className="consultation-text">
                            <p>Открываем возможности создания уникального опыта в играх, обучении, медицине, архитектуре и многих других областях.</p>
                            <ConsultationBtn onClick={() => console.log("Clicked")} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Landing
