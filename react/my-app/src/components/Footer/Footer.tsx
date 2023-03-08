import styles from "./footer.module.scss";
import ThemeButton from "../ThemeButton";

function Footer() {
  return (
    <section className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.wrap}>
          {}
          <span className="designer">©2022 Blogolog</span>
          {}
          <ThemeButton />
        </div>
      </div>
    </section>
  );
}
export default Footer;
