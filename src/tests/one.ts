/**
 * Performance module - version 1
 */
export function initializeTestOne() {
    let isProcessing = false;
    let testElements: HTMLElement[] = [];
    let size = 100;

    document.getElementById('test-1-start')?.addEventListener('click', () => {
        if (!isProcessing) {
            isProcessing = true;

            const indicator = document.getElementById('test-1-indicator');
            if (indicator) {
                indicator.classList.remove('hidden');
            }
            createTestElements(300);
            heavyProcess();
        }
    });

    document.getElementById('test-1-stop')?.addEventListener('click', () => {
        isProcessing = false;

        const indicator = document.getElementById('test-1-indicator');
        if (indicator) {
            indicator.classList.add('hidden');
        }
        removeTestElements();
    });

    function createTestElements(count: number) {
        // Create multiple elements
        for (let i = 0; i < count; i++) {
            const element = document.createElement('div');
            element.style.position = 'absolute';
            element.style.left = '-1000px';
            element.style.top = '-1000px';
            element.style.width = (size + i % 10) + 'px';
            element.style.height = (size + i % 10) + 'px';
            element.style.backgroundColor = 'transparent';
            document.body.appendChild(element);
            testElements.push(element);
        }
    }

    function removeTestElements() {
        testElements.forEach(element => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        });
        testElements = [];
    }

    function heavyProcess() {
        if (!isProcessing) return;

        // Perform extremely heavy operations that will definitely cause reflow issues
        for (let j = 0; j < 3; j++) { // Multiple iterations to make it worse
            for (let i = 0; i < testElements.length; i++) {
                const element = testElements[i];

                element.offsetWidth;
                element.offsetHeight;
                element.getBoundingClientRect();

                element.style.width = (parseInt(element.style.width) + 1) + 'px';
                element.style.height = (parseInt(element.style.height) + 1) + 'px';
                element.style.left = (parseInt(element.style.left || '-1000') + (i % 3) - 1) + 'px';

                element.offsetWidth;
                element.offsetTop;
                element.getBoundingClientRect();
            }
        }

        const measurements = [];
        for (let i = 0; i < testElements.length; i++) {
            measurements.push(testElements[i].getBoundingClientRect().width);
        }

        for (let i = 0; i < testElements.length; i++) {
            testElements[i].style.width = (measurements[i] + 1) + 'px';
        }

        const tempDiv = document.createElement('div');
        tempDiv.style.height = '10px';
        document.body.appendChild(tempDiv);
        tempDiv.offsetHeight; // Force reflow
        document.body.removeChild(tempDiv);

        setTimeout(heavyProcess, 0);
    }
}