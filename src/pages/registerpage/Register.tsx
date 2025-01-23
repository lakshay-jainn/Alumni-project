
import {Link} from "react-router-dom";
import {useState} from 'react';

import { FormEvent } from 'react';
import styles from '../loginregister.module.css';

function Register() {
	const [isAlumni, setIsAlumni] = useState(true);
	const handleToggle = (isAlumniSelected: boolean) => {
		setIsAlumni(isAlumniSelected);
	  };
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
   
      const formData = new FormData(event.currentTarget);
      const email=formData.get('email');
      const password=formData.get('password');
      const confirmPassword=formData.get('confirmPassword');
      console.table([email,password,confirmPassword,isAlumni]);
      // const response = await fetch('/api/submit', {
      //   method: 'POST',
      //   body: formData,
      // })
    };
      
      
	
	 
  return (
    <div className={styles["mainwrapper"]}>
      <div className={styles["wrapper"]}>
        <div className={styles["title-text"]}>
          <div style={{
                marginLeft: isAlumni ? "0" : "-50%",
              }} className={`${styles["title"]} ${styles["alumni"]}`}>
            Alumni Signup
          </div>
          <div className={`${styles["title"]} ${styles["student"]}`}>
            Student Signup
          </div>
        </div>
        <div className={styles["form-container"]}>
          <div className={styles["slide-controls"]}>
            
            
            <button
              onClick={() => handleToggle(true)}
              className={`${styles["slide"]} ${styles["almuni"]} ${
				isAlumni ? styles["active"] : styles["not-active"]
			  }`}>
              Alumni
            </button>
            <button
			onClick={() => handleToggle(false)}
              className={`${styles["slide"]} ${styles["student"]} ${
				!isAlumni ? styles["active"] : styles["not-active"]
			  }`}
            >
              Student
            </button>
            <div className={styles["slider-tab"]} style={{
                left: isAlumni ? "0" : "50%",
              }}
></div>
          </div>
          <div className={styles["form-inner"]}>
          <form onSubmit={onSubmit} className={styles["signup"]}>
              <div className={styles["field"]}>
                <input type="text" name='email' placeholder="Email Address" required />
              </div>
              <div className={styles["field"]}>
                <input type="password" name='password' placeholder="Password" required />
              </div>
              <div className={styles["field"]}>
                <input
                  type="password"
                  name='confirmPassword'
                  placeholder="Confirm password"
                  required
                />
              </div>
              <div className={`${styles["field"]} ${styles["btn"]}`}>
                <div className={styles["btn-layer"]}></div>
                <input type="submit" value="Signup" />
              </div>
              <div className={styles["signup-link"]}>
                Already registered? <Link to='/login'>Login here!</Link>
              </div>
            </form>

          </div>
        </div>
      
	  </div>

    </div>
  );
}

export default Register;
