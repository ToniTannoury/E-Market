<?php

namespace App\Http\Resources;

use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'name'=>$this->name,
            'type'=>$this->type,
            'email'=>$this->email,
            'password'=>$this->password,
            'phone_number'=>$this->phone_number,
            'products'=> ProductResource::collection($this->whenLoaded('products')),
            'favorites'=> FavoriteResource::collection($this->whenLoaded('products'))
        ];
    }
}
