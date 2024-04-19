<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\SurveyResource;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class SurveyAnswerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'survey' => new SurveyResource($this->survey),
            'end_date' => (new Carbon($this->end_date))->format('Y-m-d H:i:s'),

        ];
    }
}
