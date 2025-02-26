# Senior Frontend Developer Test

This project contains a performance testing playground designed to evaluate frontend developers' ability to identify, explain, and solve common performance issues in web applications.

## Overview

The application includes a simple animation that should run continuously and smoothly. The goal is to analyze how different test scenarios affect this animation's performance and propose optimizations.

## Features

The test platform includes four test scenarios, each demonstrating a different performance issue:

1. **Test 1**: Evaluates handling of forced reflow and layout thrashing
2. **Test 2**: Tests awareness of event loop blocking and long tasks
3. **Test 3**: Simulates memory leaks and memory management issues
4. **Test 4**: Demonstrates call stack limitations with recursion problems

Each test can be started and stopped independently, and includes a visual indicator showing when it's active.

## Getting Started

### Prerequisites

- Node.js (v16 or later recommended)
- npm or yarn

### Installation

Install dependencies:
```bash
npm install
# or
yarn
```

### Running the Application

Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:5173 (or another port if 5173 is in use).

### Building for Production

To create a production build:
```bash
npm run build
# or
yarn build
```

The build files will be generated in the `dist` directory.

## Project Structure

```
senior-frontend-test/
├── src/
│   ├── animations/
│   │   ├── index.ts        # Animation exports
│   │   └── dino.ts         # Dino animation implementation
│   ├── tests/
│   │   ├── one.ts          # Test 1 implementation (reflow issues)
│   │   ├── two.ts          # Test 2 implementation (event loop blocking)
│   │   ├── three.ts        # Test 3 implementation (memory leaks)
│   │   └── four.ts         # Test 4 implementation (call stack issues)
│   ├── main.ts             # Application entry point
│   └── style.css           # Main stylesheet
├── public/
│   └── assets/             # Static assets
├── index.html              # Main HTML template
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## Task Instructions

When using this test:

1. Carefully observe the animation behavior when each test is activated
2. Identify what performance issues are being caused
3. Explain the technical reasons behind these performance problems
4. Propose optimized solutions for each scenario

## Technologies Used

- TypeScript
- Vite
- TailwindCSS

## License

This project is licensed under the MIT License.