import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .resume-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
    padding: 18px 50px;
    width: max-content;
  }

  .scroll-downs {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 80px auto;
    width :34px;
    height: 55px;
  }
  .mousey {
    width: 3px;
    padding: 10px 15px;
    height: 35px;
    border: 2px solid #64ffda;
    border-radius: 25px;
    opacity: 0.75;
    box-sizing: content-box;
  }
  .scroller {
    width: 3px;
    height: 10px;
    border-radius: 25%;
    background-color: #64ffda;
    animation-name: scroll;
    animation-duration: 2.2s;
    animation-timing-function: cubic-bezier(.15,.41,.69,.94);
    animation-iteration-count: infinite;
  }
  @keyframes scroll {
    0% { opacity: 0; }
    10% { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(15px); opacity: 0;}
  }  
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Manchala Paavamaani</h2>;
  const three = <h3 className="small-heading">Engineering impactful products for a better world</h3>;
  const four = (
    <>
      <p>
        I am a Software Engineer specializing in building exceptional digital experiences and Currently, looking for job opportunities to build human-centered products
      </p>
    </>
  );
  const five = (
    <a className="resume-link" href="https://drive.google.com/drive/folders/1YuEYLva8MhZNYY5zgz3Y1ds4YkI0DWWm" target="_blank" rel="noreferrer">
      Resume
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}

      <div class="scroll-downs">
        <div class="mousey">
          <div class="scroller"></div>
        </div>
      </div>
    </StyledHeroSection>
  );
};

export default Hero;
