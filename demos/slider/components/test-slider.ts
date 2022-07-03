import { BaseSlider } from 'sliders/components/BaseSlider.js';
import { css, html } from 'lit';

export class TestSlider extends BaseSlider {
    static styles = css`
        :host {
            display: inline-block;
            position: relative;
            user-select: none;
            width: 200px;
            height: 200px;
            background-color: cornflowerblue;
        }

        .track {
            width: 100%;
            height: 100%;
        }

        .thumb {
            position: absolute;
            pointer-events: none;
            top: 0;
            left: 0;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background-color: yellow;
        }
    `;

    public render() {
        return html`
            <div class="track"></div>
            ${this.thumbPositions.map(thumb => html`
                <div class="thumb" style="left: ${thumb.x - 8}px; top: ${thumb.y - 8}px;"></div>
            `)}
        `;
    }
}

window.customElements.define('test-slider', TestSlider);