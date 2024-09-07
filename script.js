// script.js

// Function to call Microsoft Translator API for transliteration
async function translateText(text) {
    const url = 'https://microsoft-translator-text.p.rapidapi.com/translate?to=mr&api-version=3.0';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'a31edf94ccmsh591b19161e4448fp1f3636jsn3cd66e78c9ef', // Replace with your RapidAPI key
            'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
        },
        body: JSON.stringify([{ text }])
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result[0].translations[0].text; // Extract translated text
    } catch (error) {
        console.error('Error:', error);
        return '';
    }
}

// Event listener for real-time transliteration
document.getElementById('inputText').addEventListener('input', async function (event) {
    const inputText = event.target.value;
    const lastChar = inputText.charAt(inputText.length - 1);
    
    if (lastChar === ' ') {
        const words = inputText.trim().split(' ');
        const lastWord = words[words.length - 1];
        
        if (lastWord) {
            const translatedWord = await translateText(lastWord);
            words[words.length - 1] = translatedWord; // Replace the last word with the translation
            document.getElementById('outputText').value = words.join(' ') + ' ';
        }
    }
});

// Clear button functionality
document.getElementById('clearBtn').addEventListener('click', function () {
    document.getElementById('inputText').value = '';
    document.getElementById('outputText').value = '';
});

// Copy button functionality
document.getElementById('copyBtn').addEventListener('click', function () {
    const outputText = document.getElementById('outputText');
    outputText.select();
    document.execCommand('copy');
    alert('Text copied to clipboard!');
});