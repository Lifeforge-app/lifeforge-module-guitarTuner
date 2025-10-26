export async function requestMicrophoneAccess(): Promise<MediaStream> {
  try {
    console.log('Requesting microphone access...')

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        autoGainControl: false,
        noiseSuppression: false
      }
    })

    console.log(
      'Microphone access granted, stream tracks:',
      stream.getTracks().length
    )

    return stream
  } catch (err) {
    console.error('Error accessing microphone:', err)
    throw new Error('Failed to access microphone. Please check permissions.')
  }
}
