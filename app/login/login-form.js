'use client';

import { useActionState } from 'react';
import { login } from '@/app/actions';
import styles from './page.module.css';

const initialState = {
    message: '',
};

export default function LoginForm() {
    const [state, formAction] = useActionState(login, initialState);

    return (
        <div className={styles.card}>
            <h1 className={styles.title}>Admin Access</h1>
            <p className={styles.subtitle}>Enter your credentials to continue.</p>

            <form action={formAction} className={styles.form}>
                <div className={styles.field}>
                    <label htmlFor="username" className={styles.label}>Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className={styles.input}
                        required
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="password" className={styles.label}>Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        className={styles.input}
                    />
                </div>
                {state?.error && (
                    <p style={{ color: 'var(--color-red)', textAlign: 'center' }}>{state.error}</p>
                )}
                <button type="submit" className={styles.button}>
                    Login
                </button>
            </form>
        </div>
    );
}
