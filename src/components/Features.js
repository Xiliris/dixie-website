import react from 'react';
import FeaturesCard from './FeaturesCard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas, faFaceGrin, faCommentDots, faCalendarCheck, faTools, faMoneyCheckAlt, faGamepad } from "@fortawesome/free-solid-svg-icons";

import './Features.scss';

function Features() {
  return (
    <section id="features">
      <h2>Features</h2>
      <div className="features-container">
        <FeaturesCard
          title="Personal bot"
          icon={faFaceGrin}
          description="Make it uniquely yours!
With our fully customizable appearance options, you can change your avatar, description, status, and more to reflect your personal style and personality."
        />
        <FeaturesCard
          title="Chat managment"
          icon={faCommentDots}
          description="Take control of your chat experience with features like word blacklisting, anti-spam measures, raid prevention, and more. Tailor your chat environment to suit your needs and enjoy a safer, more enjoyable interaction."
        />
        <FeaturesCard
          title="Handle events"
          icon={faCalendarCheck}
          description="Manage events effortlessly with features for welcome messages, goodbye messages, birthdays, giveaways, and more! Personalize your interactions and make every occasion special."
        />
        <FeaturesCard
          title="Administration"
          icon={faTools}
          description="Unlock the full potential of your server with our comprehensive warning system, powerful admin commands, and effective punishment tools. Keep your community safe and orderly while maintaining control and fostering a positive environment. "
        />
        <FeaturesCard
          title="Economy system"
          icon={faMoneyCheckAlt}
          description="Create a dynamic and engaging community with our economy system! Let users earn, spend, gamble, and invest their money their way. Allow members to explore different ways to grow their wealth."
        />
        <FeaturesCard
          title="Games"
          icon={faGamepad}
          description="Keep the fun going on your server with our collection of chill games! Whether it's trivia, word games, or casual puzzles, users can enjoy a break from chatting while staying connected to the community. Let them unwind and have a blast without ever leaving your server."
        />
      </div>
    </section>
  );
}

export default Features;
