const VIBRAPHONE_TONE_MIN = 0;
const VIBRAPHONE_TONE_MAX = 255;

/**
 * Tries to fit used notes into a nice musical scale.
 * The same tone list is returned if the task is impossible.
 *
 * @param   {Array<number>}      tones    - The input tones used in the music.
 * @param   {number}             count    - Amount of notes this scale needs to contain (generally 11).
 * @param   {number}             interval - The interval between the tones.
 * @returns {Array<number>}
 */
const fitScale = (tones, count, interval) => {
  // If we have no tones, create a basic scale starting at VIBRAPHONE_TONE_MIN.
  if (tones.length === 0) {
    return [...Array(count).keys().map(v=>VIBRAPHONE_TONE_MIN+v*interval)]
  }

  // If we have a single tone, create a basic scale with that note in the middle.
  if (tones.length === 1) {
    // Find beginning of the scale and make sure we don't get a negative scale.
    const beginning = Math.max(tones[0] - Math.floor(count/2), VIBRAPHONE_TONE_MIN);

    return [...Array(count).keys().map(v=>beginning+v*interval)]
  }

  // Check if tones share the given interval. An interval of 1 always matches.
  if (interval !== 1) {
    // Get the mod of the first tone, all tones should match this.
    const mod = tones[0] % interval;

    for (const tone of tones) {
      if ((tone % interval) !== mod) {
        // The task is impossible, return the unedited tone list.
        return tones
      }
    }
  }

  // Get the lowest and highest tones.
  const lowestTone = Math.min(...tones);
  const highestTone = Math.max(...tones);

  // Calculate the biggest note if we would use the lowestNote as a start of the scale.
  const topNote = lowestTone + count*interval - 1;

  // The $lowestTone + count*interval$ should be bigger than the highestTone. If not, the task is impossible.
  if (topNote < highestTone) {
    return tones
  }


};