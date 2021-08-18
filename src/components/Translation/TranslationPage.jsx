import { useState } from 'react'
import { useHistory } from 'react-router'
import styles from '../Translation/TranslationPage.module.css'

const TranslationPage = () => {
  const history = useHistory();
  const [translationText, setTranslationText] = useState('')
  const [clicked, setClicked] = useState(false)

  const handleTranslateBtn = () => {
    if(translationText.length > 40){
      alert("max 40 characters long text");
      return;
    }
    if(/[^a-zA-Z]/.test(translationText)){
      alert("text can only contain a-z and spaces");
      return;
    }
    
    console.log(translationText)
    setClicked(true)
  }

  if(!localStorage.getItem('username')){
    history.goBack(history.length-1)
  }

  const handleTranslationTextChange = e => {
    setTranslationText(e.target.value);
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}></div>
      <div className={styles.bottom}></div>
      <div className={styles.center}>
        <div className={styles.card}>
          <input 
            className={styles.translatorInput} 
            type="text" 
            name="translation" 
            id="translation" 
            placeholder="Please type what you wish to translate" 
            onChange={handleTranslationTextChange}
          />
          <button className={styles.translateBtn} onClick={handleTranslateBtn}>Translate</button>
          {clicked === true && (
            <div className={styles.translationContainer}></div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TranslationPage;