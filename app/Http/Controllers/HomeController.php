<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $featuredVehicles = Vehicle::featured()->available()->latest()->take(6)->get();

        return Inertia::render('Home', [
            'featuredVehicles' => $featuredVehicles,
        ]);
    }
}
