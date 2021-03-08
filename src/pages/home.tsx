import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { motion } from 'framer-motion';

import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';
import { Sidebar } from '../components/Sidebar';

import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { UserProvider } from '../contexts/UserContext';
import { ChallengeFinishedProps } from '../contexts/ChallengesContext';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  challengesFinished: Array<ChallengeFinishedProps>
}

export default function Home(props: HomeProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storage = localStorage.getItem('login');

    if (storage) {
      setIsLoading(false);
    } else {
      router.replace('/');
    }
  }, [router]);

  return (
    <ChallengesProvider 
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
      challengesFinished={props.challengesFinished}

    >
      <UserProvider>
      {!isLoading && (
        <div className={styles.container}>
          <Head>
            <title>Início | Moveit</title>
          </Head>

          <Sidebar />

          <ExperienceBar />

          <CountdownProvider>
            <motion.section 
              variants={{
                show: { opacity: 1, x: '0' },
                hidden: { opacity: 0, x: '-50%' },
              }}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            >
              <div>
                <Profile />
                <CompletedChallenges />
                <Countdown />
              </div>
              <motion.div
                variants={{
                  show: { opacity: 1, x: '0' },
                  hidden: { opacity: 0, x: '50%' },
                }}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.7, ease: 'easeInOut' }}
              >
                <ChallengeBox />
              </motion.div>
            </motion.section>
          </CountdownProvider>
        </div>
      )}
      </UserProvider>
    </ChallengesProvider>
  ) 
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted, challengesFinished} = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      challengesFinished: challengesFinished ? JSON.parse(challengesFinished) : []
    }
  }
}