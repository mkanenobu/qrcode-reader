export const getMedia = (
  constraints?: MediaStreamConstraints
): Promise<MediaStream | undefined> => {
  return navigator.mediaDevices.getUserMedia(constraints);
};
