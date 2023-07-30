<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function login(Request $request)
    {
        // $request->validate([
        //     'email' => 'required',
        //     'password' => 'required',
        // ]);
        $credentials = $request->only('email', 'password');
        error_log($request->email);
        error_log($request->password);
        $token = Auth::attempt($credentials);
        error_log($token);
        if (!$token) {
            return response()->json([
                'message' => 'Unauthorized',
            ],401);
        }
        return response([
            'authorization' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ],200);
    }

    public function register(Request $request)
    {
        
        $user=new User;
        $user->name= $request->name;
        $user->email=$request->email;
 
        $user->password=Hash::make($request->password);
        $user->phone_number=$request->phone_number;
        $user->type=$request->type;
        $user->save();

       

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user
        ]);
    }
 

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }
}
