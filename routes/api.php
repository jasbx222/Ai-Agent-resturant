<?php
use App\Http\Controllers\Admin\SettingController;
Route::get('/settings', [SettingController::class, 'getSettings']);