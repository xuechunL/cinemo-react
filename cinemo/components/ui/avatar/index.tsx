import styles from './styles.module.css'

export default function Avatar({ children }: { children: React.ReactNode }) {
	return <span className={styles.avatar}>{children}</span>
}
