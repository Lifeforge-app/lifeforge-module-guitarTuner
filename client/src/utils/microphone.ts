export async function requestMicrophoneAccess(): Promise<MediaStream> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        autoGainControl: false,
        noiseSuppression: false
      }
    })

    return stream
  } catch (err) {
    console.error('Error accessing microphone:', err)
    throw new Error('Failed to access microphone. Please check permissions.')
  }
}
