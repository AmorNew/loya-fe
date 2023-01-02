import * as jspb from 'google-protobuf'

export class Point extends jspb.Message {
    getDeviceId(): string
    setDeviceId(value: string): Point

    getLatitude(): number
    setLatitude(value: number): Point

    getLongitude(): number
    setLongitude(value: number): Point

    getSpeed(): number
    setSpeed(value: number): Point

    getPdop(): number
    setPdop(value: number): Point

    getHdop(): number
    setHdop(value: number): Point

    getVdop(): number
    setVdop(value: number): Point

    getNsat(): number
    setNsat(value: number): Point

    getNs(): number
    setNs(value: number): Point

    getCourse(): number
    setCourse(value: number): Point

    getLiquidSensorsList(): Array<LiquidSensor>
    setLiquidSensorsList(value: Array<LiquidSensor>): Point
    clearLiquidSensorsList(): Point
    addLiquidSensors(value?: LiquidSensor, index?: number): LiquidSensor

    getAnSensorsList(): Array<AnSensor>
    setAnSensorsList(value: Array<AnSensor>): Point
    clearAnSensorsList(): Point
    addAnSensors(value?: AnSensor, index?: number): AnSensor

    getNavigationTime(): string
    setNavigationTime(value: string): Point

    getReceivingTime(): string
    setReceivingTime(value: string): Point

    serializeBinary(): Uint8Array
    toObject(includeInstance?: boolean): Point.AsObject
    static toObject(includeInstance: boolean, msg: Point): Point.AsObject
    static serializeBinaryToWriter(message: Point, writer: jspb.BinaryWriter): void
    static deserializeBinary(bytes: Uint8Array): Point
    static deserializeBinaryFromReader(message: Point, reader: jspb.BinaryReader): Point
}

export namespace Point {
    export type AsObject = {
        deviceId: string
        latitude: number
        longitude: number
        speed: number
        pdop: number
        hdop: number
        vdop: number
        nsat: number
        ns: number
        course: number
        liquidSensorsList: Array<LiquidSensor.AsObject>
        anSensorsList: Array<AnSensor.AsObject>
        navigationTime: string
        receivingTime: string
    }
}

export class LiquidSensor extends jspb.Message {
    getSensorNumber(): string
    setSensorNumber(value: string): LiquidSensor

    getErrorFlag(): string
    setErrorFlag(value: string): LiquidSensor

    getValueMm(): number
    setValueMm(value: number): LiquidSensor

    getValueLiters(): number
    setValueLiters(value: number): LiquidSensor

    serializeBinary(): Uint8Array
    toObject(includeInstance?: boolean): LiquidSensor.AsObject
    static toObject(includeInstance: boolean, msg: LiquidSensor): LiquidSensor.AsObject
    static serializeBinaryToWriter(message: LiquidSensor, writer: jspb.BinaryWriter): void
    static deserializeBinary(bytes: Uint8Array): LiquidSensor
    static deserializeBinaryFromReader(message: LiquidSensor, reader: jspb.BinaryReader): LiquidSensor
}

export namespace LiquidSensor {
    export type AsObject = {
        sensorNumber: string
        errorFlag: string
        valueMm: number
        valueLiters: number
    }
}

export class AnSensor extends jspb.Message {
    getSensorNumber(): string
    setSensorNumber(value: string): AnSensor

    getValue(): number
    setValue(value: number): AnSensor

    serializeBinary(): Uint8Array
    toObject(includeInstance?: boolean): AnSensor.AsObject
    static toObject(includeInstance: boolean, msg: AnSensor): AnSensor.AsObject
    static serializeBinaryToWriter(message: AnSensor, writer: jspb.BinaryWriter): void
    static deserializeBinary(bytes: Uint8Array): AnSensor
    static deserializeBinaryFromReader(message: AnSensor, reader: jspb.BinaryReader): AnSensor
}

export namespace AnSensor {
    export type AsObject = {
        sensorNumber: string
        value: number
    }
}

export class PositionReq extends jspb.Message {
    getUnitIdsList(): Array<string>
    setUnitIdsList(value: Array<string>): PositionReq
    clearUnitIdsList(): PositionReq
    addUnitIds(value: string, index?: number): PositionReq

    serializeBinary(): Uint8Array
    toObject(includeInstance?: boolean): PositionReq.AsObject
    static toObject(includeInstance: boolean, msg: PositionReq): PositionReq.AsObject
    static serializeBinaryToWriter(message: PositionReq, writer: jspb.BinaryWriter): void
    static deserializeBinary(bytes: Uint8Array): PositionReq
    static deserializeBinaryFromReader(message: PositionReq, reader: jspb.BinaryReader): PositionReq
}

export namespace PositionReq {
    export type AsObject = {
        unitIdsList: Array<string>
    }
}
