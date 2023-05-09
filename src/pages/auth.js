import { useEffect, useState } from 'react';
import AuthForm from '../components/auth/auth-form';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

function AuthPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { replace } = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        replace('/');
      } else {
        setIsLoading(false);
      }
    })
  }, []);

  if (isLoading) {
    return <p>Loading...</p>
  }

  return <AuthForm />;
}

export default AuthPage;