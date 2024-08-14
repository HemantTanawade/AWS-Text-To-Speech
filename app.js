document.getElementById('textForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const textInput = document.getElementById('textInput').value;
    const outputDiv = document.getElementById('output');
    
    // Clear previous output
    outputDiv.innerHTML = '';

    // Display loading message
    outputDiv.textContent = 'Processing...';

    try {
        const response = await fetch('https://79j0cnvtn5.execute-api.ap-south-1.amazonaws.com/default/PollyLambdaFunction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: textInput })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        // Display the S3 URL
        outputDiv.innerHTML = `
            <p>${data.message}</p>
            <a href="${data.s3Url}" target="_blank">Download Synthesized Speech</a>
        `;
    } catch (error) {
        outputDiv.textContent = `Error: ${error.message}`;
    }
});
