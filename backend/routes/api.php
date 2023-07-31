<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\UserController;

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::apiResource("products" , ProductController::class);
    Route::apiResource("favorites" , FavoriteController::class);
    Route::apiResource("users" , UserController::class);


});

Route::get("/user" , [UserController::class , "show"]);