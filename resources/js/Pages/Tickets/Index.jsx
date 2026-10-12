import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import Badge from '@/Components/Badge';
import Pagination from '@/Components/Pagination';

export default function Index({ tickets }) {
    function handleDelete(id) {
        if (!window.confirm('Are you sure you want to delete this ticket?')) return;
        router.delete(route('tickets.destroy', id));
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">My Tickets</h2>
                    <Link
                        href={route('tickets.create')}
                        className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        + New Ticket
                    </Link>
                </div>
            }
        >
            <Head title="My Tickets" />

            {tickets.data.length === 0 ? (
                <div className="text-center py-16">
                    <div className="text-5xl mb-4">🎫</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets yet</h3>
                    <p className="text-gray-500 mb-6">Create your first support ticket to get started.</p>
                    <Link
                        href={route('tickets.create')}
                        className="inline-flex px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        Create your first ticket
                    </Link>
                </div>
            ) : (
                <>
                    {/* Desktop Table */}
                    <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
                                <tr>
                                    <th className="px-6 py-3">Title</th>
                                    <th className="px-6 py-3">Category</th>
                                    <th className="px-6 py-3">Priority</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Created</th>
                                    <th className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {tickets.data.map((ticket) => (
                                    <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900 max-w-xs truncate">
                                            {ticket.title}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{ticket.category}</td>
                                        <td className="px-6 py-4">
                                            <Badge type="priority" value={ticket.priority} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge type="status" value={ticket.status} />
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {new Date(ticket.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Link
                                                    href={route('tickets.show', ticket.id)}
                                                    className="text-indigo-600 hover:underline"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={route('tickets.edit', ticket.id)}
                                                    className="text-yellow-600 hover:underline"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(ticket.id)}
                                                    className="text-red-600 hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-4">
                        {tickets.data.map((ticket) => (
                            <div key={ticket.id} className="bg-white rounded-xl shadow-sm p-4 space-y-3">
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="font-semibold text-gray-900 text-sm leading-snug">{ticket.title}</h3>
                                    <Badge type="status" value={ticket.status} />
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs text-gray-500">{ticket.category}</span>
                                    <span className="text-gray-300">·</span>
                                    <Badge type="priority" value={ticket.priority} />
                                </div>
                                <p className="text-xs text-gray-400">
                                    {new Date(ticket.created_at).toLocaleDateString()}
                                </p>
                                <div className="flex items-center gap-4 pt-1 border-t border-gray-100">
                                    <Link href={route('tickets.show', ticket.id)} className="text-sm text-indigo-600">
                                        View
                                    </Link>
                                    <Link href={route('tickets.edit', ticket.id)} className="text-sm text-yellow-600">
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(ticket.id)}
                                        className="text-sm text-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Pagination links={tickets.links} />
                </>
            )}
        </AuthenticatedLayout>
    );
}
