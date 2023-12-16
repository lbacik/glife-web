import State from './state.js'
import Field from './field.js'
import rulesClass from './rules.js'

export default function GLife(fieldX, fieldY, rules) {
    let _field = Field(fieldX, fieldY)
    let _status = State().getValues().ALIVE
    let _previousField = null
    let _rules = rules
    let _self = this

    const getRules = () => {
        return _rules.getDefinition()
    }

    const setRules = (newRules) => {
        _rules = rulesClass(newRules)
    }

    const getField = () => {
        return _field.getField()
    }

    const setField = (newField, clearPrevious = false) => {
        if (clearPrevious) {
            _previousField = null
        } else {
            _previousField = _field
        }

        _field = newField

        // _status = state().getValues().ALIVE
    }

    const getStatus = () => {
        return _status
    }

    const getCell = (x, y) => {
        return _field.getField()[x][y]
    }

    const setCell = (x, y, value) => {

        console.log('setCell', x, y, value)
        console.log('setCell', _field.getCurrentX(), _field.getCurrentY())

        if ((x < 0 || x > _field.getCurrentX() - 1) || (y < 0 || y > _field.getCurrentY() - 1)) {
            return
        }

        _field.getField()[x][y] = value
        _status = State().getValues().ALIVE
    }

    const nextGeneration = () => {
        if (getStatus() !== State().getValues().ALIVE) {
            return
        }

        const newField = Field(_field.getCurrentX(), _field.getCurrentY())

        _field.getField().forEach((row, x) => {
            row.forEach((cell, y) => {
                const neighbours = _field.countNeighbours(x, y)
                if (cell) {
                    if (_rules.hasSurvive(neighbours)) {
                        newField.getField()[x][y] = true
                    }
                } else {
                    if (_rules.isBorn(neighbours)) {
                        newField.getField()[x][y] = true
                    }
                }
            })
        })

        setField(newField)

        _status = State().check(_field, _previousField)

        console.log('status', _status)
    }

    const setFieldSize = (x, y) => {
        _field.setSize(x, y)
    }

    return {
        getRules,
        setRules,
        getField,
        setField,
        getStatus,
        getCell,
        setCell,
        nextGeneration,
        setFieldSize,
    }
}
