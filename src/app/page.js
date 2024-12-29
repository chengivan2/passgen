import styles from "./page.module.css";
import TheForm from "./Theform";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <TheForm />
      </main>
    </div>
  );
}
