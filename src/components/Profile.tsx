import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import { UserContext } from '../contexts/UserContext';
import styles from '../styles/components/Profile.module.css'
import Level from '../assets/level.svg'

export function Profile() {
    const { user } = useContext(UserContext);
    const { level } = useContext(ChallengesContext);

    return (
        <div className={styles.profileContainer}>
            <img src={user?.image} alt={user?.name}/>
            <div>
                <strong>{user?.name}</strong>
                <p>
                    <Level />
                    Level {level}
                </p>
            </div>
        </div>
    )
}