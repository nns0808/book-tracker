import styles from "./About.module.css";

function About() {
  return (
    <div className={styles.aboutSection}>
      <h2>About This App</h2>
      <p>
       Book Tracker App is a Node.js and React.js web application that helps users manage their personal reading collection. It allows users to add, search, sort, edit, delete, and rate books through a clean, intuitive interface. All data is securely stored and managed on a Node.js backend, with real-time updates reflected in the React frontend.
      </p>
      <p>
        Author: Natalia Novikova
      </p>
    </div>
  );
}

export default About;