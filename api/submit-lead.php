<?php
// This is your backend script.

// 1. Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); 
    echo json_encode(['message' => 'Method Not Allowed']);
    exit;
}

// 2. Get the data from the frontend (sent as JSON)
$formData = json_decode(file_get_contents('php://input'), true);

// 3. Define the *SECRET* key and real API endpoint
// THIS KEY IS NOW SAFE ON YOUR SERVER
$SECRET_API_KEY = "JjzbwhzxA7rc9sm50EgnJiFsa"; 
$CRM_API_ENDPOINT = "https://crmapi.sigmamis.in/api/CreateLead";

// 4. Combine frontend data with the secret key
$completePayload = $formData;
$completePayload['apiKey'] = $SECRET_API_KEY;

// 5. Make the *real* API call using cURL
$ch = curl_init($CRM_API_ENDPOINT);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($completePayload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Content-Length: ' . strlen(json_encode($completePayload))
]);

$crmResponse = curl_exec($ch); // Execute the call
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE); // Get the status
curl_close($ch);

// 6. Send the CRM's response back to *your* frontend
http_response_code($httpcode); // Forward the status code
header('Content-Type: application/json');
echo $crmResponse; // Forward the exact response (success or error)
?>