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
        Schema::table('vehicles', function (Blueprint $table) {
            $table->decimal('down_payment', 12, 2)->nullable()->after('price');
            $table->decimal('monthly_payment', 12, 2)->nullable()->after('down_payment');
            $table->decimal('price', 12, 2)->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('vehicles', function (Blueprint $table) {
            $table->dropColumn(['down_payment', 'monthly_payment']);
            $table->decimal('price', 12, 2)->nullable(false)->change();
        });
    }
};
