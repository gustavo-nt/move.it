import { UserProvider } from '../contexts/UserContext';

import { useRouter } from 'next/router';
import { FaGithub, FaArrowRight } from 'react-icons/fa';

import LogoImg from '../assets/logo.svg';
import BackgroundImg from '../assets/background-home.svg';

import styles from '../styles/pages/Index.module.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { motion } from 'framer-motion';

const SignIn = () => {
  const router = useRouter();
  const { login } = useContext(UserContext);
  const [name, setName] = useState('');
  const [variant, setVariant] = useState('base');

  useEffect(() => {
    const user = localStorage.getItem('login');

    if (user) {
      setVariant('finish');

      setTimeout(() => {
        router.push('/home');
      }, 300);
    }
  }, [router]);
  
  const handleClick = () => {
    fetch(`https://api.github.com/users/${name}`)
    .then((resp) => resp.json())
    .then(function(data) {
      login(data);
      setVariant('finish');

      setTimeout(() => {
        router.push('/home');
      }, 300);
    });
  }

  return (
    <UserProvider>
      <motion.div className={styles.containerIndex} 
        initial="base"
        animate={variant}
        transition={{ duration: 0.45 }}
        variants={{
          finish: { x: '-100%' },
          base: { },
        }}
      >
        <section>
          <BackgroundImg />
          
          <motion.div className={styles.content}
            variants={{
              show: { opacity: 1, y: '0' },
              hidden: { opacity: 0, y: '-100%' },
            }}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            <div className={styles.inboard}>
              <LogoImg />
              <h1>Bem vindo</h1>

              <div className={styles.github}>
                <FaGithub />
                <span>Faça login com seu Github para começar</span>
              </div>

              <div className={styles.input}>
                <input 
                  type="text" 
                  placeholder="Seu user do Github"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button onClick={handleClick}>
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      </motion.div>
    </UserProvider>
  )
}

export default SignIn;