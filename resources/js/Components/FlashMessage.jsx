import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function FlashMessage() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('success');

    useEffect(() => {
        if (flash?.success) {
            setMessage(flash.success);
            setType('success');
            setVisible(true);
        } else if (flash?.error) {
            setMessage(flash.error);
            setType('error');
            setVisible(true);
        } else {
            setVisible(false);
        }

        const timer = setTimeout(() => setVisible(false), 4000);
        return () => clearTimeout(timer);
    }, [flash?.success, flash?.error]);

    if (!visible || !message) return null;

    const base = 'fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-sm font-medium max-w-sm';
    const colors = type === 'success'
        ? 'bg-green-50 text-green-800 border border-green-200'
        : 'bg-red-50 text-red-800 border border-red-200';

    return (
        <div className={`${base} ${colors}`} role="alert">
            <span className="flex-1">{message}</span>
            <button
                onClick={() => setVisible(false)}
                className="ml-2 text-current opacity-60 hover:opacity-100 focus:outline-none"
                aria-label="Dismiss"
            >
                ×
            </button>
        </div>
    );
}
