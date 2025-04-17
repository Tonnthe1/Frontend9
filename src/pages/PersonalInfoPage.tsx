import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PersonalInfoPage.module.css";

const PersonalInfoPage: FunctionComponent = () => {
  const navigate = useNavigate();

  const onBackToEventClick = useCallback(() => {
    navigate("/event");
  }, [navigate]);

  return (
    <div className={styles.personalInfoPage}>
      <b className={styles.home}>Personal Info</b>
      <div className={styles.textBox}>
        <div className={styles.displaybox} />
        <div className={styles.displaybox1} />
        <div className={styles.displaybox2} />
        <div className={styles.displaybox3} />
        <div className={styles.displaybox4} />
        <div className={styles.displaybox5} />
        <div className={styles.displaybox6} />
        <div className={styles.displaybox7} />
        <div className={styles.linkedin}>LinkedIn</div>
        <div className={styles.whatsappPhoneNumber}>Whatsapp/ Phone Number</div>
        <div className={styles.instagram}>Instagram</div>
        <div className={styles.twitter}>Twitter</div>
        <div className={styles.github}>Github</div>
        <div className={styles.facebook}>Facebook</div>
        <div className={styles.wechat}>Wechat</div>
        <div className={styles.youtube}>Youtube</div>
        <button className={styles.backToEvent} onClick={onBackToEventClick}>
          <div className={styles.home1} />
          <b className={styles.home2}>Back</b>
        </button>
        <div className={styles.displaybox8} />
        <div className={styles.email}>Email</div>
      </div>
      <img
        className={styles.personalInfoPageChild}
        alt=""
        src="/ellipse-2@2x.png"
      />
    </div>
  );
};

export default PersonalInfoPage;
