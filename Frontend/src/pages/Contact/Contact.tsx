import styles from './styles/contact.module.css';

 function Contact() {
    return (
        <div className={styles["container"]}>
        <h1 className={styles.title}>Contact Page</h1>
        <br/>
        <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, mauris id lacinia tincidunt, nunc nunc lacinia nunc, a aliquet nisl nunc id nunc. Sed euismod, nisl nec tincidunt aliquam, nunc nunc aliquam nunc, a aliquet nunc nunc id nunc. Sed euismod, nisl nec tincidunt aliquam, nunc nunc aliquam nunc, a aliquet nunc nunc id nunc.</p>
        <p className={styles.description}>Curabitur id semper nunc. Sed euismod, nisl nec tincidunt aliquam, nunc nunc aliquam nunc, a aliquet nunc nunc id nunc. Sed euismod, nisl nec tincidunt aliquam, nunc nunc aliquam nunc, a aliquet nunc nunc id nunc. Sed euismod, nisl nec tincidunt aliquam, nunc nunc aliquam nunc, a aliquet nunc nunc id nunc.</p>
    </div>
    );
}
export default Contact;