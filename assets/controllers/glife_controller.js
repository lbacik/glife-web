import { Controller } from '@hotwired/stimulus';
import { drawBorder, drawGrid, setSize, clear } from '../canvas/grid.js';
import Factory from '../glife/factory.js';
import { drawData } from '../canvas/data.js';
import { drawInitGrid, showInitGridData } from "../canvas/init-grid.js";
import Field from "../glife/field.js";

export default class extends Controller {
    static targets = [
        'boardCanvas',
        'rules',
        'status',
        'interval',
        'playIcon',
        'pauseIcon',
        'initGridX',
        'initGridY',
        'initGridWidth',
        'initGridCheckbox',
        'initGridData',
        'url',
        'autoPlay',
        'largeInitDataWarning',
        'generation',
    ];
    static values = {
        width: Number,
        height: Number,
        cellSize: Number,
        rules: Object,
        autoPlay: Boolean,
        url: String,
    }

    glife = null;
    generation = 0;
    playing = false;
    initGrid = false;
    initGridData = []
    useInitPreset = false
    showGrid = true
    compact = false

    connect() {
        this.useInitPreset = new URL(this.urlValue).searchParams.get('preset') === 'portrait'
        setSize(this.boardCanvasTarget, this.widthValue, this.heightValue, this.cellSizeValue)
        this.glife = Factory.createEmpty(this.widthValue, this.heightValue, this.rulesValue)
        this.populateRules()

        this.drawBoard()

        this.generateUrl()
    }

    submit(event) {
        this.widthValue = event.detail.width;
        this.heightValue = event.detail.height;
        this.cellSizeValue = event.detail.cellSize;
        this.showGrid = event.detail.showGrid;
        this.compact = event.detail.compact;

        setSize(this.boardCanvasTarget, this.widthValue, this.heightValue, this.cellSizeValue)

        this.glife.setFieldSize(this.widthValue, this.heightValue)
        this.drawBoard()

        this.generateUrl()
    }

    toggleCell(event) {
        const x = Math.floor(event.offsetX / this.cellSizeValue)
        const y = Math.floor(event.offsetY / this.cellSizeValue)

        const value = this.glife.getCell(x, y)
        this.glife.setCell(x, y, !value)

        this.drawBoard()
    }

    populateRules() {
        const rules = this.glife.getRules()

        rules['survive'].forEach((value, key) => {
            this.rulesTarget.querySelector(`#survive-${key}`).checked = value
        })

        rules['reproduction'].forEach((value, key) => {
            this.rulesTarget.querySelector(`#rep-${key}`).checked = value
        })
    }

    submitRules(event) {
        const rules = this.glife.getRules()

        rules['survive'].forEach((value, key) => {
            rules['survive'][key] = this.rulesTarget.querySelector(`#survive-${key}`).checked
        })

        rules['reproduction'].forEach((value, key) => {
            rules['reproduction'][key] = this.rulesTarget.querySelector(`#rep-${key}`).checked
        })

        this.glife.setRules(rules)
        this.generateUrl()
    }

    oneStep() {
        if (this.glife.getStatus() === 'alive') {
            this.generation++
            this.generationTarget.innerText = this.generation
        }

        this.glife.nextGeneration()
        this.drawBoard()
        this.statusTarget.innerHTML = this.glife.getStatus()

        if (this.glife.getStatus() !== 'alive' && this.playing === true) {
            this.play()
        }
    }

    play() {

        if (this.playing) {
            this.playing = false

            this.pauseIconTarget.classList.add('hidden')
            this.playIconTarget.classList.remove('hidden')

            clearInterval(this.intervalValue)

        } else {
            this.playing = true
            this.playIconTarget.classList.add('hidden')
            this.pauseIconTarget.classList.remove('hidden')

            this.intervalValue = setInterval(() => {
                this.oneStep()
            }, this.intervalTarget.value)
        }
    }

    toggleInitGrid() {
        if (this.initGrid === false) {
            this.initGrid = true
            // if (this.initGridData.length === 0 && this.initGridDataTarget.value.length > 0) {
            //     this.initGridData = this.parseInitGridData(this.initGridDataTarget.value)
            // }
            this.drawInitGridData()
        } else {
            this.initGrid = false
            this.drawBaseData()
        }
    }

    submitInitGrid() {
        if (this.initGrid === false) {
            return
        }
        this.drawBaseData()
        this.drawInitGridData()

        this.generateUrl()
    }

    submitInitGridData(event) {
        this.initGridData = event.detail.initGridData
        if (event.detail.apply !== true) {
            this.useInitPreset = false
        }

        if (this.initGrid === true) {
            this.drawBaseData()
            this.drawInitGridData()
        }

        if (event.detail.apply === true) {
            this.initGridApply()
            if (this.autoPlayValue === true) {
                this.autoPlayValue = false
                this.play()
            }
        }

        this.generateUrl()
    }

    drawBaseData() {
        this.drawBoard()
    }

    drawBoard() {
        clear(this.boardCanvasTarget)
        if (this.showGrid) {
            drawGrid(this.boardCanvasTarget, this.widthValue, this.heightValue, this.cellSizeValue)
        }
        drawData(this.boardCanvasTarget, this.glife.getField(), this.cellSizeValue, this.compact)
        drawBorder(this.boardCanvasTarget, '#dddddd')
    }

    drawInitGridData() {
        drawInitGrid(
            this.boardCanvasTarget,
            this.initGridXTarget.value,
            this.initGridYTarget.value,
            this.cellSizeValue,
            this.initGridWidthTarget.value,
            'red'
        )
        showInitGridData(
            this.boardCanvasTarget,
            this.initGridXTarget.value,
            this.initGridYTarget.value,
            this.cellSizeValue,
            this.initGridWidthTarget.value,
            'lightgray',
            this.initGridData,
        )
    }

    parseInitGridData(raw) {
        return String(raw ?? '').replace(/[^01]/g, '').split('').map((cell) => Number(cell === '1'))
    }

    initGridApply() {
        this.initGrid = false
        this.initGridCheckboxTarget.checked = false

        this.initGridData = this.parseInitGridData(this.initGridDataTarget.value)

        const gridX = Number(this.initGridXTarget.value)
        const gridY = Number(this.initGridYTarget.value)
        const gridWidth = Number(this.initGridWidthTarget.value)

        this.initGridData.forEach((cell, x) => {
            const j = Math.floor(x / gridWidth)
            const i = x % gridWidth
            this.glife.setCell(gridX + i, gridY + j, Boolean(cell))
        })

        this.drawBaseData()
        this.resetGeneration()
    }

    clear() {
        this.glife.setField(Field(this.widthValue, this.heightValue), true)
        this.drawBaseData()
        this.resetGeneration()
    }

    generateUrl() {
        const url = new URL(this.urlValue)
        url.searchParams.set('width', this.widthValue)
        url.searchParams.set('height', this.heightValue)
        url.searchParams.set('cellSize', this.cellSizeValue)
        url.searchParams.set('rules', this.codeRules())
        url.searchParams.set('play', this.autoPlayTarget.checked ? 1 : 0)
        url.searchParams.set('interval', this.intervalTarget.value)
        url.searchParams.set('initX', this.initGridXTarget.value)
        url.searchParams.set('initY', this.initGridYTarget.value)
        url.searchParams.set('initWidth', this.initGridWidthTarget.value)
        const initData = this.initGridData.join('')
        const initDataTooLarge = !this.useInitPreset && initData.length > 2048
        this.largeInitDataWarningTarget.classList.toggle('hidden', !initDataTooLarge)
        if (this.useInitPreset) {
            url.searchParams.set('preset', 'portrait')
            url.searchParams.delete('initData')
        } else {
            url.searchParams.delete('preset')
            if (initDataTooLarge) {
                url.searchParams.delete('initData')
            } else {
                url.searchParams.set('initData', initData)
            }
        }
        this.urlTarget.innerText = url.toString()
    }


    codeRules() {
        const rules = this.glife.getRules()
        const survive = rules['survive'].map((value, key) => {
            return Number(value)
        }).join('')
        const reproduction = rules['reproduction'].map((value, key) => {
            return Number(value)
        }).join('')

        return `${survive},${reproduction}`
    }

    copyUrl() {
        const url = this.urlTarget.innerText
        navigator.clipboard.writeText(url)
        this.urlTarget.classList.add('text-blue-400')
        setTimeout(() => {
            this.urlTarget.classList.remove('text-blue-400')
        }, 1000)
    }

    resetGeneration() {
        this.generation = 0
        this.generationTarget.innerText = this.generation
    }

    setInitial() {
        const gridX = Number(this.initGridXTarget.value)
        const gridY = Number(this.initGridYTarget.value)
        const gridWidth = Number(this.initGridWidthTarget.value)

        const result = []
        for(let j = gridY; j < this.heightValue; j++) {
            for (let i = 0; i < gridWidth; i++) {
                result.push(this.glife.getCell(gridX + i, j))
            }
        }

        const lastOne = result.lastIndexOf(true)
        this.initGridData = result.slice(0, lastOne + 1).map(i => i === true ? '1' : '0').join('')
        this.initGridDataTarget.value = this.initGridData
        this.drawInitGridData()
    }
}
