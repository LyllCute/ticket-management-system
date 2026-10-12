export default function Badge({ type, value }) {
    const colorMap = {
        priority: {
            Low:    'bg-green-100 text-green-800',
            Medium: 'bg-yellow-100 text-yellow-800',
            High:   'bg-orange-100 text-orange-800',
            Urgent: 'bg-red-100 text-red-800',
        },
        status: {
            'Open':        'bg-blue-100 text-blue-800',
            'In Progress': 'bg-yellow-100 text-yellow-800',
            'Resolved':    'bg-green-100 text-green-800',
            'Closed':      'bg-gray-100 text-gray-800',
        },
    };

    const classes = colorMap[type]?.[value] ?? 'bg-gray-100 text-gray-700';

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${classes}`}>
            {value}
        </span>
    );
}
