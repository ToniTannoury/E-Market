<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::apiResource("register" , AuthController::class);
Route::post("/login" , [AuthController::class , "login"]);
Route::get("/favorites/{id}" , [FavoriteController::class , "index"]);
Route::apiResource("products" , ProductController::class);
Route::apiResource("favorites" , FavoriteController::class);
Route::apiResource("users" , UserController ::class);



