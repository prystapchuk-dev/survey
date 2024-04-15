<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;
use App\Http\Requests\StoreSurveyAnswerRequest;
use App\Http\Resources\SurveyResource;
use Illuminate\Http\Request;
use App\Models\Survey;
use App\Models\SurveyAnswer;
use App\Models\SurveyQuestionAnswer;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

use Illuminate\Validation\Rule;
use App\Models\SurveyQuestion;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Arr;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
       $user = $request->user();

       return SurveyResource::collection(Survey::where('user_id', $user->id)->paginate(5));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSurveyRequest $request)
    {
      $data = $request->validated();

      if($data['image']) {
        $relativePath = $this->saveImage($data['image']);
        $data['image'] = $relativePath;
      }

      $survey = Survey::create($data);

      foreach ($data['questions'] as $question) {
        $question['survey_id'] = $survey->id;
        $this->createQuestion($question);
      }

      return new SurveyResource($survey);
    }

    /**
     * Display the specified resource.
     */
    public function show(Survey $survey, Request $request)
    {
        $user = $request->user();
        if ($user->id !== $survey->user_id) {
            return abort(403, 'Неавторизована дія');
        }
        return new SurveyResource($survey);
    }

    /**
     * Display the specified resource.
     */
    public function showForGuest(Survey $survey)
    {

        return new SurveyResource($survey);
    }

    public function storeAnswer(StoreSurveyAnswerRequest $request, Survey $survey)
    {
        $validated = $request->validated();

        $surveyAnswer = SurveyAnswer::create([
            'survey_id' => $survey->id,
            'start_date' => date('Y-m-d H:i:s'),
            'end_date' => date('Y-m-d H:i:s'),
        ]);

        foreach ($validated['answers'] as $questionId => $answer) {
            $question = SurveyQuestion::where(['id' => $questionId, 'survey_id' => $survey->id])->get();


            if (!$question) {
                return response('Invalid question ID', 400);
            }

            $data = [
                'survey_question_id' => $questionId,
                'survey_answer_id' => $surveyAnswer->id,
                'answer' => is_array($answer) ? json_encode($answer) : $answer,
            ];

           $questionAnswer =  SurveyQuestionAnswer::create($data);

        }

        return response('', 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSurveyRequest $request, Survey $survey)
    {
        $data = $request->validated();

        if(isset($data['image'])) {
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;

            if($survey->image) {
                $absolutePath = public_path($survey->image);
                File::delete($absolutePath);
            }
          }

        $survey->update($data);

        $existingIds = $survey->questions()->pluck('id')->toArray();
        $newIds = Arr::pluck($data['questions'], 'id');

        $toDelete = array_diff($existingIds, $newIds);
        $toAdd = array_diff($newIds, $existingIds);

        SurveyQuestion::destroy($toDelete);

        foreach ($data['questions'] as $question) {
            if (in_array($question['id'], $toAdd)) {
                $question['survey_id'] = $survey->id;
                $this->createQuestion($question);
            }
        }

        $questionMap = collect($data['questions'])->keyBy('id');
        foreach ($survey->questions as $question) {
            if (isset($questionMap[$question->id])) {
                $this->updateQuestion($question, $questionMap[$question->id]);
            }
        }

        return new SurveyResource($survey);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Survey $survey, Request $request)
    {
        $user = $request->user();

        if ($user->id !== $survey->user_id) {
            return abort(403, 'Неавторизована дія');
        }

        $survey->delete();

        if($survey->image) {
            $absolutePath = public_path($survey->image);
            File::delete($absolutePath);
        }

        return response('', 204);
    }

    private function saveImage($image)
    {
        if(preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {
            $image = substr($image, strpos($image, ',') + 1);
            $type = strtolower($type[1]);

            if(!in_array($type, ['jpg', 'jpeg', 'gif', 'png'])) {
                throw new Exception('Невідповідний формат зображення');
            }

            $image = str_replace(' ', '+', $image);
            $image = base64_decode($image);

            if ($image === false) {
                throw new Exception('base64_decode завершилось помилкою');
            }

        } else {
            throw new Exception('Немає данних url в даних зображення');
        }

        $dir = 'images/';
        $file = Str::random() . '.' . $type;
        $absolutePath = public_path($dir);
        $relativePath = $dir . $file;

        if (!File::exists($absolutePath)) {
            File::makeDirectory($absolutePath, 0755, true);
        }
        file_put_contents($relativePath, $image);

        return $relativePath;
    }

    private function createQuestion($question)
    {
        if (is_array($question['data'])) {
            $question['data'] = json_encode($question['data']);
        }

        $validator = Validator::make($question, [
            'question' => 'required|string',
            'type' => ['required', Rule::in([
                Survey::TYPE_TEXT,
                Survey::TYPE_TEXTAREA,
                Survey::TYPE_SELECT,
                Survey::TYPE_RADIO,
                Survey::TYPE_CHECKBOX,
            ])],
            'description' => 'nullable|string',
            'data' => 'present',
            'survey_id' => 'exists:App\Models\Survey,id'
        ]);

        return SurveyQuestion::create($validator->validated());
    }

    private function updateQuestion(SurveyQuestion $question, $data)
    {
        if (is_array($data['data'])) {
            $data['data'] = json_encode($data['data']);
        }

        $validator = Validator::make($data, [
            'id' => 'exists:App\Models\SurveyQuestion,id',
            'question' => 'required|string',
            'type' => ['required', Rule::in([
                Survey::TYPE_TEXT,
                Survey::TYPE_TEXTAREA,
                Survey::TYPE_SELECT,
                Survey::TYPE_RADIO,
                Survey::TYPE_CHECKBOX,
            ])],
            'description' => 'nullable|string',
            'data' => 'present',
        ]);

        return $question->update($validator->validated());
    }
}
