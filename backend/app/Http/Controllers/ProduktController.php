<?php

namespace App\Http\Controllers;

use App\Models\Produkt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProduktController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Produkt::get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            "nazev" => ["required", "string", "min:3", "unique:produkts"],
            "popis" => ["required", "string", "min:3"],
            "cena" => ["required", "numeric", "min:0"],
            "obrazek" => ["required", "image", "mimes:jpeg,png,jpg,gif,webp", "max:2048"],
            "kategorie_id" => ["required", "exists:kategories,id"],
        ]);

        if ($request->hasFile('obrazek')) {
            $obrazek = $request->file('obrazek');
            $nazevSouboru = time() . '_' . $obrazek->getClientOriginalName();
            $cesta = $obrazek->storeAs('public/obrazky', $nazevSouboru);
            $data['obrazek'] = 'storage/obrazky/' . $nazevSouboru;
        }

        return Produkt::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $produkt = Produkt::find($id);
        if (!$produkt) {
            return response()->json(['message' => 'Produkt nenalezen'], 404);
        }
        return response()->json($produkt);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, String $id)
    {
        // Validace vstupu
        $data = $request->validate([
            'nazev' => ['required', 'string', 'min:3'],
            'popis' => ['required', 'string', 'min:3'],
            'cena' => ['required', 'numeric', 'min:0'],
            'obrazek' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:2048'],
            'kategorie_id' => ['required', 'exists:kategories,id'],
        ]);

        // Najít produkt podle ID
        $produkt = Produkt::findOrFail($id);

        // Aktualizace produktových dat
        $produkt->nazev = $data['nazev'];
        $produkt->popis = $data['popis'];
        $produkt->cena = $data['cena'];
        $produkt->kategorie_id = $data['kategorie_id'];

        // Zpracování obrázku, pokud byl nahrán
        if ($request->hasFile('obrazek')) {
            $obrazek = $request->file('obrazek');
            $nazevSouboru = time() . '_' . $obrazek->getClientOriginalName();
            $cesta = $obrazek->storeAs('public/obrazky', $nazevSouboru);
            $produkt->obrazek = 'storage/obrazky/' . $nazevSouboru;
        }

        // Uložení změn
        $produkt->save();

        return response()->json($produkt);
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $produkt = Produkt::findOrFail($id);
        $produkt->aktivni = 0;
        $produkt->save();

        return response()->json($produkt);
    }

    public function aktivovat(string $id)
    {
        $produkt = Produkt::findOrFail($id);
        $produkt->aktivni = 1;
        $produkt->save();

        return response()->json($produkt);
    }
}
