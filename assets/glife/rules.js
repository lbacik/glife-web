

export default function rules(definition) {
    const _keys = {
        SURVIVE: 'survive',
        REPRODUCTION: 'reproduction'
    }

    const hasSurvive = (neighbours) => {
        return Boolean(definition[_keys.SURVIVE][neighbours]) === true
    }

    const isBorn = (neighbours) => {
        return Boolean(definition[_keys.REPRODUCTION][neighbours]) === true
    }

    if ( typeof definition !== 'object'
        || typeof definition[_keys.SURVIVE] !== 'object'
        || typeof definition[_keys.REPRODUCTION] !== 'object') {
        throw new Error('Definition must be an object and must contain required keys')
    }

    const getDefinition = () => {
        return definition
    }

    return {
        hasSurvive,
        isBorn,
        getDefinition,
    }
}
