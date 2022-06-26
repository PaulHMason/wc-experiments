import { ReactiveControllerHost } from 'lit';
import { BaseSliderController } from './BaseSliderController.js';

export class SingleSliderController extends BaseSliderController {
    constructor(host: ReactiveControllerHost) {
        super(host);
    }
}