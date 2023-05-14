const saveButton = document.querySelector('#save-button');
const apiKeyInput = document.querySelector('#api-key');

saveButton.addEventListener('click', () => {
  const apiKey = apiKeyInput.value;
  chrome.storage.sync.set({apiKey}, () => {
    console.log('API Key saved successfully');
  });
});
