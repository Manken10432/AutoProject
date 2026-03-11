<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehicleController extends Controller
{
    public function index(Request $request)
    {
        $query = Vehicle::available();

        if ($request->filled('brand')) {
            $brands = is_array($request->brand) ? $request->brand : [$request->brand];
            $query->whereIn('brand', $brands);
        }

        if ($request->filled('model')) {
            $query->where('model', 'like', '%' . $request->model . '%');
        }

        if ($request->filled('year_min')) {
            $query->where('year', '>=', $request->year_min);
        }

        if ($request->filled('year_max')) {
            $query->where('year', '<=', $request->year_max);
        }

        if ($request->filled('price_min')) {
            $query->where('price', '>=', $request->price_min);
        }

        if ($request->filled('price_max')) {
            $query->where('price', '<=', $request->price_max);
        }

        if ($request->filled('fuel_type')) {
            $fuelTypes = is_array($request->fuel_type) ? $request->fuel_type : [$request->fuel_type];
            $query->whereIn('fuel_type', $fuelTypes);
        }

        if ($request->filled('transmission')) {
            $transmissions = is_array($request->transmission) ? $request->transmission : [$request->transmission];
            $query->whereIn('transmission', $transmissions);
        }

        switch ($request->sort_by) {
            case 'price_asc':
                $query->orderBy('price', 'asc');
                break;
            case 'price_desc':
                $query->orderBy('price', 'desc');
                break;
            case 'year_desc':
                $query->orderBy('year', 'desc');
                break;
            case 'mileage_asc':
                $query->orderBy('mileage', 'asc');
                break;
            default:
                $query->latest();
                break;
        }

        $vehicles = $query->paginate(12)->withQueryString();

        $brands = Vehicle::available()->select('brand')->distinct()->orderBy('brand')->pluck('brand');
        $years = Vehicle::available()->select('year')->distinct()->orderBy('year', 'desc')->pluck('year');

        return Inertia::render('Vehicles/Index', [
            'vehicles' => $vehicles,
            'brands'   => $brands,
            'years'    => $years,
            'filters'  => $request->only(['brand', 'year_min', 'year_max', 'price_min', 'price_max', 'fuel_type', 'transmission', 'sort_by']),
        ]);
    }

    public function show($id)
    {
        $vehicle = Vehicle::findOrFail($id);

        $relatedVehicles = Vehicle::available()
            ->where('brand', $vehicle->brand)
            ->where('id', '!=', $vehicle->id)
            ->take(4)
            ->get();

        return Inertia::render('Vehicles/Show', [
            'vehicle'         => $vehicle,
            'relatedVehicles' => $relatedVehicles,
        ]);
    }
}
