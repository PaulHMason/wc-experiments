import { Constructor } from '../utils/MixinConstructor.js';
import { LitElement } from 'lit';

export declare class AreaSliderMixinInterface {

}

export const AreaSliderMixin = <T extends Constructor<LitElement>>(superClass: T) => {
    class AreaSliderClass extends superClass {

    };

    return AreaSliderClass as Constructor<AreaSliderMixinInterface> & T;
}