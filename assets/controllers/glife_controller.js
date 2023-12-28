import { Controller } from '@hotwired/stimulus';
import { drawGrid, setSize, clear } from '../canvas/grid.js';
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
        // 'initGridData',
        'url',
        'autoPlay',
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
    playing = false;
    initGrid = false;
    initGridData = []

    connect() {
        setSize(this.boardCanvasTarget, this.widthValue, this.heightValue, this.cellSizeValue)
        drawGrid(this.boardCanvasTarget, this.widthValue, this.heightValue, this.cellSizeValue, '#dddddd')

        this.glife = Factory.createEmpty(this.widthValue, this.heightValue, this.rulesValue)
        this.populateRules()

        drawData(this.boardCanvasTarget, this.glife.getField(), this.cellSizeValue)

        this.generateUrl()
    }

    submit(event) {
        this.widthValue = event.detail.width;
        this.heightValue = event.detail.height;
        this.cellSizeValue = event.detail.cellSize;

        setSize(this.boardCanvasTarget, this.widthValue, this.heightValue, this.cellSizeValue)
        drawGrid(this.boardCanvasTarget, this.widthValue, this.heightValue, this.cellSizeValue)

        this.glife.setFieldSize(this.widthValue, this.heightValue)
        drawData(this.boardCanvasTarget, this.glife.getField(), this.cellSizeValue)

        this.generateUrl()
    }

    toggleCell(event) {
        const x = Math.floor(event.offsetX / this.cellSizeValue)
        const y = Math.floor(event.offsetY / this.cellSizeValue)

        const value = this.glife.getCell(x, y)
        this.glife.setCell(x, y, !value)

        drawData(this.boardCanvasTarget, this.glife.getField(), this.cellSizeValue)
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
        this.glife.nextGeneration()

        drawData(this.boardCanvasTarget, this.glife.getField(), this.cellSizeValue)

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
        clear(this.boardCanvasTarget)
        drawGrid(this.boardCanvasTarget, this.widthValue, this.heightValue, this.cellSizeValue)
        drawData(this.boardCanvasTarget, this.glife.getField(), this.cellSizeValue)
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

    initGridApply() {
        this.initGrid = false
        this.initGridCheckboxTarget.checked = false

        this.glife.setField(Field(this.widthValue, this.heightValue), true)

        const gridX = Number(this.initGridXTarget.value)
        const gridY = Number(this.initGridYTarget.value)
        const gridWidth = Number(this.initGridWidthTarget.value)

        this.initGridData.forEach((cell, x) => {
            if (Boolean(cell)) {
                const j = Math.floor(x / gridWidth)
                const i = x % gridWidth
                this.glife.setCell(gridX + i, gridY + j, true)
            }
        })

        this.drawBaseData()
    }

    clear() {
        this.glife.setField(Field(this.widthValue, this.heightValue), true)
        this.drawBaseData()
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
        url.searchParams.set('initData', this.initGridData.join(''))
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

    // parseInitGridData(data) {
    //     const inputData = data.split('')
    //     return inputData.map((cell) => {
    //         return Number(cell === '1')
    //     })
    // }
}
