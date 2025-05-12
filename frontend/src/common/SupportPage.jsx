import { useState } from 'react';
import background from "../images/background.jpg";

const SupportPage = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqItems = [
        {
            question: "Contact Us",
            answer:
                "For any inquiries or support requests, please reach out to us at: Email:[Insert Email]"
        },
        {
            question: "Open Source - GitHub Repository",
            answer:
                "You can find our open-source code and contribute to the project on GitHub: [Insert GitHub Link]"
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
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: '1.2%',
    padding: '2%',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    color: '#fff',
  }}
>


                <h2 className="mb-4">Support - GameTogether</h2>
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

export default SupportPage;
