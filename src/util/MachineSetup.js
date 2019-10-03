

/**
 * The marble machine X has:
 * - 11 vibraphone notes
 * - 4 percussion
 * - 4 bass strings
 * X2 make a total of 38 channels.
 *
 * Even though the notes of the percussion and bass are static, the vibraphone notes are changeable.
 *
 * This class represents the setup of the machine.
 */
export default class MachineSetup {
  constructor (vibraphone) {
    this.vibraphone = vibraphone;
  }

  /**
   * Figures out a machine setup based on a midi file.
   *
   * @param   {Midi}         midi
   * @returns {MachineSetup}
   */
  static fromMidi(midi) {
    for (const track of midi.tracks) {
      // Find the vibraphone track.
      if (track.instrument.family !== 'chromatic percussion') {
        continue;
      }

      // Find all the notes that are used for this track.
      const usedTones = [];
      for (const note of track.notes) {
        if (usedTones.includes(note.midi)) {
          continue;
        }

        usedTones.push(note.midi);
      }

      // If there are more than 11 tones, panic!
      if (usedTones.length > 11) {
        throw new Error(`vibraphone track uses too many notes: (${usedTones.length} > 11)`)
      }

      usedTones.sort();

      // Check if notes can be grouped.

      return MachineSetup(usedTones)
    }
  }
}