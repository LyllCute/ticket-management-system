import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import Badge from '@/Components/Badge';

export default function Show({ ticket }) {
    function handleDelete() {
        if (!window.confirm('Are you sure you want to delete this ticket?')) return;
        router.delete(route('tickets.destroy', ticket.id));
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">Ticket #{ticket.id}</h2>
                    <Link href={route('tickets.index')} className="text-sm text-gray-500 hover:text-gray-700">
                        ← Back to tickets
                    </Link>
                </div>
            }
        >
            <Head title={`Ticket #${ticket.id}`} />

            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6 space-y-6">
                {/* Title + Badges */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <h1 className="text-2xl font-bold text-gray-900 flex-1">{ticket.title}</h1>
                    <div className="flex gap-2 flex-shrink-0">
                        <Badge type="priority" value={ticket.priority} />
                        <Badge type="status" value={ticket.status} />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Description</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{ticket.description}</p>
                </div>

                {/* Meta */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Category</p>
                        <p className="mt-1 text-sm font-medium text-gray-700">{ticket.category}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Created</p>
                        <p className="mt-1 text-sm font-medium text-gray-700">
                            {new Date(ticket.created_at).toLocaleString()}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Last Updated</p>
                        <p className="mt-1 text-sm font-medium text-gray-700">
                            {new Date(ticket.updated_at).toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <Link
                        href={route('tickets.edit', ticket.id)}
                        className="px-4 py-2 bg-yellow-500 text-white text-sm font-medium rounded-md hover:bg-yellow-600 transition-colors"
                    >
                        Edit Ticket
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
                    >
                        Delete Ticket
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
