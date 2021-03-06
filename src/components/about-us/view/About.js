import React from 'react';
import concepts from 'resources/images/concept/aboutus-image.jpg';
import background from 'resources/images/background/background-up.png';
import './About.scss';

const About = ({ articles }) => {
  return (
    <div
      className="About"
      style={{ backgroundImage: 'url(' + background + ')' }}
    >
      <div className="context">
        <img
          draggable="false"
          className="ConceptsImage"
          src={concepts}
          alt=""
        />
        <div className="ArticleBox">
          {articles.map((article, index) => (
            <div key={index} className={article[0]}>
              {article[1].split('\n').map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
