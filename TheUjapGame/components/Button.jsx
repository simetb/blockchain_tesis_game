//styles
import styles from "../styles/components/Button.module.scss";

export default function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className={styles.button}>
      <span className={styles.innerBtn}>{children}</span>
    </button>
  );
}
