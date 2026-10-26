import { Controller } from "@hotwired/stimulus"
import debounce from 'debounce'

// Connects to data-controller="autosubmit"
export default class extends Controller {
  static targets = ['initGridData', 'initGridDataFile']
    static values = {
      initData: String,
    }

  initialize() {
    this.debouncedSubmit = debounce(this.debouncedSubmit.bind(this), 300)
    this.debouncedDispatch = debounce(this.debouncedDispatch.bind(this), 300)
    // this.debouncedDispatchRules = debounce(this.debouncedDispatchRules.bind(this), 300)
    this.debouncedDispatchInitGrid = debounce(this.debouncedDispatchInitGrid.bind(this), 300)
    this.debouncedDispatchInitGridData = debounce(this.dispatchInitGridData.bind(this), 300)
  }

    connect() {
      if (this.initDataValue) {
        this.debouncedDispatchInitGridData(true)
      }
    }

  submit(e) {
    this.element.requestSubmit()
  }

  debouncedSubmit() {
    this.submit()
  }

  debouncedDispatch() {
    this.dispatch('submit', { detail: {
      width: this.element.width.value,
      height: this.element.height.value,
      cellSize: this.element.cellSize.value,
      showGrid: this.element.elements.namedItem('showGrid').checked,
      compact: this.element.elements.namedItem('compact').checked,
    } })
  }

  debouncedDispatchRules() {
    this.dispatch('submit-rules')
  }

  debouncedDispatchInitGrid() {
    this.dispatch('submit-init-grid')
  }

  dispatchInitGridData(apply = false) {

    let initData = null;

    if (this.initDataValue.length > 0) {
      initData = this.initDataValue
      this.initDataValue = ''
    } else {
      initData = this.initGridDataTarget.value
    }

    const data = String(initData ?? '').replace(/[^01]/g, '').split('').map((cell) => {
      return Number(cell === '1')
    })

    this.dispatch('submit-init-grid-data', {
      detail:{
        initGridData: data,
        apply: apply
      }
    })
  }

  openFilePicker() {
    this.initGridDataFileTarget.click()
  }

  loadFromFile() {
    const file = this.initGridDataFileTarget.files[0]
    this.initGridDataFileTarget.value = ''

    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      this.initGridDataTarget.value = String(reader.result || '').trim()
      this.initDataValue = ''
      this.dispatchInitGridData()
    }
    reader.readAsText(file)
  }
}
