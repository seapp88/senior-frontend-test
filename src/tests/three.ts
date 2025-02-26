/**
 * Data management system
 */
export function initializeTestThree() {
    let isActive = false;
    const startButton = document.getElementById('test-3-start');
    const stopButton = document.getElementById('test-3-stop');
    const indicator = document.getElementById('test-3-indicator');

    const globalStorage: any[] = [];
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

            allocateMemory();
        }, 500);
    }

    function stopMemoryLeak() {
        if (memoryInterval) {
            clearInterval(memoryInterval);
            memoryInterval = null;
        }
    }

    function allocateMemory() {
        for (let i = 0; i < 300; i++) {
            const largeObject = {
                id: Date.now() + i,
                data: new Array(1000).fill(0).map(() => ({
                    value: Math.random(),
                    text: 'x'.repeat(20 + Math.floor(Math.random() * 30))
                })),
                timestamp: new Date()
            };

            //@ts-ignore
            largeObject.self = largeObject;

            globalStorage.push(largeObject);
        }
    }
}