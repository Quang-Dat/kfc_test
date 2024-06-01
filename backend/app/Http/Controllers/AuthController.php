<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate(
            [
                "email" => ["required", "email", "unique:users"],
                "password" => ["required", "min:8"],
                "password2" => ["required", "min:8"]
            ]
        );

        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        return response()->json([
            'user' => $user,
        ]);
    }
    public function login(Request $request)
    {
        $data = $request->validate(
            [
                "email" => ["required", "string", "exists:users"],
                "password" => ["required", "min:8"]
            ]
        );

        $user = User::where("email", $data["email"])->first();

        if (!$user || !Hash::check($data["password"], $user->password)) {
            return response()->json([
                "zprava" => "Email nebo heslo je nesprávné."
            ], 401);
        }

        $token = $user->createToken("auth_token")->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
