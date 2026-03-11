<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;

class SitemapController extends Controller
{
    public function index()
    {
        $vehicles = Vehicle::where('status', 'available')->latest()->get(['id', 'updated_at']);

        return response()
            ->view('sitemap', compact('vehicles'))
            ->header('Content-Type', 'application/xml');
    }

    public function robots()
    {
        $content = "User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /admin/\n\nSitemap: " . url('/sitemap.xml') . "\n";

        return response($content, 200)->header('Content-Type', 'text/plain');
    }
}
