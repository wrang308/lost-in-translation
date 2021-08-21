import { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import styles from '../Translation/TranslationPage.module.css'
import firebase from '../../firebase';

const TranslationPage = () => {
  const [translationText, setTranslationText] = useState('')
  const [clicked, setClicked] = useState(false)
  const [images, setImages] = useState(null)
  
  const ref = firebase.firestore().collection("users");

  /**
   * Handles translation button click, checks if the translation text matches the requirements
   * If the requirements are met, the translation text gets added to the searches database
   * and the translateTextToImages method gets called
   */
  const handleTranslateBtn = () => {
    if(translationText.length > 40){
      alert("max 40 characters long text");
    } else if(/[^a-zA-Z ]/.test(translationText)){
      alert("text can only contain a-z and spaces");
    } else if(!translationText.replace(/\s/g, '').length){
      alert("Must contains text");
    }
    
    else {
      ref.where("username", "==", localStorage.getItem("username"))
      .get()
      //.then(data => {console.log(data)})
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

          ref
          .doc(doc.id)
          .update({"username": doc.data().username, "translations": [...doc.data().translations, translationText]})
          .catch((err) => {
            console.error(err);
          });

        });
      })
      .catch((err) => {
        console.error(err);
      });
      
      setClicked(true)
      translateTextToImages()
    }
  }

  /**
   * Sets the translation text to the value of the translation input
   * @param {e} e, event of input change 
   */
  const handleTranslationTextChange = e => {
    setTranslationText(e.target.value);
  }

  /**
   * Updates images array based on the translation text
   */
  const translateTextToImages = () => {
    setImages(translationText.split('').map(e => `../media/signs/${e}.png`))
  }

  return (
    <div className={styles.container}>
      <Navbar />
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
            <div className={styles.translationContainer}>
              {images && images.map((e, i) => {
                if(e !== '../media/signs/ .png') {
                  return <img src={e} alt={e} key={i} className={styles.signImages} />
                }
                return <div key={i}></div>
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TranslationPage;