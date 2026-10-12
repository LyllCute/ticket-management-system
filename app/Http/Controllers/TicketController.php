<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use App\Models\Ticket;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TicketController extends Controller
{
    public function index(): Response
    {
        $tickets = auth()->user()
            ->tickets()
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Tickets/Index', [
            'tickets' => $tickets,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Tickets/Create', [
            'priorities' => Ticket::PRIORITIES,
            'statuses'   => Ticket::STATUSES,
            'categories' => Ticket::CATEGORIES,
        ]);
    }

    public function store(StoreTicketRequest $request): RedirectResponse
    {
        auth()->user()->tickets()->create($request->validated());

        return redirect()->route('tickets.index')
            ->with('success', 'Ticket created.');
    }

    public function show(Ticket $ticket): Response
    {
        $this->authorize('view', $ticket);

        return Inertia::render('Tickets/Show', [
            'ticket' => $ticket,
        ]);
    }

    public function edit(Ticket $ticket): Response
    {
        $this->authorize('update', $ticket);

        return Inertia::render('Tickets/Edit', [
            'ticket'     => $ticket,
            'priorities' => Ticket::PRIORITIES,
            'statuses'   => Ticket::STATUSES,
            'categories' => Ticket::CATEGORIES,
        ]);
    }

    public function update(UpdateTicketRequest $request, Ticket $ticket): RedirectResponse
    {
        $this->authorize('update', $ticket);

        $ticket->update($request->validated());

        return redirect()->route('tickets.show', $ticket)
            ->with('success', 'Ticket updated.');
    }

    public function destroy(Ticket $ticket): RedirectResponse
    {
        $this->authorize('delete', $ticket);

        $ticket->delete();

        return redirect()->route('tickets.index')
            ->with('success', 'Ticket deleted.');
    }
}
