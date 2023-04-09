import styles from '@/styles/Home.module.css'
import Header from '@/components/Header/Header'
import MainMenu from '@/components/MainMenu/MainMenu'

export function InternalLayout({ children }) {
    return (
      <main className={styles.container}>
        <Header />
        <MainMenu />
        {children}
    </main>
    );
  }