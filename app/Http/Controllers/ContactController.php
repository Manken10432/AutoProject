<?php

namespace App\Http\Controllers;

use App\Mail\NuevoContacto;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('Contact');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'       => 'required|string|max:255',
            'email'      => 'required|email|max:255',
            'phone'      => 'required|string|max:50',
            'vehicle_id' => 'nullable|exists:vehicles,id',
            'message'    => 'nullable|string|max:2000',
        ]);

        $contact = Contact::create($validated);

        if (config('mail.admin_address')) {
            Mail::to(config('mail.admin_address'))
                ->send(new NuevoContacto($contact->load('vehicle')));
        }

        return back()->with('success', '¡Gracias! Tu mensaje ha sido enviado. Te contactaremos pronto.');
    }
}
