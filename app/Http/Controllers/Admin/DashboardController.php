<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\Vehicle;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total'     => Vehicle::count(),
            'available' => Vehicle::where('status', 'available')->count(),
            'sold'      => Vehicle::where('status', 'sold')->count(),
            'featured'  => Vehicle::where('featured', true)->count(),
        ];

        $recentContacts = Contact::with('vehicle')->latest()->take(10)->get();

        return Inertia::render('Admin/Dashboard', [
            'stats'          => $stats,
            'recentContacts' => $recentContacts,
        ]);
    }
}
