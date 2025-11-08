// This is a server-side Node.js function.
// e.g., /api/submit-lead.js

export default async function handler(request, response) {
    // 1. Only allow POST requests
    if (request.method !== 'POST') {
        return response.status(405).json({ message: 'Method Not Allowed' });
    }

    // 2. Get the data from the frontend
    const formData = request.body;

    // 3. Define the *SECRET* key and real API endpoint
    // THIS KEY IS NOW SAFE ON YOUR SERVER
    // (Better: Store this as an Environment Variable!)
    const SECRET_API_KEY = "JjzbwhzxA7rc9sm50EgnJiFsa";
    const CRM_API_ENDPOINT = "https://crmapi.sigmamis.in/api/CreateLead";

    // 4. Combine frontend data with the secret key
    const completePayload = {
        ...formData,
        apiKey: SECRET_API_KEY
    };

    // 5. Make the *real* API call from the server
    try {
        const crmResponse = await fetch(CRM_API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(completePayload)
        });

        const crmData = await crmResponse.json();

        if (!crmResponse.ok) {
            // Forward the error from the CRM
            throw new Error(crmData.message || 'CRM API submission failed');
        }

        // 6. Send the success response back to *your* frontend
        return response.status(200).json(crmData);

    } catch (error) {
        // 7. Send an error response back to *your* frontend
        return response.status(500).json({ message: error.message });
    }
}