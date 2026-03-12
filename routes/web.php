<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\Admin;
use Illuminate\Support\Facades\Route;

// Public routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/seminuevos', [VehicleController::class, 'index'])->name('vehicles.index');
Route::get('/seminuevos/{id}', [VehicleController::class, 'show'])->name('vehicles.show');
Route::get('/cotizacion', [ContactController::class, 'index'])->name('contact.index');
Route::post('/cotizacion', [ContactController::class, 'store'])->name('contact.store')->middleware('throttle:contact');
Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');
Route::get('/robots.txt', [SitemapController::class, 'robots'])->name('robots');

// Admin auth
Route::get('/admin/login', [Admin\AuthController::class, 'showLogin'])->name('admin.login');
Route::post('/admin/login', [Admin\AuthController::class, 'login'])->name('admin.login.post')->middleware('throttle:admin-login');
Route::post('/admin/logout', [Admin\AuthController::class, 'logout'])->name('admin.logout');

// Admin protected
Route::prefix('admin')->name('admin.')->middleware('admin.auth')->group(function () {
    Route::get('/', [Admin\DashboardController::class, 'index'])->name('dashboard');
    Route::resource('vehiculos', Admin\VehicleController::class);
    Route::get('contactos', [Admin\ContactController::class, 'index'])->name('contactos.index');
    Route::get('contactos/{contact}', [Admin\ContactController::class, 'show'])->name('contactos.show');
    Route::post('contactos/{contact}/reply', [Admin\ContactController::class, 'reply'])->name('contactos.reply');
    Route::delete('contactos/{contact}', [Admin\ContactController::class, 'destroy'])->name('contactos.destroy');
    Route::patch('vehiculos/{id}/featured', [Admin\VehicleController::class, 'toggleFeatured'])->name('vehiculos.featured');
    Route::patch('vehiculos/{id}/status', [Admin\VehicleController::class, 'toggleStatus'])->name('vehiculos.status');
    Route::delete('vehiculos/{id}/imagen/{index}', [Admin\VehicleController::class, 'removeImage'])->name('vehiculos.imagen.destroy');
});
