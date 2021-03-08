import styles from '../styles/components/Sidebar.module.css'
import { FiHome, FiAward, FiLogOut } from 'react-icons/fi';
import { UserContext } from '../contexts/UserContext';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useContext } from 'react';

export function Sidebar() {
    const router = useRouter();
    const { logout } = useContext(UserContext);

    const handleLogout = () => {
        logout();
        router.replace('/');
    };
    
    return (
        <motion.div className={styles.sidebarContainer}
            variants={{
                show: { opacity: 1, x: '0' },
                hidden: { opacity: 0, x: '-100%' },
            }}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
            <aside>
                <header>
                    <img src="icons/logo.svg" alt="Logo" />
                </header>
                <div className={styles.iconsContainer}>
                    <div className={styles.iconHome}>
                        { router.pathname === '/home' ? (
                            <>
                                <Link href="/home">
                                    <a>
                                        <FiHome className={styles.active}/>
                                    </a>
                                </Link>
                                <div className={styles.flagSidebar}></div>
                            </>
                        ): (
                            <Link href="/home">
                                <a>
                                    <FiHome />
                                </a>
                            </Link>
                        )}
                    </div>
                    <div className={styles.iconAward}>
                        { router.pathname === '/challenges' ? (
                            <>
                                <Link href="/challenges">
                                    <a>
                                        <FiAward className={styles.active}/>
                                    </a>
                                </Link>
                                <div className={styles.flagSidebar}></div>
                            </>
                        ): (
                            <Link href="/challenges">
                                <a>
                                    <FiAward />
                                </a>
                            </Link>
                        )}
                    </div>
                </div>
                <footer>
                    <FiLogOut onClick={handleLogout}/>
                </footer>
            </aside>
        </motion.div>
    )
}