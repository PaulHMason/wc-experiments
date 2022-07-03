import { Movement, Vector2 } from "./SliderTypes.js";

export interface ISliderController {
    thumbPositions: Array<Vector2>;
    movement: Movement;
}