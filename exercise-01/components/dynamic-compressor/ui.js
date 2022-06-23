import Drawable from '../drawable'

export default class DynamicCompressorUI extends Drawable {
    constructor() {
        super();
        // binds
        this.draw = this.draw.bind(this)
        // dynamic compressor
        this.dc_attackSlider = null;
        this.dc_kneeSlider = null;
        this.dc_releaseSlider = null;
        this.dc_ratioSlider = null;
        this.dc_thresholdSlider = null;
        this.dc_dryWetSlider = null;
        this.dc_outputSlider = null;
    }

    draw() {
        // dynamic compressor
        textSize(14);
        text('dynamic compressor', 210, 80);
        textSize(10);
        this.dc_attackSlider = createSlider(0, 1, 0.5, 0.01);
        this.dc_attackSlider.position(210, 110);
        text('attack', 210, 105);
        this.dc_kneeSlider = createSlider(0, 1, 0.5, 0.01);
        this.dc_kneeSlider.position(210, 155);
        text('knee', 210, 150);
        this.dc_releaseSlider = createSlider(0, 1, 0.5, 0.01);
        this.dc_releaseSlider.position(210, 200);
        text('release', 210, 195);
        this.dc_ratioSlider = createSlider(0, 1, 0.5, 0.01);
        this.dc_ratioSlider.position(210, 245);
        text('ratio', 210, 240);
        this.dc_thresholdSlider = createSlider(0, 1, 0.5, 0.01);
        this.dc_thresholdSlider.position(360, 110);
        text('threshold', 360, 105);
        this.dc_dryWetSlider = createSlider(0, 1, 0.5, 0.01);
        this.dc_dryWetSlider.position(360, 155);
        text('dry/wet', 360, 150);
        this.dc_outputSlider = createSlider(0, 1, 0.5, 0.01);
        this.dc_outputSlider.position(360, 200);
        text('output level', 360, 195);
    }
}