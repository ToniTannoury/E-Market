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
        error_log(1);
        
        return  response()->json([
            'authorization' => [
                'token' => $token,
                'user' =>Auth::user(),
            ]
        ]);
    }

    public function register(Request $request)
    {
        
        $user=new User;
        $user->name= $request->name;
        $user->email=$request->email;
 
        $user->password=Hash::make($request->password);
        $user->phone_number=$request->phone_number;
        $user->type=$request->type;
        error_log($user);
        error_log($request->password);
        

       error_log(1111);
       ;
        return response()->json([
            'message' => 'User created successfully',
            'user' => $user->save()
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
