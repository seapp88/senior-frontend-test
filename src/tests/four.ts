/**
 * Tree structure analysis module
 */
export function initializeTestFour() {
    let isActive = false;
    const startButton = document.getElementById('test-4-start');
    const stopButton = document.getElementById('test-4-stop');
    const indicator = document.getElementById('test-4-indicator');

    startButton?.addEventListener('click', () => {
        if (!isActive) {
            isActive = true;
            if (indicator) {
                indicator.classList.remove('hidden');
            }
            runTreeAnalysis();
        }
    });

    stopButton?.addEventListener('click', () => {
        isActive = false;
        if (indicator) {
            indicator.classList.add('hidden');
        }
    });

    function runTreeAnalysis() {
        if (!isActive) return;

        try {
            const rootNode = createDeepTree(20000);

            const result = processNode(rootNode);
            console.log("Processing completed:", result);
        } catch (error) {
            console.error("Processing error:", error);

            if (isActive) {
                setTimeout(runTreeAnalysis, 1000);
            }
        }
    }

    function createDeepTree(maxDepth: number) {
        interface TreeNode {
            id: number;
            value: number;
            children: TreeNode[];
        }

        function generateNode(depth: number, id: number): TreeNode {
            const node: TreeNode = {
                id,
                value: Math.random(),
                children: []
            };

            if (depth > 0) {
                node.children.push(generateNode(depth - 1, id * 10));
            }

            return node;
        }

        return generateNode(maxDepth, 1);
    }

    function processNode(node: any): number {
        if (!isActive) return 0;

        let sum = node.value;

        for (const child of node.children) {
            sum += processNode(child);
        }

        if (node.id % 100 === 0) {
            deepCalculation(100);
        }

        return sum;
    }

    function deepCalculation(depth: number): number {
        if (depth <= 0) return 0;
        return 1 + deepCalculation(depth - 1);
    }
}