import './style.css'

import { DinoAnimation } from './animations'
import { initializeTestOne } from './tests/one.ts'
import { initializeTestTwo } from './tests/two.ts'
import { initializeTestThree } from './tests/three.ts'
import { initializeTestFour } from './tests/four.ts'

document.addEventListener('DOMContentLoaded', () => {
    const dinoAnimation = new DinoAnimation();

    window.addEventListener('beforeunload', () => {
        dinoAnimation.stop();
    });

    initializeTestOne()
    initializeTestTwo()
    initializeTestThree()
    initializeTestFour()
});