import { useState } from 'react';
import background from "../images/background.jpg";

const AboutPage = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const aboutItems = [
        {
            question: "About GameTogether?",
            answer:
                "At Gametogether, we believe in the magic of shared experiences and the power of community. Our platform is designed to bring people together to enjoy the world of tabletop games, whether you're a seasoned Dungeon Master, a strategic board game lover, or a newbie eager to explore the realm of role-playing games."
        },
        {
            question: "What we do?",
            answer:
                "Gametogether connects players with like-minded individuals to join or host games, from the classic Dungeons & Dragons sessions to a variety of tabletop RPGs and board games. Whether you're looking for a regular group or just want to drop into a one-off adventure, we provide the tools to make it happen seamlessly."
        },
        {
            question: "How it works?",
            answer:
                "Our platform matches players based on preferences such as game style, experience level, and availability. Simply create a profile, specify your gaming interests, and start connecting with others who share your passion for tabletop gaming. Hosting a game? You can easily set up a campaign, invite players, and coordinate schedules all in one place."
        },
        {
            question: "Why GameTogether?",
            answer:
            <ul className="ps-4 mb-4">
            <li className="mb-2"><strong>Community-driven:</strong> Our users are at the heart of everything we do. We foster an inclusive environment where everyone, from beginners to veterans, can feel welcome.</li>
            <li className="mb-2"><strong>Easy matchmaking:</strong> Find the perfect gaming group or dungeon master with minimal effort.</li>
            <li className="mb-2"><strong>Diverse options:</strong> Whether it&aposs Dungeons & Dragons, Pathfinder, or a one-off board game, we have something for everyone.</li>
            <li className="mb-2"><strong>Focus on fun:</strong> We prioritize enjoyable experiences and creating lasting memories with new friends.</li>
          </ul>
        },
    ];

    return (
        <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
      <div
  className="custom-container"
  style={{
    width: '50%',
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: '1.2%',
    padding: '2%',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    color: '#fff',
  }}
>


                <h2 className="mb-4">About - GameTogether</h2>
                <div className="accordion" id="faqAccordion">
                    {aboutItems.map((item, index) => (
                        <div className="accordion-item" key={index}>
                            <h2 className="accordion-header" id={`heading${index}`}>
                                <button
                                    className={`accordion-button ${activeIndex === index ? '' : 'collapsed'}`}
                                    type="button"
                                    onClick={() => toggle(index)}
                                    aria-expanded={activeIndex === index}
                                    aria-controls={`collapse${index}`}
                                >
                                    {item.question}
                                </button>
                            </h2>
                            <div
                                id={`collapse${index}`}
                                className={`accordion-collapse collapse ${activeIndex === index ? 'show' : ''}`}
                                aria-labelledby={`heading${index}`}
                                data-bs-parent="#faqAccordion"
                            >
                                <div className="accordion-body">
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
