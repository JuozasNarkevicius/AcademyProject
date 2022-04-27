import React, { useState, useRef, useEffect } from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import './fadeInSection.css';

const FadeInSection = (props) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();
  const { children } = props;
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(entry.isIntersecting);
        }
      });
    });
    observer.observe(domRef.current);
    return () => observer.unobserve(domRef.current);
  }, []);
  return (
    <Grid
      sx={{ display: 'flex' }}
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
      ref={domRef}
    >
      {children}
    </Grid>
  );
};

FadeInSection.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FadeInSection;
