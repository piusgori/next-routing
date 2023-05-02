import React from 'react';
import classes from './hero.module.css';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className={classes.hero}>
        <div className={classes.image}>
            <Image src='/images/site/max.jpg' alt='An Image showing max' width={300} height={300} />
        </div>
        <h1>Hi, I'm Max</h1>
        <p>I blog about web development - especially frontend frameworks especially Angular or React</p>
    </section>
  )
}

export default Hero
