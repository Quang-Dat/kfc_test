<?php

namespace App\Http\Controllers;

use App\Models\Kategorie;
use Illuminate\Http\Request;

class KategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Kategorie::get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            "nazev" => ["required", "string", "min:3", "unique:kategories"]
        ]);

        return Kategorie::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $kategorie = Kategorie::find($id);
        if (!$kategorie) {
            return response()->json(['message' => 'Kategorie nenalezen'], 404);
        }
        return response()->json($kategorie);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
