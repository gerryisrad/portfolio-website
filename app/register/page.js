import { redirect } from 'next/navigation';
import { isRegistered } from '@/lib/auth';
import { registerAdmin } from '@/app/actions';
import styles from './page.module.css';

export default async function RegisterPage() {
    const registered = await isRegistered();
    if (registered) {
        redirect('/login');
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Admin Setup</h1>
                <p className={styles.subtitle}>Create your admin account to get started.</p>

                <form action={registerAdmin} className={styles.form}>
                    <div className={styles.field}>
                        <label htmlFor="username" className={styles.label}>Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className={styles.input}
                            required
                            placeholder="e.g. admin"
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="confirm" className={styles.label}>Confirm Password</label>
                        <input
                            type="password"
                            id="confirm"
                            name="confirm"
                            className={styles.input}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.button}>
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
}
