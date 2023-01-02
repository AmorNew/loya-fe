type Plate = {
    fullPlate: string
    firstPart: string
    secondPart: string
    thirdPart: string
    region: string
}

const plateRegExp = /^([АВЕКМНОРСТУХABCKMHOPCTYX])(\d{3})([АВЕКМНОРСТУХABCKMHOPCTYX]{2})(\d{2,3})$/iu

const parsePlate = (stringPlate: string): Plate => {
    const [fullPlate, firstPart, secondPart, thirdPart, region] = plateRegExp.exec(stringPlate) || [stringPlate]

    return {
        fullPlate,
        firstPart,
        secondPart,
        thirdPart,
        region,
    }
}

export default parsePlate
