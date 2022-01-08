let transmitting = false;
let currentVolume;
const volumeDisplay = document.querySelector('#volumeDisplay');
const volumeSlider = document.querySelector('#volume');
async function submitNewVolume(volume) {
  if (transmitting) return;
  transmitting = true;
  volume = Math.min(100, Math.max(0, volume));
  await fetch('/volume', { method: 'PUT', body: JSON.stringify({volume}), headers: { 'Content-Type': 'application/json' } });
  volumeDisplay.innerHTML = volumeSlider.value = currentVolume = volume;
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
  volumeSlider.value = currentVolume = volume;
  volumeDisplay.innerHTML = volume;
  document.querySelector('main').classList.remove('visually-hidden');
}
