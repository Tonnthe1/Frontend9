import React, { FunctionComponent, useCallback, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateEvent.module.css";
import { createEvent } from "../services/api";
import axios from 'axios';
import CustomAlert from "../components/CustomAlert";

const CreateEvent: FunctionComponent = () => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    name: "",
    address: "",
    date: "",
    time: "",
    eventType: "",
    onlineSync: false,
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [showEventTypePicker, setShowEventTypePicker] = useState(false);
  const [alert, setAlert] = useState<{ type: 'error' | 'success'; title: string; message: string } | null>(null);
  const [tempDateTime, setTempDateTime] = useState({ date: "", time: "" });

  const dateTimeRef = useRef<HTMLDivElement>(null);
  const eventTypeRef = useRef<HTMLDivElement>(null);

  const eventTypes = ["Business", "Entertainment", "Education", "Social", "Other"];

  const onBackToEventClick = useCallback(() => {
    navigate("/search-events");
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempDateTime(prev => ({ ...prev, [name]: value }));
  };

  const confirmDateTime = () => {
    setEventData(prev => ({ 
      ...prev, 
      date: tempDateTime.date, 
      time: tempDateTime.time 
    }));
    setShowDateTimePicker(false);
  };

  const handleEventTypeSelect = (type: string) => {
    setEventData(prev => ({ ...prev, eventType: type }));
    setShowEventTypePicker(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  const toggleOnlineSync = () => {
    setEventData(prev => ({ ...prev, onlineSync: !prev.onlineSync }));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      Object.entries(eventData).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });
      if (coverImage) {
        formData.append('coverImage', coverImage);
      }
      await createEvent(formData);
      setAlert({ type: 'success', title: 'Success', message: 'Event created successfully' });
      setTimeout(() => navigate('/search-events'), 2000);
    } catch (error) {
      console.error('Error creating event:', error);
      if (axios.isAxiosError(error) && error.response) {
        setAlert({ type: 'error', title: 'Error', message: error.response.data.message || "An error occurred while creating the event." });
      } else {
        setAlert({ type: 'error', title: 'Error', message: "An unexpected error occurred." });
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dateTimeRef.current && !dateTimeRef.current.contains(event.target as Node)) {
        setShowDateTimePicker(false);
      }
      if (eventTypeRef.current && !eventTypeRef.current.contains(event.target as Node)) {
        setShowEventTypePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.createEvent}>
      <b className={styles.createEvent1}>Create Event</b>
      <button className={styles.backToEvent} onClick={onBackToEventClick}>
        <div className={styles.home} />
        <b className={styles.home1}>Back to Events</b>
      </button>
      <div className={styles.eventName}>
        <input
          className={styles.eventName1}
          placeholder="Event Name"
          type="text"
          name="name"
          value={eventData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.eventAddress}>
        <input
          className={styles.eventAddress1}
          placeholder="Event Address"
          type="text"
          name="address"
          value={eventData.address}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.eventTimeWrapper} ref={dateTimeRef}>
        <button className={styles.eventTime} onClick={() => setShowDateTimePicker(!showDateTimePicker)}>
          <div className={styles.buttonContent}>
            {eventData.date && eventData.time ? `${eventData.date} ${eventData.time}` : "Event Time"}
          </div>
        </button>
        {showDateTimePicker && (
          <div className={styles.popOutPicker}>
            <input
              type="date"
              name="date"
              value={tempDateTime.date}
              onChange={handleDateTimeChange}
              className={styles.centeredInput}
            />
            <input
              type="time"
              name="time"
              value={tempDateTime.time}
              onChange={handleDateTimeChange}
              className={styles.centeredInput}
            />
            <button onClick={confirmDateTime} className={styles.confirmButton}>Confirm</button>
          </div>
        )}
      </div>
      <div className={styles.eventTypeWrapper} ref={eventTypeRef}>
        <button className={styles.eventType} onClick={() => setShowEventTypePicker(!showEventTypePicker)}>
          <div className={styles.eventType1}>{eventData.eventType || "Event Type"}</div>
        </button>
        {showEventTypePicker && (
          <div className={styles.popOutPicker}>
            {eventTypes.map((type) => (
              <div key={type} onClick={() => handleEventTypeSelect(type)}>{type}</div>
            ))}
          </div>
        )}
      </div>
      <button className={styles.coverImage} onClick={() => document.getElementById('coverImageInput')?.click()}>
        <div className={styles.coverImageNon}>Cover Image (Non required)</div>
      </button>
      <input
        id="coverImageInput"
        type="file"
        style={{ display: 'none' }}
        onChange={handleImageChange}
        accept="image/*"
      />
      <div className={styles.onlineEvent}>
        <div className={styles.onlineSync}>Online Sync</div>
        <div className={styles.toggle} onClick={toggleOnlineSync}>
          <div className={styles.background} style={{ backgroundColor: eventData.onlineSync ? '#4CAF50' : '#ccc' }} />
        </div>
      </div>
      <button className={styles.createEvent2} onClick={handleSubmit}>
        <div className={styles.createEvent3}>Create Event</div>
      </button>
      {alert && (
        <CustomAlert
          type={alert.type}
          title={alert.title}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
    </div>
  );
};

export default CreateEvent;