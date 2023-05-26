<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Http;

class HttpHelper
{
    private $headers = [];

    public function __construct()
    {
        $this->headers = [
            'Content-Type' => 'application/json; utf-8',
        ];
    }

    public function get($url, $query, $headers= [])
    {

        $query = $this->validateOptions($query);

        $this->headers = array_merge($this->headers, $headers);

        $response = Http::withHeaders($this->headers)->get($url, $query);

        return $response->json();
    }

    public function post($url, $body, $headers = [])
    {

        $body = $this->validateOptions($body);

        $this->headers = array_merge($this->headers, $headers);

        $response = Http::withHeaders($this->headers)->post($url, $body);

        return $response->json();
    }

    private function validateOptions($options)
    {
        $opts = [];

        if ($options != null && sizeof($options) > 0) {
            $opts = array_merge($opts, $options);
        }

        return $opts;
    }
}
