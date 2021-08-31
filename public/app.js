let transmitting = false;
const volumeDisplay = document.querySelector('#volumeDisplay');
async function submitNewVolume(volume) {
  if (transmitting) return;
  transmitting = true;
  await fetch('/volume', { method: 'PUT', body: JSON.stringify({volume}), headers: { 'Content-Type': 'application/json' } });
  volumeDisplay.innerHTML = volume;
  transmitting = false;
}
async function togglePlay() {
  const response = await fetch('/toggle-play', { method: 'PUT' });
  console.log(response);
}
async function main() {
  const volumeResponse = await fetch('/volume');
  if (!volumeResponse.ok) {
    alert('could not load system volume. are you sure the server is running properly?');
    return;
  }
  const volume = await volumeResponse.json();
  document.querySelector('#volume').value = volume;
  volumeDisplay.innerHTML = volume;
  document.querySelector('main').classList.remove('visually-hidden');
}
