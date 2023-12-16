<?php

declare(strict_types=1);

namespace App\Type;

use Sushi\ValueObject;
use Sushi\ValueObject\Invariant;

class GLifeConfig extends ValueObject
{
    public function __construct(
        public readonly int $width,
        public readonly int $height,
        public readonly int $cellSize,
        public readonly array $rules,
        public readonly bool $play,
        public readonly int $interval,
        public readonly int $initX,
        public readonly int $initY,
        public readonly int $initWidth,
        public readonly ?string $initData,
    ) {
        parent::__construct();
    }

    #[Invariant]
    protected function boardParamsCheck(): void
    {
        assert($this->width > 0, 'Width must be greater than 0');
        assert($this->width <= 1000, 'Width must be less than 1000');
        assert($this->height > 0, 'Height must be greater than 0');
        assert($this->height <= 1000, 'Height must be less than 1000');
        assert($this->cellSize > 0, 'Cell size must be greater than 0');
        assert($this->cellSize <= 100, 'Cell size must be less than 100');
    }

    #[Invariant]
    protected function playParamsCheck(): void
    {
        assert($this->interval > 0, 'Interval must be greater than 0');
        assert($this->interval <= 10000, 'Interval must be less than 10000');
        assert($this->play === true || $this->play === false, 'Play must be true or false');
    }

    #[Invariant]
    protected function initParamsCheck(): void
    {
        assert($this->initX >= 0, 'Init X must be greater than or equal to 0');
        assert($this->initX < $this->width,'Init X must be less than width');
        assert($this->initY >= 0, 'Init Y must be greater than or equal to 0');
        assert($this->initY < $this->height, 'Init Y must be less than height');
        assert($this->initWidth > 0, 'Init width must be greater than 0');
        assert($this->initX + $this->initWidth <= $this->width, 'Init X + init width must be less than or equal to width');
        assert($this->initData === null || is_string($this->initData), 'Init data must be null or string');
    }
}
