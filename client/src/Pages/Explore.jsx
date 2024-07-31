import React, { useState, useEffect, useRef } from 'react';
import '../Components/UI/Explore.css';
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import img4 from '../assets/img4.png';
import img5 from '../assets/img5.png';
import img6 from '../assets/img6.png';
import hunger from '../assets/hunger.png';
import Navbaar from '../Components/Navbaar';
import { NavLink } from 'react-router-dom';

const CarouselItem = ({ imgSrc, title, topic, introduceDes, detailTitle, detailDes, showDetail, specifications }) => (
  <div className="item">
    <img src={imgSrc} alt={topic} />
    <div className="introduce">
      <div className="title">{title}</div>
      <div className="topic">{topic}</div>
      <div className="des">{introduceDes}</div>
      <button className="seeMore" onClick={showDetail}>SEE MORE &#8599;</button>
    </div>
    <div className="detail">
      <div className="title">{detailTitle}</div>
      <div className="ddes">{detailDes}</div>
      <div className="specifications">
        <div>
          <p>Across</p>
          <p>{specifications.Across}</p>
        </div>
        <div>
          <p>Donations Raised</p>
          <p>{specifications.dn}</p>
        </div>
        <div>
          <p>Helped</p>
          <p>{specifications.helped}</p>
        </div>
        <div>
          <p>Since</p>
          <p>{specifications.since}</p>
        </div>
      </div>
      <div className="checkout">
        <button>FEEDBACK</button>
        <NavLink to='/donate'>
        <button>DONATE</button></NavLink>
      </div>
    </div>
  </div>
);

const Explore = () => {
  const [items, setItems] = useState([
    { img: hunger, title: "Life-Lab", topic: "Let's make science fun and experiential!", introduce: "Life-Lab has been active in India for over 5 years, conducting pedagogical experiments focused on fun, engagement, conceptual understanding, creativity, innovation, and problem-solving. Our strategy aims to provide science education for all through a threefold approach.", detail: "When scientific illiteracy prevails, it deepens inequity and limits informed decision-making. Science education is crucial for personal growth. Life-Lab has been advancing science education in India for over 5 years with engaging and innovative methods, focusing on fun, creativity, and problem-solving.", specifications: { Across: "11 States", dn: "10 Lakhs", helped: "65000 children", since: "2000"} },
    { img: img2, title: "DESIGN SLIDER", topic: "Airpod", introduce: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, laborum cumque dignissimos quidem atque et eligendi aperiam voluptates beatae maxime.", detail: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, reiciendis suscipit nobis nulla animi, modi explicabo quod corrupti impedit illo, accusantium in eaque nam quia adipisci aut distinctio porro eligendi. Reprehenderit nostrum consequuntur ea! Accusamus architecto dolores modi ducimus facilis quas voluptatibus! Tempora ratione accusantium magnam nulla tenetur autem beatae.", specifications: { Across: "6 hours", dn: "Type-C", helped: "Android", since: "5.3" } },
    { img: img3, title: "DESIGN SLIDER", topic: "Airpod", introduce: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, laborum cumque dignissimos quidem atque et eligendi aperiam voluptates beatae maxime.", detail: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, reiciendis suscipit nobis nulla animi, modi explicabo quod corrupti impedit illo, accusantium in eaque nam quia adipisci aut distinctio porro eligendi. Reprehenderit nostrum consequuntur ea! Accusamus architecto dolores modi ducimus facilis quas voluptatibus! Tempora ratione accusantium magnam nulla tenetur autem beatae.", specifications: { Across: "6 hours", dn: "Type-C", helped: "Android", since: "5.3" } },
    { img: img4, title: "DESIGN SLIDER", topic: "Airpod", introduce: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, laborum cumque dignissimos quidem atque et eligendi aperiam voluptates beatae maxime.", detail: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, reiciendis suscipit nobis nulla animi, modi explicabo quod corrupti impedit illo, accusantium in eaque nam quia adipisci aut distinctio porro eligendi. Reprehenderit nostrum consequuntur ea! Accusamus architecto dolores modi ducimus facilis quas voluptatibus! Tempora ratione accusantium magnam nulla tenetur autem beatae.", specifications: { Across: "6 hours", dn: "Type-C", helped: "Android", since: "5.3" } },
    { img: img5, title: "DESIGN SLIDER", topic: "Airpod", introduce: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, laborum cumque dignissimos quidem atque et eligendi aperiam voluptates beatae maxime.", detail: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, reiciendis suscipit nobis nulla animi, modi explicabo quod corrupti impedit illo, accusantium in eaque nam quia adipisci aut distinctio porro eligendi. Reprehenderit nostrum consequuntur ea! Accusamus architecto dolores modi ducimus facilis quas voluptatibus! Tempora ratione accusantium magnam nulla tenetur autem beatae.", specifications: { Across: "6 hours", dn: "Type-C", helped: "Android", since: "5.3"} },
    { img: img6, title: "DESIGN SLIDER", topic: "Airpod", introduce: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, laborum cumque dignissimos quidem atque et eligendi aperiam voluptates beatae maxime.", detail: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, reiciendis suscipit nobis nulla animi, modi explicabo quod corrupti impedit illo, accusantium in eaque nam quia adipisci aut distinctio porro eligendi. Reprehenderit nostrum consequuntur ea! Accusamus architecto dolores modi ducimus facilis quas voluptatibus! Tempora ratione accusantium magnam nulla tenetur autem beatae.", specifications: { Across: "6 hours", dn: "Type-C", helped: "Android", since: "5.3"} }
  ]);

  const [disableButtons, setDisableButtons] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const carouselRef = useRef(null);

  const showSlider = (type) => {
    setDisableButtons(true);

    if (type === 'next') {
      setItems(prevItems => [...prevItems.slice(1), prevItems[0]]);
    } else {
      setItems(prevItems => [prevItems[prevItems.length - 1], ...prevItems.slice(0, prevItems.length - 1)]);
    }

    setTimeout(() => {
      setDisableButtons(false);
    }, 2000);
  };

  useEffect(() => {
    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');
    const backButton = document.getElementById('back');

    nextButton.onclick = () => showSlider('next');
    prevButton.onclick = () => showSlider('prev');
    backButton.onclick = () => setShowDetail(false);

    return () => {
      nextButton.onclick = null;
      prevButton.onclick = null;
      backButton.onclick = null;
    };
  }, []);

  return (
    <div>
      <Navbaar />
      <div>
        <div className={`carousel ${showDetail ? 'showDetail' : ''}`} ref={carouselRef}>
          <div className="list">
            {items.map((item, index) => (
              <CarouselItem
                key={index}
                imgSrc={item.img}
                title={item.title}
                topic={item.topic}
                introduceDes={item.introduce}
                detailTitle={item.topic}
                detailDes={item.detail}
                showDetail={() => setShowDetail(true)}
                specifications={item.specifications} // Pass specifications to CarouselItem
              />
            ))}
          </div>
          <div className="arrows">
            <button id="prev">&lt;</button>
            <button id="next">&gt;</button>
            <button id="back">See All &#8599;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
