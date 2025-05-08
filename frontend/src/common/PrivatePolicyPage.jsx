import background from "../images/background.jpg";

const PrivatePolicyPage = () => {
    return (
        <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                        backgroundImage: `url(${background})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        minHeight: '100vh',
                        scrollbehavior: 'smooth',
                        overflowY: 'scroll',
                        width: '100%',
                        wrap: 'wrap',
                    }}
                >

<div className="custom-container p-4 shadow-lg rounded-3 bg-white bg-opacity-75 backdrop-blur-sm text-black" 
    style={{
        width: '50%',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        color: '#ffffff',
        fontFamily: 'Arial, sans-serif',
        fontSize: '1.2rem',
        lineHeight: '1.5',
        textAlign: 'justify',
        paddingBottom: '30px',
        boxSizing: 'border-box',
      }}>      
                <h1 className="mb-4">Privacy Policy</h1>
                <p><strong>Effective Date:</strong> [08/05/2025]</p>

                <p>At <strong>Gametogether</strong>, your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your information when you use our platform.</p>

                <h2>1. Information We Collect</h2>
                <p>We may collect the following types of information when you use Gametogether:</p>
                <ul>
                    <li><strong>Personal Information:</strong> Your name, email address, and profile details.</li>
                    <li><strong>Gaming Preferences:</strong> Game types, skill levels, and availability.</li>
                    <li><strong>Usage Data:</strong> Interactions, session durations, and feature usage.</li>
                    <li><strong>Technical Data:</strong> IP address, browser type, and device information.</li>
                </ul>

                <h2>2. How We Use Your Information</h2>
                <p>Your information is used to:</p>
                <ul>
                    <li>Provide and personalize matchmaking features</li>
                    <li>Improve and maintain platform functionality</li>
                    <li>Communicate updates or alerts</li>
                    <li>Enhance user experience</li>
                </ul>

                <h2>3. Sharing Your Information</h2>
                <p>We do not sell your data. We may share information with:</p>
                <ul>
                    <li>Other users (e.g., basic profile for matchmaking)</li>
                    <li>Third-party services (e.g., cloud hosting, analytics)</li>
                    <li>Law enforcement if required by legal obligations</li>
                </ul>

                <h2>4. Cookies and Tracking</h2>
                <p>We use cookies to store preferences and enhance performance. You can adjust cookie settings in your browser.</p>

                <h2>5. Data Security</h2>
                <p>We implement industry-standard security measures to safeguard your information, though no method is entirely foolproof.</p>

                <h2>6. Your Rights</h2>
                <p>You may have rights to access, correct, or delete your data. Contact us at [insert email] to make a request.</p>

                <h2>7. Changes to This Policy</h2>
                <p>We may update this policy from time to time. We'll notify you of significant changes via email or on the platform.</p>

                <h2>8. Contact Us</h2>
                <p>If you have questions about this Privacy Policy, please reach out at [insert email].</p>
        </div>
        </div>
    );
};

export default PrivatePolicyPage;
