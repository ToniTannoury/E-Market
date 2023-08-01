<?php

namespace App\Http\Controllers;

use App\Filters\ProductsFilter;
use App\Models\Favorite;
use App\Models\User;
use App\Models\Product;
use App\Http\Requests\StoreFavoriteRequest;
use App\Http\Requests\UpdateFavoriteRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;


class FavoriteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user_id = $request->segment(3);
        
        $favorites = Favorite::where('user_id', $user_id)->get();
        return response()->json($favorites);
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFavoriteRequest $request)
    {
        $userId = $request->input('user_id');
        $productId = $request->input('product_id');

        // Check if the customer and product exist
        $user = User::find($userId);
        $product = Product::find($productId);

        if (!$user || !$product) {
            return response()->json(['message' => 'User or Product not found'], 404);
        }

        // Check if the favorite already exists
        if ($user->favoriteProducts()->where('product_id', $productId)->exists()) {
            return response()->json(['message' => 'Product is already a favorite'], 409);
        }

        // Create a new favorite record in the database
        $favorite = new Favorite();

        $favorite->user_id = $userId;
        $favorite->product_id = $productId;
        $favorite->save();

        return response()->json(['message' => 'Product added to favorites'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Favorite $favorite)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Favorite $favorite)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFavoriteRequest $request, Favorite $favorite)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Favorite $favorite)
    {
         if (!$favorite) {
            return response()->json(['message' => 'Favorite not found'], 404);
        }

        // Delete the favorite record from the database
        $favorite->delete();

        return response()->json(['message' => 'Favorite removed'], 200);
    }
}
