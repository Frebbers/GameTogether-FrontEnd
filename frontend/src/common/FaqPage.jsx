import { useState } from 'react';
import background from "../images/background.jpg";

const FaqPage = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqItems = [
        {
            question: "What is GameTogether?",
            answer:
                "GameTogether is a platform designed to help players find teammates for co-op, competitive, and casual gaming sessions. Whether you play Dungeons & Dragons, Valorant, or Among Us, GameTogether makes it easy to match with like-minded players based on your interests, schedule, and skill level."
        },
        {
            question: "How does matchmaking work?",
            answer:
                "We use tags, game preferences, and time availability to help you find the perfect group. You can search for open sessions or create your own listing with specific requirements such as game title, skill level, microphone use, and region."
        },
        {
            question: "Do I need to create an account?",
            answer:
                "Yes, creating an account allows us to match you more effectively and save your preferences. You can sign up using your email."
        },
        {
            question: "Is GameTogether free?",
            answer:
                "Yes! The core features of GameTogether are free to use. We may introduce premium features in the future, but the basic matchmaking service will always be free."
        },
        {
            question: "What types of games are supported?",
            answer:
                "GameTogether supports a wide range of games including online shooters, MOBAs, MMOs, tabletop RPGs like D&D, and even indie co-op games. If you can play it with a group, you can find a team for it here."
        },
        {
            question: "Is there a mobile app?",
            answer:
                "A mobile version is in development, but for now, GameTogether is optimized for computer browsers so you can find and join sessions."
        }
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
            background: 'rgb(29 37 62 / 80%)',
            borderRadius: '1.2%',
            padding: '2%',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: '#fff',
            minHeight: "80vh",
            height:"max-content"
        }}
>


                <h2 className="mb-4">Frequently Asked Questions - GameTogether</h2>
                <div className="accordion" id="faqAccordion">
                    {faqItems.map((item, index) => (
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

export default FaqPage;
