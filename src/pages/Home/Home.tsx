
import styles from './styles/home.module.css';
import img3 from '../../assets/img3.jpg';
import img4 from '../../assets/img4.jpg';

function Home() {
    return (
        <main className={styles['container']}>
            <div className={styles['title_wrapper']} >
                <h1 className={styles.title}>Welcome to the Home Page!</h1>
                {/* Add your content here */}
            </div>
                <div className={styles.content}>
                    <p className={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae sint earum voluptatum dignissimos a dicta ut, cumque magnam velit in voluptate tenetur distinctio unde, iusto, ab facere harum autem quas?Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, a dolor! Sunt vel quaerat ea, ipsum enim mollitia natus odit quam ratione velit aliquam impedit eos! Debitis quaerat nulla earum. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum temporibus distinctio in magni suscipit animi eos eaque sequi, itaque doloremque tempora veniam repudiandae, fuga magnam recusandae velit libero corrupti nemo?</p>
                    <img src={img3} alt="Coding" className={styles.image} />
                    <img src={img4} alt="Coding" className={styles.image} />
                    <p className={styles.description}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis dolore possimus voluptatibus ipsam cum repudiandae cumque, provident quaerat doloribus repellendus minus soluta, eos odio commodi quae expedita asperiores molestias quasi!Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto deserunt ea quibusdam totam eveniet placeat, accusantium, magni suscipit ex, nisi dolorem cum non voluptates dolores mollitia? Nobis corrupti soluta impedit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi placeat nobis, quidem rem nam atque alias aspernatur obcaecati debitis recusandae. Aperiam odit velit, numquam consequatur reprehenderit obcaecati delectus fuga! Possimus!</p>
                    
                </div>
           
         
        </main>
    );
}

export default Home;