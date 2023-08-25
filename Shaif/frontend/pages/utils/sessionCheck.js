import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SessionCheck() {
    const router = useRouter();

    useEffect(() => {
        const session = sessionStorage.getItem('username');
        if (!session) {
            router.push('../provider/login');
        }
    }, []);

    return null;
};