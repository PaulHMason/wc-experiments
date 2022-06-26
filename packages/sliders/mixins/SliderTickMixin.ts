import { Constructor } from '../utils/MixinConstructor.js';
import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { Ticks } from './Tick.js';

declare interface SliderTickMixinInterface {
    ticks: Ticks;
}

export function SliderTickMixin<T extends Constructor<LitElement>>(constructor: T): T & Constructor<SliderTickMixinInterface> {
    class SliderTickClass extends constructor {
        @property({ type: Array })
        public ticks: Ticks = null;
    };

    return SliderTickClass;
}