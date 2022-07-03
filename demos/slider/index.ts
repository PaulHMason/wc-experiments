import './components/radial-slider.js';
import './components/test-slider.js';

window.addEventListener('load', () => {
    const slider = document.getElementById('slider') as any;
    slider.value = { x: 25, y: 75 };
});