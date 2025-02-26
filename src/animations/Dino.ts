import './styles.css'

/**
 * Интерфейс для объекта кактуса
 * @interface CactusObject
 */
interface CactusObject {
    /** HTML-элемент кактуса */
    element: HTMLElement;
    /** Позиция кактуса по оси X */
    x: number;
    /** Флаг, указывающий, был ли уже запущен прыжок для этого кактуса */
    jumpTriggered?: boolean;
}

/**
 * Интерфейс для объекта облака
 * @interface CloudObject
 */
interface CloudObject {
    /** HTML-элемент облака */
    element: HTMLElement;
    /** Позиция облака по оси X */
    x: number;
    /** Скорость движения облака */
    speed: number;
}

/**
 * Класс для управления анимацией динозаврика
 * @class DinoAnimation
 */
export class DinoAnimation {
    /** HTML-элемент динозаврика */
    private dino: HTMLElement;

    /** Контейнер анимации */
    private animationContainer: HTMLElement;

    /** Элемент для отображения отладочной информации */
    private debugInfo: HTMLElement;

    /** Ширина контейнера анимации */
    private containerWidth: number;

    /** Флаг паузы анимации */
    private isPaused: boolean = false;

    /** Флаг прыжка динозаврика */
    private isJumping: boolean = false;

    /** Высота прыжка динозаврика */
    private jumpHeight: number = 0;

    /** Вертикальная скорость прыжка */
    private jumpVelocity: number = 0;

    /** Скорость движения объектов */
    private speed: number = 5;

    /** Флаг режима отладки */
    private debugMode: boolean = false;

    /** Массив объектов кактусов */
    private cacti: CactusObject[] = [];

    /** Массив объектов облаков */
    private clouds: CloudObject[] = [];

    /** Константа силы гравитации */
    private readonly GRAVITY: number = 0.7;

    /** Константа начальной скорости прыжка */
    private readonly INITIAL_JUMP_VELOCITY: number = 13;

    /** Константа позиции динозаврика по оси X */
    private readonly DINO_X_POS: number = 50;

    /** Константа интервала появления кактусов (в миллисекундах) */
    private readonly CACTUS_SPAWN_INTERVAL: number = 2500;

    /** ID интервала анимации бега */
    private runningIntervalId: number | null = null;

    /** ID интервала создания кактусов */
    private cactusIntervalId: number | null = null;

    /** ID интервала создания облаков */
    private cloudIntervalId: number | null = null;

    /** ID запроса анимации */
    private animationFrameId: number | null = null;

    /**
     * Создает экземпляр класса DinoAnimation
     * @constructor
     */
    constructor() {
        // Получаем элементы DOM
        this.dino = document.querySelector('.dino') as HTMLElement;
        this.animationContainer = document.querySelector('.animation-container') as HTMLElement;
        this.debugInfo = document.getElementById('debug-info') as HTMLElement;

        // Получаем ширину контейнера
        this.containerWidth = this.animationContainer.offsetWidth;

        // Настраиваем обработчики событий
        this.setupEventListeners();

        // Инициализируем анимацию
        this.init();
    }

    /**
     * Настраивает обработчики событий
     * @private
     */
    private setupEventListeners(): void {
        const pauseBtn = document.getElementById('pause-btn');
        const speedBtn = document.getElementById('speed-btn');
        const debugBtn = document.getElementById('debug-btn');

        pauseBtn?.addEventListener('click', () => {
            this.isPaused = !this.isPaused;
            pauseBtn.textContent = this.isPaused ? 'Продолжить' : 'Пауза';
        });

        speedBtn?.addEventListener('click', () => {
            this.speed = Math.min(15, this.speed + 1);
        });

        debugBtn?.addEventListener('click', () => {
            this.debugMode = !this.debugMode;
            this.debugInfo.style.display = this.debugMode ? 'block' : 'none';
            debugBtn.textContent = this.debugMode ? 'Скрыть отладку' : 'Показать отладку';
        });
    }

    /**
     * Инициализирует анимацию
     * @private
     */
    private init(): void {
        // Запускаем основной цикл анимации
        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));

        // Запускаем анимацию бега
        this.runningIntervalId = window.setInterval(this.animateRunning.bind(this), 100);

        // Запускаем создание кактусов
        this.cactusIntervalId = window.setInterval(this.createCactus.bind(this), this.CACTUS_SPAWN_INTERVAL);

        // Запускаем создание облаков
        this.cloudIntervalId = window.setInterval(this.createCloud.bind(this), 5000);
    }

    /**
     * Основной цикл анимации
     * @private
     */
    private animate(): void {
        if (!this.isPaused) {
            // Обновляем состояние прыжка
            this.updateJump();

            // Обновляем положение кактусов
            this.updateCacti();

            // Обновляем положение облаков
            this.updateClouds();

            // Отображаем отладочную информацию
            if (this.debugMode) {
                this.updateDebugInfo();
            }
        }

        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
    }

    /**
     * Обновляет состояние прыжка динозаврика
     * @private
     */
    private updateJump(): void {
        if (this.isJumping) {
            // Применяем гравитацию
            this.jumpVelocity -= this.GRAVITY;
            this.jumpHeight += this.jumpVelocity;

            // Проверяем, не опустились ли мы ниже земли
            if (this.jumpHeight <= 0) {
                this.jumpHeight = 0;
                this.isJumping = false;
                this.jumpVelocity = 0;
            }

            // Обновляем позицию
            this.dino.style.bottom = `${this.jumpHeight}px`;
        }
    }

    /**
     * Запускает прыжок
     * @private
     */
    private jump(): void {
        if (!this.isJumping) {
            this.isJumping = true;
            this.jumpVelocity = this.INITIAL_JUMP_VELOCITY;
        }
    }

    /**
     * Создает новый кактус
     * @private
     */
    private createCactus(): void {
        if (this.isPaused) return;

        const cactus = document.createElement('div');
        cactus.classList.add('cactus');
        this.animationContainer.appendChild(cactus);

        // Устанавливаем начальную позицию справа за пределами экрана
        const cactusObj: CactusObject = {
            element: cactus,
            x: this.containerWidth
        };

        this.cacti.push(cactusObj);
        cactus.style.left = `${cactusObj.x}px`;
    }

    /**
     * Обновляет положение всех кактусов
     * @private
     */
    private updateCacti(): void {
        for (let i = 0; i < this.cacti.length; i++) {
            const cactus = this.cacti[i];

            // Двигаем кактус влево
            cactus.x -= this.speed;
            cactus.element.style.left = `${cactus.x}px`;

            // Проверяем, нужно ли прыгать
            if (cactus.x > this.DINO_X_POS + 50 && cactus.x < this.DINO_X_POS + 80 && !this.isJumping) {
                if (!cactus.jumpTriggered) {
                    this.jump();
                    cactus.jumpTriggered = true;
                }
            }

            // Удаляем кактус, если он ушел за пределы экрана
            if (cactus.x < -50) {
                cactus.element.remove();
                this.cacti.splice(i, 1);
                i--;
            }
        }
    }

    /**
     * Создает новое облако
     * @private
     */
    private createCloud(): void {
        if (this.isPaused) return;

        const cloud = document.createElement('div');
        cloud.classList.add('cloud');
        this.animationContainer.appendChild(cloud);

        // Случайная высота облака
        const top = Math.random() * (this.animationContainer.offsetHeight / 2 - 30) + 20;
        cloud.style.top = `${top}px`;

        // Создаем объект облака
        const cloudObj: CloudObject = {
            element: cloud,
            x: this.containerWidth,
            speed: this.speed * 0.3 // Облака движутся медленнее кактусов
        };

        this.clouds.push(cloudObj);
        cloud.style.left = `${cloudObj.x}px`;
    }

    /**
     * Обновляет положение всех облаков
     * @private
     */
    private updateClouds(): void {
        for (let i = 0; i < this.clouds.length; i++) {
            const cloud = this.clouds[i];

            // Двигаем облако влево
            cloud.x -= cloud.speed;
            cloud.element.style.left = `${cloud.x}px`;

            // Удаляем облако, если оно ушло за пределы экрана
            if (cloud.x < -100) {
                cloud.element.remove();
                this.clouds.splice(i, 1);
                i--;
            }
        }
    }

    /**
     * Анимирует бег (смена кадров)
     * @private
     */
    private animateRunning(): void {
        if (this.isPaused) return;

        this.dino.classList.toggle('dino-run-1');
        this.dino.classList.toggle('dino-run-2');
    }

    /**
     * Обновляет отладочную информацию
     * @private
     */
    private updateDebugInfo(): void {
        let cactusInfo = '';
        this.cacti.forEach((cactus, index) => {
            cactusInfo += `Кактус ${index}: позиция X = ${cactus.x}, расстояние до динозавра = ${cactus.x - this.DINO_X_POS}px<br>`;
        });

        this.debugInfo.innerHTML = `
            Динозавр: X = ${this.DINO_X_POS}, Y = ${this.jumpHeight}<br>
            Прыжок: ${this.isJumping ? 'да' : 'нет'}, скорость = ${this.jumpVelocity}<br>
            Кактусы (${this.cacti.length}):<br>${cactusInfo}
            Скорость: ${this.speed}px/кадр
        `;
    }

    /**
     * Останавливает анимацию и очищает все интервалы и объекты
     * @public
     */
    public stop(): void {
        // Останавливаем анимацию
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }

        // Очищаем интервалы
        if (this.runningIntervalId !== null) {
            clearInterval(this.runningIntervalId);
            this.runningIntervalId = null;
        }

        if (this.cactusIntervalId !== null) {
            clearInterval(this.cactusIntervalId);
            this.cactusIntervalId = null;
        }

        if (this.cloudIntervalId !== null) {
            clearInterval(this.cloudIntervalId);
            this.cloudIntervalId = null;
        }

        // Удаляем все кактусы и облака
        this.cacti.forEach(cactus => cactus.element.remove());
        this.clouds.forEach(cloud => cloud.element.remove());

        this.cacti = [];
        this.clouds = [];
    }
}