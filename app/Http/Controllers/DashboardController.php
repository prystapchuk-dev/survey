<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\SurveyAnswerResource;
use App\Models\Survey;
use App\Models\SurveyAnswer;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $total = Survey::query()->where('user_id', $user->id)->count();

        $latest = Survey::query()->where('user_id', $user->id)->latest('created_at')->first();

        $query = SurveyAnswer::query()
            ->join('surveys', 'survey_answers.survey_id', '=', 'survey_id')
            ->where('surveys.user_id', $user->id);

        $totalAnswers = $query->count();

        $latestAnswers = $query->orderBy('end_date', 'DESC')->limit(5)->getModels('survey_answers.*');

        return [
            'totalSurveys' => $total,
            'latestSurvey' => $latest ? new SurveyResource($latest) : null,
            'totalAnswers' => $totalAnswers,
            'latestAnswers' => SurveyAnswerResource::collection($latestAnswers),
        ];

    }
}
