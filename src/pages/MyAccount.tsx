import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyAccount.module.css";

const MyAccount: FunctionComponent = () => {
  const navigate = useNavigate();

  const onBackToHomeClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className={styles.myAccount}>
      <div className={styles.email}>
        <input
          className={styles.emailDisplay}
          placeholder="Email Display"
          type="email"
          width={30}
        />
      </div>
      <button className={styles.newPassword}>
        <input
          className={styles.newPassword1}
          placeholder="New Password"
          type="text"
        />
        <div className={styles.checkMark}>
          <img
            className={styles.checkmark641Icon}
            alt=""
            src="/checkmark64-1@2x.png"
          />
        </div>
      </button>
      <button className={styles.checkMark1}>
        <img
          className={styles.checkmark641Icon}
          alt=""
          src="/checkmark64-1@2x.png"
        />
      </button>
      <button className={styles.backToHome} onClick={onBackToHomeClick}>
        <div className={styles.home} />
        <b className={styles.home1}>Back to Home</b>
      </button>
      <div className={styles.toggleToMake}>
        Toggle to make information public:
      </div>
      <div className={styles.linkedin}>
        <input
          className={styles.instagram}
          placeholder="LinkedIn"
          type="text"
        />
      </div>
      <div className={styles.linkedin2}>
        <input className={styles.instagram} placeholder="Email" type="text" />
      </div>
      <div className={styles.linkedin3}>
        <input
          className={styles.whatsappPhoneNumber}
          placeholder="Whatsapp/ Phone Number"
          type="text"
        />
      </div>
      <div className={styles.linkedin4}>
        <input
          className={styles.instagram}
          placeholder="Instagram"
          type="text"
        />
      </div>
      <div className={styles.linkedin5}>
        <input className={styles.twitter} placeholder="Twitter" type="text" />
      </div>
      <div className={styles.linkedin6}>
        <input className={styles.twitter} placeholder="Github" type="text" />
      </div>
      <div className={styles.linkedin7}>
        <input className={styles.twitter} placeholder="Facebook" type="text" />
      </div>
      <div className={styles.linkedin8}>
        <input className={styles.twitter} placeholder="Wechat" type="text" />
      </div>
      <div className={styles.linkedin9}>
        <input className={styles.twitter} placeholder="Youtube" type="text" />
      </div>
      <img className={styles.toggleIcon} alt="" src="/toggle.svg" />
      <img className={styles.toggleIcon1} alt="" src="/toggle1.svg" />
      <img className={styles.toggleIcon2} alt="" src="/toggle2.svg" />
      <img className={styles.toggleIcon3} alt="" src="/toggle3.svg" />
      <img className={styles.toggleIcon4} alt="" src="/toggle4.svg" />
      <img className={styles.toggleIcon5} alt="" src="/toggle5.svg" />
      <img className={styles.toggleIcon6} alt="" src="/toggle6.svg" />
      <img className={styles.toggleIcon7} alt="" src="/toggle7.svg" />
      <img className={styles.toggleIcon8} alt="" src="/toggle8.svg" />
    </div>
  );
};

export default MyAccount;
