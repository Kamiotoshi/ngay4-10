import { useState } from 'react';

const users = [
    { id: 1, username: 'user1', password: 'pass1' },
    { id: 2, username: 'user2', password: 'pass2' },
    { id: 3, username: 'user3', password: 'pass3' },
];

export function useLogin() {
    const [error, setError] = useState('');

    const login = (username, password) => {
        const user = users.find(
            (user) => user.username === username && user.password === password
        );

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            setError('');
            return true;
        } else {
            setError('Invalid username or password');
            return false;
        }
    };

    return { login, error };
}
