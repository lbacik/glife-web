
export default function state() {
    const values = {
        ALIVE: 'alive',
        DEAD: 'dead',
        STALE: 'stale',
    }

    const getValues = () => {
        return values
    }

    const check = (field, previous) => {
        let result = values.ALIVE

        if (field.getField().toString().includes('true') === false) {
            result = values.DEAD
        }

        if ( field.getField().toString() === previous.getField().toString()) {
            result = values.STALE
        }

        return result
    }

    return {
        getValues,
        check,
    }
}
