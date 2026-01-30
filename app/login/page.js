import { redirect } from 'next/navigation';
import { isRegistered } from '@/lib/auth';
import LoginForm from './login-form';
import styles from './page.module.css';

export default async function LoginPage() {
    const registered = await isRegistered();
    if (!registered) {
        redirect('/register');
    }

    return (
        <div className={styles.container}>
            <LoginForm />
        </div>
    );
}
