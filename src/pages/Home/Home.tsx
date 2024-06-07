import  { useState, useEffect } from 'react';
import styles from './styles/home.module.css';
import  Event  from '@/pages/Events/EventInterface';
import supabase from '@/config/supabaseClient';
import Card1 from '@/components/Card1';

function Home() {
    const [eventdata, setEventdata] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            const { data, error } = await supabase.supabase.from('Events').select('*');
            if (error) {
                console.error('Error fetching events:', error);
            } else {
                setEventdata(data);
            }
            setLoading(false);
        };

        fetchEvents();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Limit the number of cards to display to a maximum of 3
    const displayedEvents = eventdata.slice(0, 3);

    return (
        <main className={styles.container}>
            <div className={styles.container}>
                <header className={styles['title-bar']}>
                    <h1 className={styles.title}>Welcome to &lt;CodeIO/&gt;!</h1>
                    <h2 className={styles.subtitle}>The premier technical community and club of the Computer Science and Engineering department at B.M.S. College.</h2>
                </header>
                <section className={styles.content}>
                    <div className={styles.description}>
                        <h2>Our Vision</h2>
                        <p>
                            To promote the exploration and development of technical skills, ensuring students can apply these skills in real-world scenarios.
                        </p>
                    </div>
                   
                    <div className={styles.description}>
                        <h2>Our Mission</h2>
                        <p>
                            To cultivate an environment that promotes excellence in computer science education and engineering knowledge through various activities and projects.
                        </p>
                    </div>
                    
                    <div className={styles.description}>
                        <h2>What We Do</h2>
                        <p>&lt;CodeIO/&gt; focuses on three main verticals:</p>
                        <h3>Research & Development (R&D)</h3>
                        <ul>
                            <li>Facilitating hackathons, workshops, and technology training sessions.</li>
                            <li>Encouraging innovative project ideas and supporting their development.</li>
                        </ul>
                        <h3>Competitive Coding</h3>
                        <ul>
                            <li>Organizing hands-on coding sessions.</li>
                            <li>Preparing students for campus placement tests and technical interviews.</li>
                        </ul>
                        <h3>Development Projects</h3>
                        <ul>
                            <li>Undertaking web application development.</li>
                            <li>Contributing to department-level projects like the Institutional Elective Portal and Placement Portal.</li>
                        </ul>
                    </div>
                    <div className={styles.base}>
                        <h3 className={styles.title1}>Featured Events</h3>
                        <div className={styles.gridContainer}>
                            {displayedEvents.map(event => (
                                <Card1 key={event.event_id} event={event} />
                            ))}
                        </div>
                    </div>
                   
                    <div className={styles.description}>
                        <h2>Objectives</h2>
                        <ul>
                            <li>Foster teamwork and individual project management skills among students.</li>
                            <li>Contribute to open-source projects, develop websites and applications, and provide technical support to campus organizations.</li>
                            <li>Collaborate on department and college-level projects, enhancing the overall community.</li>
                        </ul>
                    </div>
                    
                    <div className={styles.description}>
                        <h2>Join Us!</h2>
                        <p>
                            Are you passionate about coding, development, and technology? Join &lt;CodeIO/&gt; and be a part of a vibrant community where you can learn, grow, and contribute. Together, we can make a difference and build a better tech-savvy community.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Home;
