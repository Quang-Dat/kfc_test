<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('produkts', function (Blueprint $table) {
            $table->id();
            $table->text("nazev");
            $table->text("popis");
            $table->integer("cena");
            $table->string('obrazek');
            $table->bigInteger('kategorie_id')->unsigned()->index();
            $table->tinyInteger('aktivni')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produkts');
    }
};
