export const getMedia = async (
  constraints?: MediaStreamConstraints
): Promise<MediaStream | undefined> => {
  try {
    return navigator.mediaDevices.getUserMedia(constraints);
  } catch (err) {
    alert("Can't get user media.");
  }
};
