<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FundraiserController;
use App\Http\Controllers\DonationController;

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::put('/users/{id}', [UserController::class, 'updateUser']);
Route::delete('/users/{id}', [UserController::class, 'deleteUser']);
Route::get('/users/{id}', [UserController::class, 'getUserDetails']);
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/fundraisers', [FundraiserController::class, 'createFundraiser']); // Create a fundraiser
    Route::get('/fundraisers', [FundraiserController::class, 'getAllFundraisers']); // Get all fundraisers
    Route::get('/user-fundraisers', [FundraiserController::class, 'getFundraisersByUser']); // Get all fundraisers by user token
    Route::get('/fundraisers/{id}', [FundraiserController::class, 'getFundraiser']); // Get a fundraiser by ID
    Route::put('/fundraisers/{id}', [FundraiserController::class, 'updateFundraiser']); // Update a fundraiser
    Route::delete('/fundraisers/{id}', [FundraiserController::class, 'deleteFundraiser']);
    Route::post('donations', [DonationController::class, 'createDonation']); // Create a donation
    Route::get('donations', [DonationController::class, 'getAllDonations']);// Get donations 
    Route::get('donations/{id}', [DonationController::class, 'getDonationById']);// Get a donation by ID
    Route::put('donations/{id}', [DonationController::class, 'updateDonation']);// Update a donation
    Route::delete('donations/{id}', [DonationController::class, 'deleteDonation']);// Delete a donation
});
