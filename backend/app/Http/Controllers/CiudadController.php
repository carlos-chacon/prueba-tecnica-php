<?php

namespace App\Http\Controllers;

use App\Helpers\HttpHelper;
use App\Http\Controllers\Controller;
use App\Models\WeatherLog;

class CiudadController extends Controller
{

    private $code_response = 200;
    private $api_key = null;
    private $url_api = null;
    private $query = [
        'lat' => '',
        'lon' => '',
        'lang' => 'es',
        'exclude' => 'hourly,daily,minutely',
        'appid' => '',
        'units' => 'metric',
    ];

    private $httpHelper;
    private $numberPage = 10;
    private $urlApiOpenStreetMap = 'https://nominatim.openstreetmap.org';

    public function __construct()
    {
        $this->api_key = env('API_KEY_OPEN_WEATHER_MAP');
        $this->url_api = env('URL_API_OPEN_WEATHER_MAP');
        $this->httpHelper = new HttpHelper();
    }

    public function obtenerHumedad($lat, $lon)
    {
        $this->query['lat'] = $lat;
        $this->query['lon'] = $lon;
        $this->query['appid'] = $this->api_key;

        $response = $this->httpHelper->get($this->url_api, $this->query);

        if (array_key_exists('cod', $response)) {
            $this->code_response = $response['cod'];
        }
        if ($this->code_response === 200) {
            $response['address'] = $this->getAddressGeolocation($lat, $lon);
            $this->storeWeatherLog($response);
        }
        return response()->json($response, $this->code_response);
    }

    public function storeWeatherLog($datos)
    {

        $weatherLog = new WeatherLog;
        $weatherLog->city = $datos['address'];
        $weatherLog->lat = $datos['lat'];
        $weatherLog->lon = $datos['lon'];
        $weatherLog->humidity = $datos['current']['humidity'];
        $weatherLog->timezone = $datos['timezone'];
        $weatherLog->weather = json_encode($datos['current']['weather'][0], JSON_FORCE_OBJECT);
        $weatherLog->save();

        return $weatherLog;
    }

    public function getWeatherLog()
    {
        $weatherLog = WeatherLog::orderBy('created_at', 'desc')->paginate($this->numberPage);
        return $weatherLog;
    }

    public function getAddressGeolocation($lat, $lon) {
        $reverseGeocoding = $this->httpHelper->get("{$this->urlApiOpenStreetMap}/reverse", [
            'format'=> 'jsonv2',
            'lat'=> $lat,
            'lon'=> $lon,
            'zoom'=> [0-10],
        ]);
        $response = '';
        if (!array_key_exists('error', $reverseGeocoding)) {
            $addressType = [
                'town', 'city', 'village', 'county'
            ];
            $addressFiltered = array_intersect_key($reverseGeocoding['address'], array_flip($addressType));

            $response = implode(', ', $addressFiltered);
        }
        return $response;
    }
}
