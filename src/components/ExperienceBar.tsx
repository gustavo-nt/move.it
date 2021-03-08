import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';
import { motion } from 'framer-motion';

export function ExperienceBar() {
    const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);
    
    const percentToNextLevel = Math.round((currentExperience * 100) / experienceToNextLevel);

    return(
        <motion.header className={styles.experienceBar}
            variants={{
                show: { opacity: 1, y: '0' },
                hidden: { opacity: 0, y: '-100%' },
            }}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
            <span>0 px</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%`}}/>
                <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%`}}>
                    {currentExperience} px
                </span>
            </div>
            <span>{experienceToNextLevel}xp</span>
        </motion.header>
    )
}