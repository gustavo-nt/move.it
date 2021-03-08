import Head from 'next/head';
import { motion } from 'framer-motion';
import { GetServerSideProps } from 'next';
import { RiErrorWarningLine } from 'react-icons/ri';

import { Sidebar } from '../components/Sidebar';
import { ChallengeFinishedProps } from '../contexts/ChallengesContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { UserProvider } from '../contexts/UserContext';

import styles from '../styles/pages/Challenges.module.css';

interface HomePageProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  challengesFinished: Array<ChallengeFinishedProps>
}

const Home = (props: HomePageProps) => {
    const { 
        level, 
        challengesCompleted, 
        currentExperience, 
        challengesFinished 
    } = props;

    return (
        <ChallengesProvider 
            level={level}
            currentExperience={currentExperience}
            challengesCompleted={challengesCompleted}
            challengesFinished={challengesFinished}
        >
            <UserProvider>
                <div className={styles.containerChallenges}>
                    <Head>
                        <title>Inicio | move.it</title>
                        <meta name="title" content="Move.it" />
                        <meta name="description" content="Move.it" />
                    </Head>

                    <Sidebar />

                    <h1>Últimos Desafios</h1>

                    <section>
                        {
                            challengesFinished.length > 0 ? (
                            <table>
                                <thead>
                                <motion.tr
                                    variants={{
                                    show: { opacity: 1, y: '0' },
                                    hidden: { opacity: 0, y: '-50%' },
                                    }}
                                    initial="hidden"
                                    animate="show"
                                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                                >
                                    <td>Nivel</td>
                                    <td>Desafio</td>
                                    <td>Tipo</td>
                                    <td>Experiência</td>
                                </motion.tr>
                                </thead>
                                <tbody>
                                {
                                    challengesFinished.map((item, index) => (
                                    <motion.tr 
                                        key={index}
                                        variants={{
                                        show: { opacity: 1, y: '0' },
                                        hidden: { opacity: 0, y: `-50%` },
                                        }}
                                        initial="hidden"
                                        animate="show"
                                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                                    >
                                        <td>{item.level}</td>
                                        <td className={styles.description}>
                                        <img src={`icons/${item.type}.svg`} alt="Body icon" />
                                        <p>{item.description}</p>
                                        </td>
                                        <td>{item.type}</td>
                                        <td>
                                        <span>{item.amount}</span> xp
                                        </td>
                                    </motion.tr>
                                    ))
                                }
                                </tbody>
                            </table>
                            ) : (
                            <div className={styles.alert}>
                                <RiErrorWarningLine />
                                <p>Você não completou nenhum desafio ainda!</p>
                            </div>
                            )
                        }
                    </section>
                </div>
            </UserProvider>
        </ChallengesProvider>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 
    level, 
    currentExperience, 
    challengesCompleted,
    challengesFinished
  } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      challengesFinished: challengesFinished ? JSON.parse(challengesFinished): []
    }
  }
}

export default Home;
