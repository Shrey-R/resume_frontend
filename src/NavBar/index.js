import styles from "./styles.module.css";

function NavBar({ data = [] , activeTab }) {
  return (
    <div className={styles.container}>
      {(data || []).map((item) => (
        <div className={`${styles.item} ${item?.value === activeTab ? styles.active : ""}`} key={item?.id} onClick={item?.onClick}>
          {item?.name}
        </div>
      ))}
    </div>
  );
}

export default NavBar;
