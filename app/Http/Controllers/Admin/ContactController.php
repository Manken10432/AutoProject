<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\RespuestaContacto;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::with('vehicle')
            ->latest()
            ->paginate(20);

        $unreadCount = Contact::whereNull('read_at')->count();

        return Inertia::render('Admin/Contacts/Index', compact('contacts', 'unreadCount'));
    }

    public function show(Contact $contact)
    {
        if (! $contact->read_at) {
            $contact->update(['read_at' => now()]);
        }

        $contact->load('vehicle');

        return Inertia::render('Admin/Contacts/Show', compact('contact'));
    }

    public function reply(Request $request, Contact $contact)
    {
        $request->validate([
            'message' => 'required|string|max:5000',
        ]);

        Mail::to($contact->email)
            ->send(new RespuestaContacto($contact->load('vehicle'), $request->message));

        $contact->update([
            'replied_at' => now(),
            'read_at'    => $contact->read_at ?? now(),
        ]);

        return back()->with('success', "Respuesta enviada a {$contact->email}.");
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();

        return redirect()->route('admin.contactos.index')->with('success', 'Solicitud eliminada.');
    }
}
