<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Http\Resources\CustomerResource;
use App\Http\Resources\FavoriteResource;
use App\Http\Resources\FavoritesCollection;
use Illuminate\Http\Request; 

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['show']]);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreCustomerRequest $request)
    {
   
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $includeProducts  = request()->query('includeProducts');
        $includeFavorites  = request()->query('includeFavorites');
        if($includeProducts){
            return ($user->loadMissing('products'));
        }elseif( $includeFavorites){
             return ($user->loadMissing('favoriteProducts'));
        }
        return new CustomerResource($user); 
    }

   

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerRequest $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
