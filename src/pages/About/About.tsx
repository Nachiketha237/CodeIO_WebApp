import styles from './styles/about.module.css';

function About() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>About &lt;CodeIO/&gt;</h1><br/>
            <p className={styles.description}>
 
                &lt;CodeIO/&gt; is a technical community and club within the department of Computer Science and Engineering, B.M.S. College. The vision is to promote exploration and development of technical skills to gain real-life applications. The mission is to promote excellence in Computer Science education and overall Engineering knowledge.<br/><br/>
                The development and work of &lt;CodeIO/&gt; encompasses three verticals:
                <ul>
                            <li> Facilitation of Hackathons, workshops and technology training sessions by the &lt;CodeIO/&gt; Research and Development (R&D) wing.</li>
                            <li> Hands-on Competitive Coding sessions, and preparation for Campus placement tests and interviews, by the &lt;CodeIO/&gt; Competitive Coding wing.</li>
                            <li> Along with undertaking various web application developmental & department level projects within the institution like the Institutional Elective Portal and Placement Portal, by the &lt;CodeIO/&gt; Development wing.</li>
                </ul>



            </p>
            <p className={styles.description}>
            <h3 >Objectives of  &lt;CodeIO/&gt;</h3><br/>
            

                <ul>
                        <li>Imbibe the ability among students to work as individuals and in groups during projects.</li>
                        <li>Contribute to open source projects, build websites and applications, provide technical support to organizations and various clubs on campus.</li>
                        <li>Work as a team and contribute to department and college level projects and make the club a better community than ever before.</li>
                </ul>
                
            </p>
        </div>
    );
}

export default About;