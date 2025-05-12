import { useState } from 'react';
import background from "../images/background.jpg";

const PrivatePolicyPage = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqItems = [
        {
            question: "1. Information We Collect",
            answer:
                "We may collect the following types of information when you use Gametogether: Personal Information: Your name, email address, and profile details. Gaming Preferences: Game types, skill levels, and availability. Usage Data: Interactions, session durations, and feature usage. Technical Data: IP address, browser type, and device information."
        },
        {
            question: "2. How We Use Your Information",
            answer:
                "Your information is used to: Provide and personalize matchmaking features, Improve and maintain platform functionality, Communicate updates or alerts, and Enhance user experience"
        },
        {
            question: "3. Sharing Your Information",
            answer:
                "We do not sell your data. We may share information with: Other users (e.g., basic profile for matchmaking), Third-party services (e.g., cloud hosting, analytics), and Law enforcement if required by legal obligations"
        },
        {
            question: "4. Cookies and Tracking",
            answer:
                "We use cookies to store preferences and enhance performance. You can adjust cookie settings in your browser."
        },
        {
            question: "5. Data Security",
            answer:
                "We implement industry-standard security measures to safeguard your information, though no method is entirely foolproof."
        },
        {
            question: "6. Your Rights",
            answer:
                "You may have rights to access, correct, or delete your data. Contact us at support@gametogether.dk to make a request."
        },
        {
            question: "7. Changes to This Policy",
            answer:
                "We may update this policy from time to time. We'll notify you of significant changes via email or on the platform."
        },
        {
            question: "8. Contact Us",
            answer:
                "If you have questions about this Privacy Policy, please reach out at support@gametogether.dk."
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


                <h2 className="mb-4">Private Policy - GameTogether</h2>
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

export default PrivatePolicyPage;
