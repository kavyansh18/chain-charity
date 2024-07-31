import React, { useState, useEffect, useRef } from 'react';
import '../Components/UI/Explore.css';
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import img4 from '../assets/img4.png';
import img5 from '../assets/img5.png';
import img6 from '../assets/img6.png';
import Navbaar from '../Components/Navbaar';

const CarouselItem = ({ imgSrc, title, topic, introduceDes, detailTitle, detailDes, showDetail }) => (
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
      <div className="des">{detailDes}</div>
      <div className="specifications">
        <div>
          <p>Used Time</p>
          <p>6 hours</p>
        </div>
        <div>
          <p>Charging port</p>
          <p>Type-C</p>
        </div>
        <div>
          <p>Compatible</p>
          <p>Android</p>
        </div>
        <div>
          <p>Bluetooth</p>
          <p>5.3</p>
        </div>
        <div>
          <p>Controlled</p>
          <p>Touch</p>
        </div>
      </div>
      <div className="checkout">
        <button>ADD TO CART</button>
        <button>CHECKOUT</button>
      </div>
    </div>
  </div>
);

const Explore = () => {
  const [items, setItems] = useState([
    { img: img1, title: "DESIGN SLIDER", topic: "Airpod", introduce: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, laborum cumque dignissimos quidem atque et eligendi aperiam voluptates beatae maxime.", detail: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, reiciendis suscipit nobis nulla animi, modi explicabo quod corrupti impedit illo, accusantium in eaque nam quia adipisci aut distinctio porro eligendi. Reprehenderit nostrum consequuntur ea! Accusamus architecto dolores modi ducimus facilis quas voluptatibus! Tempora ratione accusantium magnam nulla tenetur autem beatae.", specifications: { usedTime: "6 hours", chargingPort: "Type-C", compatible: "Android", bluetooth: "5.3", controlled: "Touch" } },
    { img: img2, title: "DESIGN SLIDER", topic: "Airpod", introduce: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, laborum cumque dignissimos quidem atque et eligendi aperiam voluptates beatae maxime.", detail: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, reiciendis suscipit nobis nulla animi, modi explicabo quod corrupti impedit illo, accusantium in eaque nam quia adipisci aut distinctio porro eligendi. Reprehenderit nostrum consequuntur ea! Accusamus architecto dolores modi ducimus facilis quas voluptatibus! Tempora ratione accusantium magnam nulla tenetur autem beatae.", specifications: { usedTime: "6 hours", chargingPort: "Type-C", compatible: "Android", bluetooth: "5.3", controlled: "Touch" } },
    { img: img3, title: "DESIGN SLIDER", topic: "Airpod", introduce: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, laborum cumque dignissimos quidem atque et eligendi aperiam voluptates beatae maxime.", detail: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, reiciendis suscipit nobis nulla animi, modi explicabo quod corrupti impedit illo, accusantium in eaque nam quia adipisci aut distinctio porro eligendi. Reprehenderit nostrum consequuntur ea! Accusamus architecto dolores modi ducimus facilis quas voluptatibus! Tempora ratione accusantium magnam nulla tenetur autem beatae.", specifications: { usedTime: "6 hours", chargingPort: "Type-C", compatible: "Android", bluetooth: "5.3", controlled: "Touch" } },
    { img: img4, title: "DESIGN SLIDER", topic: "Airpod", introduce: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, laborum cumque dignissimos quidem atque et eligendi aperiam voluptates beatae maxime.", detail: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, reiciendis suscipit nobis nulla animi, modi explicabo quod corrupti impedit illo, accusantium in eaque nam quia adipisci aut distinctio porro eligendi. Reprehenderit nostrum consequuntur ea! Accusamus architecto dolores modi ducimus facilis quas voluptatibus! Tempora ratione accusantium magnam nulla tenetur autem beatae.", specifications: { usedTime: "6 hours", chargingPort: "Type-C", compatible: "Android", bluetooth: "5.3", controlled: "Touch" } },
    { img: img5, title: "DESIGN SLIDER", topic: "Airpod", introduce: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, laborum cumque dignissimos quidem atque et eligendi aperiam voluptates beatae maxime.", detail: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, reiciendis suscipit nobis nulla animi, modi explicabo quod corrupti impedit illo, accusantium in eaque nam quia adipisci aut distinctio porro eligendi. Reprehenderit nostrum consequuntur ea! Accusamus architecto dolores modi ducimus facilis quas voluptatibus! Tempora ratione accusantium magnam nulla tenetur autem beatae.", specifications: { usedTime: "6 hours", chargingPort: "Type-C", compatible: "Android", bluetooth: "5.3", controlled: "Touch" } },
    { img: img6, title: "DESIGN SLIDER", topic: "Airpod", introduce: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, laborum cumque dignissimos quidem atque et eligendi aperiam voluptates beatae maxime.", detail: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, reiciendis suscipit nobis nulla animi, modi explicabo quod corrupti impedit illo, accusantium in eaque nam quia adipisci aut distinctio porro eligendi. Reprehenderit nostrum consequuntur ea! Accusamus architecto dolores modi ducimus facilis quas voluptatibus! Tempora ratione accusantium magnam nulla tenetur autem beatae.", specifications: { usedTime: "6 hours", chargingPort: "Type-C", compatible: "Android", bluetooth: "5.3", controlled: "Touch" } }
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
      <div>
      <Navbaar />
      </div>
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
