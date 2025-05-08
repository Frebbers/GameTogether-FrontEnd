import background from "../images/background.jpg";

const AboutPage = () => {
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
            }}
        >
            {/* Glassmorphism Container */}
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
                <h1>About Gametogether</h1>
<p>
    At Gametogether, we believe in the magic of shared experiences and the power of community. Our platform is designed to bring people together to enjoy the world of tabletop games, whether you're a seasoned Dungeon Master, a strategic board game lover, or a newbie eager to explore the realm of role-playing games.
</p>
<h2>What We Do</h2>
<p>
    Gametogether connects players with like-minded individuals to join or host games, from the classic Dungeons & Dragons sessions to a variety of tabletop RPGs and board games. Whether you're looking for a regular group or just want to drop into a one-off adventure, we provide the tools to make it happen seamlessly.
</p>
<h2>How It Works</h2>
<p>
    Our platform matches players based on preferences such as game style, experience level, and availability. Simply create a profile, specify your gaming interests, and start connecting with others who share your passion for tabletop gaming. Hosting a game? You can easily set up a campaign, invite players, and coordinate schedules all in one place.
</p>
<h2>Why Gametogether?</h2>
<ul>
    <li><strong>Community-driven:</strong> Our users are at the heart of everything we do. We foster an inclusive environment where everyone, from beginners to veterans, can feel welcome.</li>
    <li><strong>Easy matchmaking:</strong> Find the perfect gaming group or dungeon master with minimal effort.</li>
    <li><strong>Diverse options:</strong> Whether it's Dungeons & Dragons, Pathfinder, or a one-off board game, we have something for everyone.</li>
    <li><strong>Focus on fun:</strong> We prioritize enjoyable experiences and creating lasting memories with new friends.</li>
</ul>
<p>
    Join us today and start your next adventure with Gametogether. Because every great game begins with great people.
</p>

            </div>
        </div>
    );
};

export default AboutPage;
