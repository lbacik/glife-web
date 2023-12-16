

export default function Field(fieldX, fieldY) {

    const generateField = (x, y) => {
        const newField = []
        for (let i = 0; i < x; i++) {
            newField[i] = []
            for (let j = 0; j < y; j++) {
                newField[i][j] = false
            }
        }
        return newField
    }

    let _field = generateField(fieldX, fieldY)
    let _previousField = null
    let currentX = fieldX
    let currentY = fieldY

    // const getPreviousField = () => {
    //     return _previousField
    // }

    const countNeighbours = (x, y) => {
        let count = 0
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++){
                if (i === 0 && j === 0) {
                    continue
                }
                if (x + i < 0 || x + i > currentX - 1) {
                    continue
                }
                if (y + j < 0 || y + j > currentY - 1) {
                    continue
                }
                if (_field[x + i][y + j]) {
                    count++
                }
            }
        }
        return count
    }

    const getField = () => {
        return _field
    }

    const _getIndex = (field, x, y) => {
        if (typeof field[x] === 'undefined') {
            return undefined
        }

        if (typeof field[x][y] === 'undefined') {
            return undefined
        }

        return field[x][y]
    }

    const setSize = (x, y) => {
        _previousField = _field
        _field = generateField(x, y)

        for(let i = 0; i < currentX; i++) {
            for(let j = 0; j < currentY; j++) {
                if (
                    _getIndex(_previousField, i, j) === true
                    && _getIndex(_field, i, j) === false
                ) {
                    _field[i][j] = true
                }
            }
        }

        currentX = x
        currentY = y

        console.log('new size', currentX, currentY)
    }

    const getCurrentX = () => {
        return currentX
    }

    const getCurrentY = () => {
        return currentY
    }

    return {
        // getPreviousField,
        generateField,
        getField,
        countNeighbours,
        setSize,
        getCurrentX,
        getCurrentY,
    }
}
