import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CompletedChallenges.module.css';
import { FiAward } from 'react-icons/fi';

export function CompletedChallenges() {
    const { challengesCompleted } = useContext(ChallengesContext);

    return (
        <div className={styles.completedChallengesContainer}>
            <div>
                <FiAward/>
                <span>Desafios completos</span>
            </div>
            <span>{challengesCompleted}</span>
        </div>
    )
}