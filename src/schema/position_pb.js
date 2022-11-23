// source: position.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = (function() {
  if (this) { return this; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  if (typeof self !== 'undefined') { return self; }
  return Function('return this')();
}.call(null));

goog.exportSymbol('proto.position.AnSensor', null, global);
goog.exportSymbol('proto.position.LiquidSensor', null, global);
goog.exportSymbol('proto.position.Point', null, global);
goog.exportSymbol('proto.position.Unit', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.position.Point = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.position.Point.repeatedFields_, null);
};
goog.inherits(proto.position.Point, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.position.Point.displayName = 'proto.position.Point';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.position.LiquidSensor = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.position.LiquidSensor, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.position.LiquidSensor.displayName = 'proto.position.LiquidSensor';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.position.AnSensor = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.position.AnSensor, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.position.AnSensor.displayName = 'proto.position.AnSensor';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.position.Unit = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.position.Unit.repeatedFields_, null);
};
goog.inherits(proto.position.Unit, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.position.Unit.displayName = 'proto.position.Unit';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.position.Point.repeatedFields_ = [11,12];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.position.Point.prototype.toObject = function(opt_includeInstance) {
  return proto.position.Point.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.position.Point} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.position.Point.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    latitude: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0),
    longitude: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
    speed: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
    pdop: jspb.Message.getFieldWithDefault(msg, 5, 0),
    hdop: jspb.Message.getFieldWithDefault(msg, 6, 0),
    vdop: jspb.Message.getFieldWithDefault(msg, 7, 0),
    nsat: jspb.Message.getFieldWithDefault(msg, 8, 0),
    ns: jspb.Message.getFieldWithDefault(msg, 9, 0),
    course: jspb.Message.getFieldWithDefault(msg, 10, 0),
    liquidSensorsList: jspb.Message.toObjectList(msg.getLiquidSensorsList(),
    proto.position.LiquidSensor.toObject, includeInstance),
    anSensorsList: jspb.Message.toObjectList(msg.getAnSensorsList(),
    proto.position.AnSensor.toObject, includeInstance),
    navigationTime: jspb.Message.getFieldWithDefault(msg, 13, ""),
    receivingTime: jspb.Message.getFieldWithDefault(msg, 14, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.position.Point}
 */
proto.position.Point.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.position.Point;
  return proto.position.Point.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.position.Point} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.position.Point}
 */
proto.position.Point.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setDeviceId(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setLatitude(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setLongitude(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setSpeed(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setPdop(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setHdop(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setVdop(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setNsat(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setNs(value);
      break;
    case 10:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCourse(value);
      break;
    case 11:
      var value = new proto.position.LiquidSensor;
      reader.readMessage(value,proto.position.LiquidSensor.deserializeBinaryFromReader);
      msg.addLiquidSensors(value);
      break;
    case 12:
      var value = new proto.position.AnSensor;
      reader.readMessage(value,proto.position.AnSensor.deserializeBinaryFromReader);
      msg.addAnSensors(value);
      break;
    case 13:
      var value = /** @type {string} */ (reader.readString());
      msg.setNavigationTime(value);
      break;
    case 14:
      var value = /** @type {string} */ (reader.readString());
      msg.setReceivingTime(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.position.Point.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.position.Point.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.position.Point} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.position.Point.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getLatitude();
  if (f !== 0.0) {
    writer.writeDouble(
      2,
      f
    );
  }
  f = message.getLongitude();
  if (f !== 0.0) {
    writer.writeDouble(
      3,
      f
    );
  }
  f = message.getSpeed();
  if (f !== 0.0) {
    writer.writeDouble(
      4,
      f
    );
  }
  f = message.getPdop();
  if (f !== 0) {
    writer.writeInt32(
      5,
      f
    );
  }
  f = message.getHdop();
  if (f !== 0) {
    writer.writeInt32(
      6,
      f
    );
  }
  f = message.getVdop();
  if (f !== 0) {
    writer.writeInt32(
      7,
      f
    );
  }
  f = message.getNsat();
  if (f !== 0) {
    writer.writeInt32(
      8,
      f
    );
  }
  f = message.getNs();
  if (f !== 0) {
    writer.writeInt32(
      9,
      f
    );
  }
  f = message.getCourse();
  if (f !== 0) {
    writer.writeInt32(
      10,
      f
    );
  }
  f = message.getLiquidSensorsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      11,
      f,
      proto.position.LiquidSensor.serializeBinaryToWriter
    );
  }
  f = message.getAnSensorsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      12,
      f,
      proto.position.AnSensor.serializeBinaryToWriter
    );
  }
  f = message.getNavigationTime();
  if (f.length > 0) {
    writer.writeString(
      13,
      f
    );
  }
  f = message.getReceivingTime();
  if (f.length > 0) {
    writer.writeString(
      14,
      f
    );
  }
};


/**
 * optional string device_id = 1;
 * @return {string}
 */
proto.position.Point.prototype.getDeviceId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.position.Point} returns this
 */
proto.position.Point.prototype.setDeviceId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional double latitude = 2;
 * @return {number}
 */
proto.position.Point.prototype.getLatitude = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.position.Point} returns this
 */
proto.position.Point.prototype.setLatitude = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};


/**
 * optional double longitude = 3;
 * @return {number}
 */
proto.position.Point.prototype.getLongitude = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.position.Point} returns this
 */
proto.position.Point.prototype.setLongitude = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional double speed = 4;
 * @return {number}
 */
proto.position.Point.prototype.getSpeed = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.position.Point} returns this
 */
proto.position.Point.prototype.setSpeed = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


/**
 * optional int32 pdop = 5;
 * @return {number}
 */
proto.position.Point.prototype.getPdop = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.position.Point} returns this
 */
proto.position.Point.prototype.setPdop = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional int32 hdop = 6;
 * @return {number}
 */
proto.position.Point.prototype.getHdop = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.position.Point} returns this
 */
proto.position.Point.prototype.setHdop = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional int32 vdop = 7;
 * @return {number}
 */
proto.position.Point.prototype.getVdop = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.position.Point} returns this
 */
proto.position.Point.prototype.setVdop = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * optional int32 nsat = 8;
 * @return {number}
 */
proto.position.Point.prototype.getNsat = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.position.Point} returns this
 */
proto.position.Point.prototype.setNsat = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * optional int32 ns = 9;
 * @return {number}
 */
proto.position.Point.prototype.getNs = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {number} value
 * @return {!proto.position.Point} returns this
 */
proto.position.Point.prototype.setNs = function(value) {
  return jspb.Message.setProto3IntField(this, 9, value);
};


/**
 * optional int32 course = 10;
 * @return {number}
 */
proto.position.Point.prototype.getCourse = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 10, 0));
};


/**
 * @param {number} value
 * @return {!proto.position.Point} returns this
 */
proto.position.Point.prototype.setCourse = function(value) {
  return jspb.Message.setProto3IntField(this, 10, value);
};


/**
 * repeated LiquidSensor liquid_sensors = 11;
 * @return {!Array<!proto.position.LiquidSensor>}
 */
proto.position.Point.prototype.getLiquidSensorsList = function() {
  return /** @type{!Array<!proto.position.LiquidSensor>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.position.LiquidSensor, 11));
};


/**
 * @param {!Array<!proto.position.LiquidSensor>} value
 * @return {!proto.position.Point} returns this
*/
proto.position.Point.prototype.setLiquidSensorsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 11, value);
};


/**
 * @param {!proto.position.LiquidSensor=} opt_value
 * @param {number=} opt_index
 * @return {!proto.position.LiquidSensor}
 */
proto.position.Point.prototype.addLiquidSensors = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 11, opt_value, proto.position.LiquidSensor, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.position.Point} returns this
 */
proto.position.Point.prototype.clearLiquidSensorsList = function() {
  return this.setLiquidSensorsList([]);
};


/**
 * repeated AnSensor an_sensors = 12;
 * @return {!Array<!proto.position.AnSensor>}
 */
proto.position.Point.prototype.getAnSensorsList = function() {
  return /** @type{!Array<!proto.position.AnSensor>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.position.AnSensor, 12));
};


/**
 * @param {!Array<!proto.position.AnSensor>} value
 * @return {!proto.position.Point} returns this
*/
proto.position.Point.prototype.setAnSensorsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 12, value);
};


/**
 * @param {!proto.position.AnSensor=} opt_value
 * @param {number=} opt_index
 * @return {!proto.position.AnSensor}
 */
proto.position.Point.prototype.addAnSensors = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 12, opt_value, proto.position.AnSensor, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.position.Point} returns this
 */
proto.position.Point.prototype.clearAnSensorsList = function() {
  return this.setAnSensorsList([]);
};


/**
 * optional string navigation_time = 13;
 * @return {string}
 */
proto.position.Point.prototype.getNavigationTime = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 13, ""));
};


/**
 * @param {string} value
 * @return {!proto.position.Point} returns this
 */
proto.position.Point.prototype.setNavigationTime = function(value) {
  return jspb.Message.setProto3StringField(this, 13, value);
};


/**
 * optional string receiving_time = 14;
 * @return {string}
 */
proto.position.Point.prototype.getReceivingTime = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 14, ""));
};


/**
 * @param {string} value
 * @return {!proto.position.Point} returns this
 */
proto.position.Point.prototype.setReceivingTime = function(value) {
  return jspb.Message.setProto3StringField(this, 14, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.position.LiquidSensor.prototype.toObject = function(opt_includeInstance) {
  return proto.position.LiquidSensor.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.position.LiquidSensor} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.position.LiquidSensor.toObject = function(includeInstance, msg) {
  var f, obj = {
    sensorNumber: jspb.Message.getFieldWithDefault(msg, 1, ""),
    errorFlag: jspb.Message.getFieldWithDefault(msg, 2, ""),
    valueMm: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
    valueLiters: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.position.LiquidSensor}
 */
proto.position.LiquidSensor.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.position.LiquidSensor;
  return proto.position.LiquidSensor.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.position.LiquidSensor} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.position.LiquidSensor}
 */
proto.position.LiquidSensor.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSensorNumber(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setErrorFlag(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setValueMm(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setValueLiters(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.position.LiquidSensor.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.position.LiquidSensor.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.position.LiquidSensor} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.position.LiquidSensor.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSensorNumber();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getErrorFlag();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getValueMm();
  if (f !== 0.0) {
    writer.writeDouble(
      3,
      f
    );
  }
  f = message.getValueLiters();
  if (f !== 0.0) {
    writer.writeDouble(
      4,
      f
    );
  }
};


/**
 * optional string sensor_number = 1;
 * @return {string}
 */
proto.position.LiquidSensor.prototype.getSensorNumber = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.position.LiquidSensor} returns this
 */
proto.position.LiquidSensor.prototype.setSensorNumber = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string error_flag = 2;
 * @return {string}
 */
proto.position.LiquidSensor.prototype.getErrorFlag = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.position.LiquidSensor} returns this
 */
proto.position.LiquidSensor.prototype.setErrorFlag = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional double value_mm = 3;
 * @return {number}
 */
proto.position.LiquidSensor.prototype.getValueMm = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.position.LiquidSensor} returns this
 */
proto.position.LiquidSensor.prototype.setValueMm = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional double value_liters = 4;
 * @return {number}
 */
proto.position.LiquidSensor.prototype.getValueLiters = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.position.LiquidSensor} returns this
 */
proto.position.LiquidSensor.prototype.setValueLiters = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.position.AnSensor.prototype.toObject = function(opt_includeInstance) {
  return proto.position.AnSensor.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.position.AnSensor} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.position.AnSensor.toObject = function(includeInstance, msg) {
  var f, obj = {
    sensorNumber: jspb.Message.getFieldWithDefault(msg, 1, ""),
    value: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.position.AnSensor}
 */
proto.position.AnSensor.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.position.AnSensor;
  return proto.position.AnSensor.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.position.AnSensor} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.position.AnSensor}
 */
proto.position.AnSensor.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSensorNumber(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setValue(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.position.AnSensor.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.position.AnSensor.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.position.AnSensor} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.position.AnSensor.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSensorNumber();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getValue();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
};


/**
 * optional string sensor_number = 1;
 * @return {string}
 */
proto.position.AnSensor.prototype.getSensorNumber = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.position.AnSensor} returns this
 */
proto.position.AnSensor.prototype.setSensorNumber = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional int64 value = 2;
 * @return {number}
 */
proto.position.AnSensor.prototype.getValue = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.position.AnSensor} returns this
 */
proto.position.AnSensor.prototype.setValue = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.position.Unit.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.position.Unit.prototype.toObject = function(opt_includeInstance) {
  return proto.position.Unit.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.position.Unit} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.position.Unit.toObject = function(includeInstance, msg) {
  var f, obj = {
    objectIdsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.position.Unit}
 */
proto.position.Unit.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.position.Unit;
  return proto.position.Unit.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.position.Unit} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.position.Unit}
 */
proto.position.Unit.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.addObjectIds(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.position.Unit.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.position.Unit.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.position.Unit} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.position.Unit.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getObjectIdsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      1,
      f
    );
  }
};


/**
 * repeated string object_ids = 1;
 * @return {!Array<string>}
 */
proto.position.Unit.prototype.getObjectIdsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.position.Unit} returns this
 */
proto.position.Unit.prototype.setObjectIdsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.position.Unit} returns this
 */
proto.position.Unit.prototype.addObjectIds = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.position.Unit} returns this
 */
proto.position.Unit.prototype.clearObjectIdsList = function() {
  return this.setObjectIdsList([]);
};


goog.object.extend(exports, proto.position);
