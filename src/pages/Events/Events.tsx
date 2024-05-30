import Style from "./Styles/Events.module.css";

const Events = (): any => {
    // Assuming you have an array of events
    const events = [
        { id: 1, title: 'Event 1', date: '2022-01-01' },
        { id: 2, title: 'Event 2', date: '2022-02-01' },
        { id: 3, title: 'Event 3', date: '2022-03-01' },
    ];

    return (
        <>
        <h1>Events</h1>
        <div className={Style["events"]}>
            
            <ul >
                {events.map((event) => (
                    <li key={event.id} className={Style["event-card"]}>
                        <h3>{event.title}</h3>
                        <p>Date: {event.date}</p>
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
};

export default Events;