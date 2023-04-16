import Link from 'next/link'
import React from 'react';
import classes from './button.module.css';

const Button = ({ children, link }) => {
  return (
    <Link legacyBehavior href={link}>
        <a className={classes.btn}>{children}</a>
    </Link>
  )
}

export default Button