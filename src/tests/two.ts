/**
 * Utility service for data processing
 */
export function initializeTestTwo() {
    let isActive = false;
    let indicator: HTMLElement | null = null;

    const startButton = document.getElementById('test-2-start');
    const stopButton = document.getElementById('test-2-stop');
    indicator = document.getElementById('test-2-indicator');

    startButton?.addEventListener('click', () => {
        if (!isActive) {
            isActive = true;
            if (indicator) {
                indicator.classList.remove('hidden');
            }
            runHeavyTask();
        }
    });

    stopButton?.addEventListener('click', () => {
        isActive = false;
        if (indicator) {
            indicator.classList.add('hidden');
        }
    });

    function runHeavyTask() {
        if (!isActive) return;

        runExpensiveCalculation();

        if (isActive) {
            setTimeout(runHeavyTask, 50);
        }
    }

    function runExpensiveCalculation() {
        const data = [];
        for (let i = 0; i < 200000; i++) {
            data.push(Math.random());
        }

        for (let j = 0; j < 2; j++) {
            const sorted = [...data].sort((a, b) => {
                return a - b;
            });

            const sum = sorted.reduce((acc, val) => acc + val, 0);
            if (sum < 0) console.log(sum);
        }

        function fibonacci(n: number): number {
            if (n <= 1) return n;
            return fibonacci(n - 1) + fibonacci(n - 2);
        }

        const fibResult = fibonacci(25);
        if (fibResult < 0) console.log(fibResult);
    }
}