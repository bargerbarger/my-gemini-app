const submitBtn = document.getElementById('submit-btn');
const promptInput = document.getElementById('prompt-input');
const responseContainer = document.getElementById('response-container');

submitBtn.addEventListener('click', async () => {
    const prompt = promptInput.value;
    if (!prompt) {
        alert('Please enter a prompt!');
        return;
    }

    responseContainer.innerText = 'Thinking...';
    submitBtn.disabled = true;

    try {
        // This sends the user's prompt to our serverless function
        const response = await fetch('/.netlify/functions/ask-gemini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: prompt }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        responseContainer.innerText = data.text;

    } catch (error) {
        console.error('Error:', error);
        responseContainer.innerText = 'An error occurred. Please check the console.';
    } finally {
        submitBtn.disabled = false;
    }
});