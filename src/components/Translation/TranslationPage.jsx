import styles from '../Translation/TranslationPage.module.css'

const TranslationPage = () => {
  return (
    <div className={styles.container}>
    <div className={styles.top}></div>
    <div className={styles.bottom}></div>
    <div className={styles.center}>
      <div className={styles.card}>
        <input className={styles.translatorInput} type="text" name="translation" id="translation" />
        <button className={styles.translateBtn}>Translate</button>
      </div>
    </div>
    </div>
  )
}

export default TranslationPage;