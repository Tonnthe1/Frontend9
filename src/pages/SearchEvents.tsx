import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchEvents.module.css";
import { getEvents } from '../services/api';

// Define the Event interface
interface Event {
  _id: string;
  name: string;
  date: string;
  address: string;
  access: string;
}

const SearchEvents: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const fetchedEvents = await getEvents();
      setEvents(fetchedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const filteredEvents = events.filter(event => 
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onFrameClick = useCallback(() => {
    const anchor = document.querySelector(
      "[data-scroll-to='searchEventsText']"
    );
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const onHomeClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onLinkContainerClick = useCallback(() => {
    navigate("/create-event");
  }, [navigate]);

  const onEventContainerClick = useCallback((eventId: string) => {
    navigate(`/event/${eventId}`);
  }, [navigate]);

  return (
    <div className={styles.searchEvents}>
      <div className={styles.topBar}>
        <div className={styles.backToTop}>
          <button className={styles.frame} onClick={onFrameClick} />
          <b className={styles.backToTop1}>Back to top</b>
          <button className={styles.home} onClick={onHomeClick} />
          <b className={styles.home1}>Home</b>
        </div>
        <b className={styles.searchEvents1} data-scroll-to="searchEventsText">
          Search Event
        </b>
      </div>
      <div className={styles.searchBox}>
        <div className={styles.frame1} />
        <input 
          className={styles.search} 
          placeholder="Search..." 
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className={styles.link} onClick={onLinkContainerClick}>
        <button className={styles.cantFindYour}>
          Can't find your event? Create it here!
        </button>
      </div>
      {filteredEvents.map((event, index) => (
        <div key={index} className={styles.event1} onClick={() => onEventContainerClick(event._id)}>
          <div className={styles.event1Child} />
          <div className={styles.container}>
            <div className={styles.wednesdayJune05}>
              {new Date(event.date).toLocaleString()}
            </div>
            <div className={styles.addressWrapper}>
              <div className={styles.address}>{event.address}</div>
            </div>
            <div className={styles.access}>{event.access}</div>
            <div className={styles.nameOfEvent}>
              <b className={styles.address}>{event.name}</b>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchEvents;