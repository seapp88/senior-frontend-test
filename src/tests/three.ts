/**
 * Data management system
 */
export function initializeTestThree() {
    let isActive = false;
    const startButton = document.getElementById('test-3-start');
    const stopButton = document.getElementById('test-3-stop');
    const indicator = document.getElementById('test-3-indicator');

    // @ts-ignore
    window.leakyStorage = window.leakyStorage || [];
    // @ts-ignore
    const leakyStorage = window.leakyStorage;

    let memoryInterval: number | null = null;

    startButton?.addEventListener('click', () => {
        if (!isActive) {
            isActive = true;
            if (indicator) {
                indicator.classList.remove('hidden');
            }
            startMemoryLeak();
        }
    });

    stopButton?.addEventListener('click', () => {
        isActive = false;
        if (indicator) {
            indicator.classList.add('hidden');
        }
        stopMemoryLeak();
    });

    function startMemoryLeak() {
        memoryInterval = window.setInterval(() => {
            if (!isActive) {
                stopMemoryLeak();
                return;
            }
            createLeak();
        }, 300);
    }

    function stopMemoryLeak() {
        if (memoryInterval) {
            clearInterval(memoryInterval);
            memoryInterval = null;
        }
    }

    function createLeak() {
        const data = new Array(10000).fill(0).map(() => ({
            id: Math.random(),
            value: 'x'.repeat(1000)
        }));

        leakyStorage.push(data);

        const div = document.createElement('div');
        div.style.display = 'none';
        document.body.appendChild(div);

        div.addEventListener('click', function() {
            console.log(data.length);
        });
    }
}