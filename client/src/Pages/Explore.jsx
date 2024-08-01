import React, { useState, useEffect, useRef } from 'react';
import '../Components/UI/Explore.css';
import study from '../assets/study.jpeg';
import we from '../assets/we.jpg';
import hunger from '../assets/hunger.jpeg';
import smile from '../assets/smile.jpeg';
import elder from '../assets/elder.jpeg';
import health from '../assets/health.jpeg';
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
        <a href={specifications.web} target="_blank" rel="noopener noreferrer">
      <button>WEBSITE</button></a>
        <NavLink to='/donate'>
        <button>DONATE</button></NavLink>
        <button>FEEDBACK</button>
      </div>
    </div>
  </div>
);

const Explore = () => {
  const [items, setItems] = useState([
    { img: study, title: "Life-Lab", topic: "Let's make science fun and experiential!", introduce: "Life-Lab has been active in India for over 5 years, conducting pedagogical experiments focused on fun, engagement, conceptual understanding, creativity, innovation, and problem-solving. Our strategy aims to provide science education for all through a threefold approach.", detail: "When scientific illiteracy prevails, it deepens inequity and limits informed decision-making. Science education is crucial for personal growth. Life-Lab has been advancing science education in India for over 5 years with engaging and innovative methods, focusing on fun, creativity, and problem-solving.", specifications: { Across: "11 States", dn: "10 Lakhs", helped: "65000 children", since: "2000",web:"https://life-lab.org/"} },
    { img: we, title: "DESAI FOUNDATION", topic: "NGO", introduce: "Building Resilient Communities andCultivating Dignity", detail: "The Desai Foundation is an organization that empowers women and children through community programming to elevate health, livelihood, and menstrual equity in rural India.Every dollar raised goes directly to programs that change lives for women and girls in rural India. Our staff and infrastructure are supported by the founding endowment from the Desai Family and its Board Members.", specifications: { Across: "8 states", dn: "18 Lakhs", helped: "40000 Womens", since: "2003",web:"https://thedesaifoundation.org/" } },
    { img: hunger, title: "Feeding India", topic: "NGO", introduce: "Feeding India, a Zomato giveback, is a not for profit organization, designing interventions to reduce hunger among underserved communities in India.", detail: "In January 2019, Zomato and Feeding India (registered as Hunger Heroes) collaborated to eradicate hunger and malnutrition in India. All efforts are concerted towards providing better food to more people. Through our targeted interventions for child and maternal malnutrition, we are working towards bringing large-scale systemic transformation in the nutrition landscape of India.", specifications: { Across: "40 cities", dn: "20 lakhs", helped: "16 crores", since: "2006",web:"https://www.feedingindia.org/" } },
    { img: smile, title: "Smile Foundation", topic: "Real Work. Real Change", introduce: "Smile Foundation, founded with enthusiasm and vision, has evolved over the last two decades into a sustainable Indian social institution. Committed to making real on-the-ground changes, Smile works to create an inclusive society and business environment.", detail: "Smile Foundation works as a catalyst in the cycle of change, complementing and supplementing government efforts to achieve the Sustainable Development Goals. We sensitize and partner with like-minded institutions and individuals to implement high-impact programmes that enable access, enhance quality and help bring long term behavioural change at the grassroots.", specifications: { Across: "25 States", dn: "30 lakhs", helped: "15L children", since: "1999",web:"https://www.smilefoundationindia.org/" } },
    { img: elder, title: "DESIGN SLIDER", topic: "Fighting isolation, poverty, neglect", introduce: "HelpAge India, established in 1978, is a non-profit dedicated to improving the quality of life for disadvantaged elderly. It envisions an active, healthy, and dignified life for seniors and was honored with the UN Population Award 2020 for its work in ageing and pandemic relief..", detail: "HelpAge India advocates for the rights of India's elderly, currently 138 million, through 26 State Offices. Its programs focus on healthcare, age care, livelihoods, disaster response, and advocacy. Notable initiatives include mobile healthcare units, cataract surgeries, elder helplines, senior care homes, and elder-self-help groups. HelpAge India actively promotes elder-friendly policies and their implementation. Donations qualify for 50% tax exemption under section 80G of the Income Tax Act, 1961.", specifications: { Across: "21 States", dn: "Type-C", helped: "35L Elders", since: "1994",web:"https://www.helpageindia.org/"} },
    { img: health, title: "Swasth Foundation", topic: "Health NGO", introduce: "Swasth Foundation is a not-for-profit organisation established in 2009 with the vision of Health and Joy for All. Our Mission is to Build an accountable integrated health system with joy.", detail: "Our goal is to build an accountable health system for Mumbai, serving ~30 million people. We run primary health care centers offering free, accessible services to low-income households, reducing their expenses by 50%, and an action research institute developing health interventions, including training Health Coaches. Guided by our motto, Be Healthy, Be Joyful, and core values of empathy, joy, innovation, excellence, fairness, ownership, and change, we provide all services free, with voluntary donations from participants.", specifications: { Across: "19 States", dn: "4 Crores", helped: "10L people", since: "2009",web:"https://www.swasth.org/"} }
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
