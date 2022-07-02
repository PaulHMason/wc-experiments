import { css, html, LitElement, PropertyPart, PropertyValueMap } from 'lit';
import { property } from 'lit/decorators.js';

export class RadialSlider extends LitElement {
    static styles = css`
        :host {
            display: inline-block;
            position: relative;
            width: 200px;
            height: 200px;
            user-select: none;
        }

        #track {
            width: 100%;
            height: 100%;
            padding: 20px;
            box-sizing: border-box;
            background-color: cornflowerblue
        }

        #visual-track {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border-radius: 50%;
            border: 1px solid white;
        }

        #thumb {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background-color: yellow;
        }
    `;

    @property({ type: Number })
    public min: number = 0;

    @property({ type: Number })
    public max: number = 100;

    @property({ type: Number })
    public value: number = 50;

    @property({ type: Number, attribute: 'track-width' })
    public trackWidth: number = 20;

    /*
    protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        super.updated(changedProperties);
    }
    */

    protected render() {
        return html`
            <div id="track"><div id="visual-track" style="border-width: ${this.trackWidth}px;"></div></div>
            <div id="thumb"></div>
        `;
    }
}

window.customElements.define('radial-slider', RadialSlider)