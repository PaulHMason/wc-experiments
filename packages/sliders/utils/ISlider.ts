import { Position2D, SliderLimit, SliderStep, SliderValue, SliderValueMap, SliderPad } from "./SliderTypes.js";

export interface ISlider {
    value: SliderValue;
    min: SliderLimit;
    max: SliderLimit;
    step: SliderStep;
    valueMap: SliderValueMap;
    pad: SliderPad;
    thumbPositions: Array<Position2D>;
}