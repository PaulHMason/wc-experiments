import { Constructor } from '../utils/MixinConstructor.js';
import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { Ticks } from './Tick.js';

export type AreaTicks = {
    x: Ticks,
    y: Ticks
}

export interface AreaSliderTickMixinInterface {
    ticks: AreaTicks;
}

export function AreaSliderTickMixin<T extends Constructor<LitElement>>(constructor: T): T & Constructor<AreaSliderTickMixinInterface> {
    class AreaSliderTickClass extends constructor {
        @property({ type: Array })
        public ticks: AreaTicks = null;
    };

    return AreaSliderTickClass;
}