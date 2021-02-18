import { playSoundBtn } from "./sound";

export default class ButtonGameClass {
    constructor(id, color, soundFile) {
      this.id = id;
      this.color = color;
      this.soundFile = soundFile;
      this.errorFile = "error.mp3";
    }
      buttonSound () {
        playSoundBtn(this.soundFile);
      };
      errorSound () {
        playSoundBtn(this.errorFile);
      };
  }

  export const redButton = new ButtonGameClass("1", "darkred", "redsound.mp3")
  export const greenButton = new ButtonGameClass("2", "darkgreen", "greensound.mp3")
  export const yellowButton = new ButtonGameClass("3", "goldenrod", "yellowsound.mp3")
  export const blueButton = new ButtonGameClass("4", "darkblue", "bluesound.mp3")
  