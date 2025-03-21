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
        Schema::create('user_groups', function (Blueprint $table) {
            $table->id(); // This is the primary key for user_groups table
            $table->foreignId('userID')->constrained('users')->onDelete('cascade'); // Correct foreign key
            $table->foreignId('groupID')->constrained('groups')->onDelete('cascade'); // Correct foreign key
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_groups');
    }
};
