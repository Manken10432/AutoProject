<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class VehicleController extends Controller
{
    public function index()
    {
        $vehicles = Vehicle::latest()->paginate(15);
        return Inertia::render('Admin/Vehicles/Index', compact('vehicles'));
    }

    public function create()
    {
        return Inertia::render('Admin/Vehicles/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'brand'        => 'required|string|max:100',
            'model'        => 'required|string|max:100',
            'year'         => 'required|integer|min:1990|max:2030',
            'price'        => 'required|numeric|min:0',
            'mileage'      => 'required|integer|min:0',
            'fuel_type'    => 'required|string',
            'transmission' => 'required|string',
            'color'        => 'nullable|string|max:50',
            'description'  => 'nullable|string',
            'featured'     => 'nullable|boolean',
            'status'       => 'required|string|in:available,sold',
            'images.*'     => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        $validated['featured'] = $request->boolean('featured');
        $imagePaths = [];

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('vehicles', 'public');
                $imagePaths[] = Storage::url($path);
            }
        }

        $validated['images'] = !empty($imagePaths) ? $imagePaths : null;

        Vehicle::create($validated);

        return redirect()->route('admin.vehiculos.index')->with('success', 'Vehículo creado exitosamente.');
    }

    public function edit(Vehicle $vehiculo)
    {
        return Inertia::render('Admin/Vehicles/Edit', compact('vehiculo'));
    }

    public function update(Request $request, Vehicle $vehiculo)
    {
        $validated = $request->validate([
            'brand'        => 'required|string|max:100',
            'model'        => 'required|string|max:100',
            'year'         => 'required|integer|min:1990|max:2030',
            'price'        => 'required|numeric|min:0',
            'mileage'      => 'required|integer|min:0',
            'fuel_type'    => 'required|string',
            'transmission' => 'required|string',
            'color'        => 'nullable|string|max:50',
            'description'  => 'nullable|string',
            'featured'     => 'nullable|boolean',
            'status'       => 'required|string|in:available,sold',
            'images.*'     => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        $validated['featured'] = $request->boolean('featured');

        if ($request->hasFile('images')) {
            $imagePaths = $vehiculo->images ?? [];
            foreach ($request->file('images') as $image) {
                $path = $image->store('vehicles', 'public');
                $imagePaths[] = Storage::url($path);
            }
            $validated['images'] = $imagePaths;
        }

        $vehiculo->update($validated);

        return redirect()->route('admin.vehiculos.index')->with('success', 'Vehículo actualizado exitosamente.');
    }

    public function destroy(Vehicle $vehiculo)
    {
        if (!empty($vehiculo->images)) {
            foreach ($vehiculo->images as $imageUrl) {
                $path = str_replace('/storage/', '', $imageUrl);
                Storage::disk('public')->delete($path);
            }
        }

        $vehiculo->delete();

        return redirect()->route('admin.vehiculos.index')->with('success', 'Vehículo eliminado.');
    }

    public function removeImage($id, $index)
    {
        $vehicle = Vehicle::findOrFail($id);
        $images = $vehicle->images ?? [];

        if (isset($images[$index])) {
            $path = ltrim(str_replace('/storage', '', $images[$index]), '/');
            Storage::disk('public')->delete($path);
            array_splice($images, $index, 1);
            $vehicle->update(['images' => array_values($images)]);
        }

        return back()->with('success', 'Imagen eliminada.');
    }

    public function toggleFeatured($id)
    {
        $vehicle = Vehicle::findOrFail($id);
        $vehicle->update(['featured' => !$vehicle->featured]);

        return back()->with('success', 'Estado destacado actualizado.');
    }

    public function toggleStatus($id)
    {
        $vehicle = Vehicle::findOrFail($id);
        $newStatus = $vehicle->status === 'available' ? 'sold' : 'available';
        $vehicle->update(['status' => $newStatus]);

        return back()->with('success', 'Estado del vehículo actualizado.');
    }
}
