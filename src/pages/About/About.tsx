import styles from './styles/about.module.css';

function About() {
    return (
        <div className={styles.container}>
            <h1>About Page</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, mauris id lacinia tincidunt, nunc nunc lacinia nunc, a aliquet nisl nunc id nunc. Sed euismod, nisl nec tincidunt aliquam, nunc nunc aliquam nunc, a aliquet nunc nunc id nunc. Sed euismod, nisl nec tincidunt aliquam, nunc nunc aliquam nunc, a aliquet nunc nunc id nunc.</p>
            <p>Curabitur id semper nunc. Sed euismod, nisl nec tincidunt aliquam, nunc nunc aliquam nunc, a aliquet nunc nunc id nunc. Sed euismod, nisl nec tincidunt aliquam, nunc nunc aliquam nunc, a aliquet nunc nunc id nunc. Sed euismod, nisl nec tincidunt aliquam, nunc nunc aliquam nunc, a aliquet nunc nunc id nunc.</p>
        </div>
    );
}

export default About;