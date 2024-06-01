<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\KategorieController;
use App\Http\Controllers\ProduktController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');
Route::post("/register", [AuthController::class, "register"]);
Route::post("/login", [AuthController::class, "login"]);

Route::middleware('auth:sanctum')->group(function () {
    // Kategorie routes
    Route::get('/kategorie', [KategorieController::class, 'index']);
    Route::post('/vytvorkategorii', [KategorieController::class, 'store']);
    Route::get('/kategorie/{id}', [KategorieController::class, 'show']);

    // Produkt routes
    Route::get('/produkty', [ProduktController::class, 'index']);
    Route::post('/vytvorprodukt', [ProduktController::class, 'store']);
    Route::get('/produkty/{id}', [ProduktController::class, 'show']);
    Route::post('/upravitprodukty/{id}', [ProduktController::class, 'update']);
    Route::post('/produkt/smazat/{id}', [ProduktController::class, 'destroy']);
    Route::post('/produkt/aktivovat/{id}', [ProduktController::class, 'aktivovat']);
});
