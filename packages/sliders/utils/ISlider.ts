import { Vector2, SliderLimit, SliderStep, SliderValue, SliderValueMap, SliderPad, Movement } from "./SliderTypes.js";

export interface ISlider {
    value: SliderValue;
    min: SliderLimit;
    max: SliderLimit;
    step: SliderStep;
    valueMap: SliderValueMap;
    pad: SliderPad;
    thumbPositions: Array<Vector2>;
}