import Link from 'next/link';

import classes from './main-navigation.module.css';
import { signOut, useSession } from 'next-auth/react';

function MainNavigation() {
  const { data, status } = useSession();

  const logoutHandler = () => {
    signOut();
  }

  return (
    <header className={classes.header}>
      <Link legacyBehavior href='/'>
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {(status === 'unauthenticated') && (status !== 'loading') &&  <li>
            <Link href='/auth'>Login</Link>
          </li>}
          {data?.user && <li>
            <Link href='/profile'>Profile</Link>
          </li>}
          {data?.user && <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
