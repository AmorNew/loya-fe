import * as jspb from 'google-protobuf'



export class Point extends jspb.Message {
  getObjectId(): number;
  setObjectId(value: number): Point;

  getLatitude(): number;
  setLatitude(value: number): Point;

  getLongitude(): number;
  setLongitude(value: number): Point;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Point.AsObject;
  static toObject(includeInstance: boolean, msg: Point): Point.AsObject;
  static serializeBinaryToWriter(message: Point, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Point;
  static deserializeBinaryFromReader(message: Point, reader: jspb.BinaryReader): Point;
}

export namespace Point {
  export type AsObject = {
    objectId: number,
    latitude: number,
    longitude: number,
  }
}

export class Unit extends jspb.Message {
  getObjectId(): number;
  setObjectId(value: number): Unit;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Unit.AsObject;
  static toObject(includeInstance: boolean, msg: Unit): Unit.AsObject;
  static serializeBinaryToWriter(message: Unit, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Unit;
  static deserializeBinaryFromReader(message: Unit, reader: jspb.BinaryReader): Unit;
}

export namespace Unit {
  export type AsObject = {
    objectId: number,
  }
}

