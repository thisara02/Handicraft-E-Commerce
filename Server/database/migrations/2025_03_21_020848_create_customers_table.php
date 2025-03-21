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
        Schema::create('customers', function (Blueprint $table) {
            $table->id(); // Primary key for customers
            $table->foreignId('userID')->constrained('users')->onDelete('cascade'); // FK reference
            $table->string('profilePIC')->nullable();
            $table->string('cusName');
            $table->string('cusContact');
            $table->text('ship_Addr');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
