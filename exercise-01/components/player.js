import Drawable from './drawable'
import { PlaybackUI } from './playback'
import { LowpassUI } from './lowpass'
import { DynamicCompressorUI } from './dynamic-compressor'
import { VolumeUI } from './volume'
import { ReverbUI } from './reverb'
import { WaveShifterUI } from './wave-shifter'

export default class Player extends Drawable {
    constructor() {
        super();
        // binds
        this.draw = this.draw.bind(this)
        // controls
        this.playback = new PlaybackUI();
        this.lowPass = new LowpassUI();
        this.dynamicCompressor = new DynamicCompressorUI()
        this.volume = new VolumeUI();
        this.reverb = new ReverbUI();
        this.waveShifter = new WaveShifterUI()
    }

    draw() {
        this.playback.draw();
        this.lowPass.draw();
        this.dynamicCompressor.draw();
        this.volume.draw();
        this.reverb.draw();
        this.waveShifter.draw();
    }
}