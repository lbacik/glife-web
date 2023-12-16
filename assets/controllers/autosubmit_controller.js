import { Controller } from "@hotwired/stimulus"
import debounce from 'debounce'

// Connects to data-controller="autosubmit"
export default class extends Controller {
  static targets = ['initGridData']
    static values = {
      initData: String,
    }

  initialize() {
    this.debouncedSubmit = debounce(this.debouncedSubmit.bind(this), 300)
    this.debouncedDispatch = debounce(this.debouncedDispatch.bind(this), 300)
    // this.debouncedDispatchRules = debounce(this.debouncedDispatchRules.bind(this), 300)
    this.debouncedDispatchInitGrid = debounce(this.debouncedDispatchInitGrid.bind(this), 300)
    this.debouncedDispatchInitGridData = debounce(this.debouncedDispatchInitGridData.bind(this), 300)
  }

    connect() {

      console.log('initData', this.initDataValue)

      if (this.initDataValue) {
        this.debouncedDispatchInitGridData()
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
    } })
  }

  debouncedDispatchRules() {
    this.dispatch('submit-rules')
  }

  debouncedDispatchInitGrid() {
    this.dispatch('submit-init-grid')
  }

  debouncedDispatchInitGridData() {

    let initData = null;
    let apply = false;

    if (this.initDataValue.length > 0) {
      console.log('initDataValue', this.initDataValue)
      initData = this.initDataValue
      apply = true
      this.initDataValue = null
    } else {
      initData = this.initGridDataTarget.value
    }

    const inputData = initData.split('')
    const data = inputData.map((cell) => {
      return Number(cell === '1')
    })

    this.dispatch('submit-init-grid-data', {
      detail:{
        initGridData: data,
        apply: apply
      }
    })
  }
}
