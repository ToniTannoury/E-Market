<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FavoriteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"=> $this->id,
            "customer_id"=> $this->customer_id,
            "title"=>$this->title,
            "amount"=> $this->amount,
            "description"=> $this->description,
        ];
    }   
}
