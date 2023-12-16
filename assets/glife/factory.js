
import GLife from './glife.js'
import rules from './rules.js'

export default class {
    static createEmpty(x, y, rulesDefinition) {
        return GLife(x, y, rules(rulesDefinition))
    }

    static createInitialised(initialField, rulesDefinition) {
        const glife = GLife(initialField.length, initialField[0].length, rules(rulesDefinition))
        glife.setField(initialField)
        return glife
    }

    static createEmptyConway(x, y) {
        return this.createEmpty(x, y, {
            'survive': {0: false, 1: false, 2: true, 3: true, 4: false, 5: false, 6: false, 7: false, 8: false},
            'reproduction': {0: false, 1: false, 2: false, 3: true, 4: false, 5: false, 6: false, 7: false, 8: false}
        })
    }
}
