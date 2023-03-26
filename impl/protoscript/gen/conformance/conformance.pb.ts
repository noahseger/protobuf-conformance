// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// Source: conformance/conformance.proto
/* eslint-disable */

import type { ByteSource } from "protoscript";
import {
  BinaryReader,
  BinaryWriter,
  encodeBase64Bytes,
  decodeBase64Bytes,
} from "protoscript";

//========================================//
//                 Types                  //
//========================================//

export type WireFormat =
  | "UNSPECIFIED"
  | "PROTOBUF"
  | "JSON"
  | "JSPB"
  | "TEXT_FORMAT";

export type TestCategory =
  | "UNSPECIFIED_TEST"
  | "BINARY_TEST"
  | "JSON_TEST"
  | "JSON_IGNORE_UNKNOWN_PARSING_TEST"
  | "JSPB_TEST"
  | "TEXT_FORMAT_TEST";

/**
 * The conformance runner will request a list of failures as the first request.
 * This will be known by message_type == "conformance.FailureSet", a conformance
 * test should return a serialized FailureSet in protobuf_payload.
 */
export interface FailureSet {
  failure: string[];
}

/**
 * Represents a single test case's input.  The testee should:
 *
 *   1. parse this proto (which should always succeed)
 *   2. parse the protobuf or JSON payload in "payload" (which may fail)
 *   3. if the parse succeeded, serialize the message in the requested format.
 */
export interface ConformanceRequest {
  protobufPayload?: Uint8Array | null | undefined;
  jsonPayload?: string | null | undefined;
  /**
   * Only used inside Google.  Opensource testees just skip it.
   */
  jspbPayload?: string | null | undefined;
  textPayload?: string | null | undefined;
  /**
   * Which format should the testee serialize its message to?
   */
  requestedOutputFormat: WireFormat;
  /**
   * The full name for the test message to use; for the moment, either:
   * protobuf_test_messages.proto3.TestAllTypesProto3 or
   * protobuf_test_messages.google.protobuf.TestAllTypesProto2.
   */
  messageType: string;
  /**
   * Each test is given a specific test category. Some category may need
   * specific support in testee programs. Refer to the definition of
   * TestCategory for more information.
   */
  testCategory: TestCategory;
  /**
   * Specify details for how to encode jspb.
   */
  jspbEncodingOptions: JspbEncodingConfig;
  /**
   * This can be used in json and text format. If true, testee should print
   * unknown fields instead of ignore. This feature is optional.
   */
  printUnknownFields: boolean;
}

/**
 * Represents a single test case's output.
 */
export interface ConformanceResponse {
  /**
   * This string should be set to indicate parsing failed.  The string can
   * provide more information about the parse error if it is available.
   *
   * Setting this string does not necessarily mean the testee failed the
   * test.  Some of the test cases are intentionally invalid input.
   */
  parseError?: string | null | undefined;
  /**
   * If the input was successfully parsed but errors occurred when
   * serializing it to the requested output format, set the error message in
   * this field.
   */
  serializeError?: string | null | undefined;
  /**
   * This should be set if the test program timed out.  The string should
   * provide more information about what the child process was doing when it
   * was killed.
   */
  timeoutError?: string | null | undefined;
  /**
   * This should be set if some other error occurred.  This will always
   * indicate that the test failed.  The string can provide more information
   * about the failure.
   */
  runtimeError?: string | null | undefined;
  /**
   * If the input was successfully parsed and the requested output was
   * protobuf, serialize it to protobuf and set it in this field.
   */
  protobufPayload?: Uint8Array | null | undefined;
  /**
   * If the input was successfully parsed and the requested output was JSON,
   * serialize to JSON and set it in this field.
   */
  jsonPayload?: string | null | undefined;
  /**
   * For when the testee skipped the test, likely because a certain feature
   * wasn't supported, like JSON input/output.
   */
  skipped?: string | null | undefined;
  /**
   * If the input was successfully parsed and the requested output was JSPB,
   * serialize to JSPB and set it in this field. JSPB is only used inside
   * Google. Opensource testees can just skip it.
   */
  jspbPayload?: string | null | undefined;
  /**
   * If the input was successfully parsed and the requested output was
   * TEXT_FORMAT, serialize to TEXT_FORMAT and set it in this field.
   */
  textPayload?: string | null | undefined;
}

/**
 * Encoding options for jspb format.
 */
export interface JspbEncodingConfig {
  /**
   * Encode the value field of Any as jspb array if true, otherwise binary.
   */
  useJspbArrayAnyFormat: boolean;
}

//========================================//
//        Protobuf Encode / Decode        //
//========================================//

export const WireFormat = {
  UNSPECIFIED: "UNSPECIFIED",
  PROTOBUF: "PROTOBUF",
  JSON: "JSON",
  JSPB: "JSPB",
  TEXT_FORMAT: "TEXT_FORMAT",
  /**
   * @private
   */
  _fromInt: function (i: number): WireFormat {
    switch (i) {
      case 0: {
        return "UNSPECIFIED";
      }
      case 1: {
        return "PROTOBUF";
      }
      case 2: {
        return "JSON";
      }
      case 3: {
        return "JSPB";
      }
      case 4: {
        return "TEXT_FORMAT";
      }
      // unknown values are preserved as numbers. this occurs when new enum values are introduced and the generated code is out of date.
      default: {
        return i as unknown as WireFormat;
      }
    }
  },
  /**
   * @private
   */
  _toInt: function (i: WireFormat): number {
    switch (i) {
      case "UNSPECIFIED": {
        return 0;
      }
      case "PROTOBUF": {
        return 1;
      }
      case "JSON": {
        return 2;
      }
      case "JSPB": {
        return 3;
      }
      case "TEXT_FORMAT": {
        return 4;
      }
      // unknown values are preserved as numbers. this occurs when new enum values are introduced and the generated code is out of date.
      default: {
        return i as unknown as number;
      }
    }
  },
} as const;

export const TestCategory = {
  UNSPECIFIED_TEST: "UNSPECIFIED_TEST",
  BINARY_TEST: "BINARY_TEST",
  JSON_TEST: "JSON_TEST",
  /**
   * Similar to JSON_TEST. However, during parsing json, testee should ignore
   * unknown fields. This feature is optional. Each implementation can decide
   * whether to support it.  See
   * https://developers.google.com/protocol-buffers/docs/proto3#json_options
   * for more detail.
   */
  JSON_IGNORE_UNKNOWN_PARSING_TEST: "JSON_IGNORE_UNKNOWN_PARSING_TEST",
  /**
   * Test jspb wire format. Only used inside Google. Opensource testees just
   * skip it.
   */
  JSPB_TEST: "JSPB_TEST",
  /**
   * Test text format. For cpp, java and python, testees can already deal with
   * this type. Testees of other languages can simply skip it.
   */
  TEXT_FORMAT_TEST: "TEXT_FORMAT_TEST",
  /**
   * @private
   */
  _fromInt: function (i: number): TestCategory {
    switch (i) {
      case 0: {
        return "UNSPECIFIED_TEST";
      }
      case 1: {
        return "BINARY_TEST";
      }
      case 2: {
        return "JSON_TEST";
      }
      case 3: {
        return "JSON_IGNORE_UNKNOWN_PARSING_TEST";
      }
      case 4: {
        return "JSPB_TEST";
      }
      case 5: {
        return "TEXT_FORMAT_TEST";
      }
      // unknown values are preserved as numbers. this occurs when new enum values are introduced and the generated code is out of date.
      default: {
        return i as unknown as TestCategory;
      }
    }
  },
  /**
   * @private
   */
  _toInt: function (i: TestCategory): number {
    switch (i) {
      case "UNSPECIFIED_TEST": {
        return 0;
      }
      case "BINARY_TEST": {
        return 1;
      }
      case "JSON_TEST": {
        return 2;
      }
      case "JSON_IGNORE_UNKNOWN_PARSING_TEST": {
        return 3;
      }
      case "JSPB_TEST": {
        return 4;
      }
      case "TEXT_FORMAT_TEST": {
        return 5;
      }
      // unknown values are preserved as numbers. this occurs when new enum values are introduced and the generated code is out of date.
      default: {
        return i as unknown as number;
      }
    }
  },
} as const;

export const FailureSet = {
  /**
   * Serializes FailureSet to protobuf.
   */
  encode: function (msg: Partial<FailureSet>): Uint8Array {
    return FailureSet._writeMessage(msg, new BinaryWriter()).getResultBuffer();
  },

  /**
   * Deserializes FailureSet from protobuf.
   */
  decode: function (bytes: ByteSource): FailureSet {
    return FailureSet._readMessage(
      FailureSet.initialize(),
      new BinaryReader(bytes)
    );
  },

  /**
   * Initializes FailureSet with all fields set to their default value.
   */
  initialize: function (): FailureSet {
    return {
      failure: [],
    };
  },

  /**
   * @private
   */
  _writeMessage: function (
    msg: Partial<FailureSet>,
    writer: BinaryWriter
  ): BinaryWriter {
    if (msg.failure?.length) {
      writer.writeRepeatedString(1, msg.failure);
    }
    return writer;
  },

  /**
   * @private
   */
  _readMessage: function (msg: FailureSet, reader: BinaryReader): FailureSet {
    while (reader.nextField()) {
      const field = reader.getFieldNumber();
      switch (field) {
        case 1: {
          msg.failure.push(reader.readString());
          break;
        }
        default: {
          reader.skipField();
          break;
        }
      }
    }
    return msg;
  },
};

export const ConformanceRequest = {
  /**
   * Serializes ConformanceRequest to protobuf.
   */
  encode: function (msg: Partial<ConformanceRequest>): Uint8Array {
    return ConformanceRequest._writeMessage(
      msg,
      new BinaryWriter()
    ).getResultBuffer();
  },

  /**
   * Deserializes ConformanceRequest from protobuf.
   */
  decode: function (bytes: ByteSource): ConformanceRequest {
    return ConformanceRequest._readMessage(
      ConformanceRequest.initialize(),
      new BinaryReader(bytes)
    );
  },

  /**
   * Initializes ConformanceRequest with all fields set to their default value.
   */
  initialize: function (): ConformanceRequest {
    return {
      protobufPayload: undefined,
      jsonPayload: undefined,
      jspbPayload: undefined,
      textPayload: undefined,
      requestedOutputFormat: WireFormat._fromInt(0),
      messageType: "",
      testCategory: TestCategory._fromInt(0),
      jspbEncodingOptions: JspbEncodingConfig.initialize(),
      printUnknownFields: false,
    };
  },

  /**
   * @private
   */
  _writeMessage: function (
    msg: Partial<ConformanceRequest>,
    writer: BinaryWriter
  ): BinaryWriter {
    if (msg.protobufPayload?.length) {
      writer.writeBytes(1, msg.protobufPayload);
    }
    if (msg.jsonPayload != undefined) {
      writer.writeString(2, msg.jsonPayload);
    }
    if (msg.jspbPayload != undefined) {
      writer.writeString(7, msg.jspbPayload);
    }
    if (msg.textPayload != undefined) {
      writer.writeString(8, msg.textPayload);
    }
    if (
      msg.requestedOutputFormat &&
      WireFormat._toInt(msg.requestedOutputFormat)
    ) {
      writer.writeEnum(3, WireFormat._toInt(msg.requestedOutputFormat));
    }
    if (msg.messageType) {
      writer.writeString(4, msg.messageType);
    }
    if (msg.testCategory && TestCategory._toInt(msg.testCategory)) {
      writer.writeEnum(5, TestCategory._toInt(msg.testCategory));
    }
    if (msg.jspbEncodingOptions) {
      writer.writeMessage(
        6,
        msg.jspbEncodingOptions,
        JspbEncodingConfig._writeMessage
      );
    }
    if (msg.printUnknownFields) {
      writer.writeBool(9, msg.printUnknownFields);
    }
    return writer;
  },

  /**
   * @private
   */
  _readMessage: function (
    msg: ConformanceRequest,
    reader: BinaryReader
  ): ConformanceRequest {
    while (reader.nextField()) {
      const field = reader.getFieldNumber();
      switch (field) {
        case 1: {
          msg.protobufPayload = reader.readBytes();
          break;
        }
        case 2: {
          msg.jsonPayload = reader.readString();
          break;
        }
        case 7: {
          msg.jspbPayload = reader.readString();
          break;
        }
        case 8: {
          msg.textPayload = reader.readString();
          break;
        }
        case 3: {
          msg.requestedOutputFormat = WireFormat._fromInt(reader.readEnum());
          break;
        }
        case 4: {
          msg.messageType = reader.readString();
          break;
        }
        case 5: {
          msg.testCategory = TestCategory._fromInt(reader.readEnum());
          break;
        }
        case 6: {
          reader.readMessage(
            msg.jspbEncodingOptions,
            JspbEncodingConfig._readMessage
          );
          break;
        }
        case 9: {
          msg.printUnknownFields = reader.readBool();
          break;
        }
        default: {
          reader.skipField();
          break;
        }
      }
    }
    return msg;
  },
};

export const ConformanceResponse = {
  /**
   * Serializes ConformanceResponse to protobuf.
   */
  encode: function (msg: Partial<ConformanceResponse>): Uint8Array {
    return ConformanceResponse._writeMessage(
      msg,
      new BinaryWriter()
    ).getResultBuffer();
  },

  /**
   * Deserializes ConformanceResponse from protobuf.
   */
  decode: function (bytes: ByteSource): ConformanceResponse {
    return ConformanceResponse._readMessage(
      ConformanceResponse.initialize(),
      new BinaryReader(bytes)
    );
  },

  /**
   * Initializes ConformanceResponse with all fields set to their default value.
   */
  initialize: function (): ConformanceResponse {
    return {
      parseError: undefined,
      serializeError: undefined,
      timeoutError: undefined,
      runtimeError: undefined,
      protobufPayload: undefined,
      jsonPayload: undefined,
      skipped: undefined,
      jspbPayload: undefined,
      textPayload: undefined,
    };
  },

  /**
   * @private
   */
  _writeMessage: function (
    msg: Partial<ConformanceResponse>,
    writer: BinaryWriter
  ): BinaryWriter {
    if (msg.parseError != undefined) {
      writer.writeString(1, msg.parseError);
    }
    if (msg.serializeError != undefined) {
      writer.writeString(6, msg.serializeError);
    }
    if (msg.timeoutError != undefined) {
      writer.writeString(9, msg.timeoutError);
    }
    if (msg.runtimeError != undefined) {
      writer.writeString(2, msg.runtimeError);
    }
    if (msg.protobufPayload?.length) {
      writer.writeBytes(3, msg.protobufPayload);
    }
    if (msg.jsonPayload != undefined) {
      writer.writeString(4, msg.jsonPayload);
    }
    if (msg.skipped != undefined) {
      writer.writeString(5, msg.skipped);
    }
    if (msg.jspbPayload != undefined) {
      writer.writeString(7, msg.jspbPayload);
    }
    if (msg.textPayload != undefined) {
      writer.writeString(8, msg.textPayload);
    }
    return writer;
  },

  /**
   * @private
   */
  _readMessage: function (
    msg: ConformanceResponse,
    reader: BinaryReader
  ): ConformanceResponse {
    while (reader.nextField()) {
      const field = reader.getFieldNumber();
      switch (field) {
        case 1: {
          msg.parseError = reader.readString();
          break;
        }
        case 6: {
          msg.serializeError = reader.readString();
          break;
        }
        case 9: {
          msg.timeoutError = reader.readString();
          break;
        }
        case 2: {
          msg.runtimeError = reader.readString();
          break;
        }
        case 3: {
          msg.protobufPayload = reader.readBytes();
          break;
        }
        case 4: {
          msg.jsonPayload = reader.readString();
          break;
        }
        case 5: {
          msg.skipped = reader.readString();
          break;
        }
        case 7: {
          msg.jspbPayload = reader.readString();
          break;
        }
        case 8: {
          msg.textPayload = reader.readString();
          break;
        }
        default: {
          reader.skipField();
          break;
        }
      }
    }
    return msg;
  },
};

export const JspbEncodingConfig = {
  /**
   * Serializes JspbEncodingConfig to protobuf.
   */
  encode: function (msg: Partial<JspbEncodingConfig>): Uint8Array {
    return JspbEncodingConfig._writeMessage(
      msg,
      new BinaryWriter()
    ).getResultBuffer();
  },

  /**
   * Deserializes JspbEncodingConfig from protobuf.
   */
  decode: function (bytes: ByteSource): JspbEncodingConfig {
    return JspbEncodingConfig._readMessage(
      JspbEncodingConfig.initialize(),
      new BinaryReader(bytes)
    );
  },

  /**
   * Initializes JspbEncodingConfig with all fields set to their default value.
   */
  initialize: function (): JspbEncodingConfig {
    return {
      useJspbArrayAnyFormat: false,
    };
  },

  /**
   * @private
   */
  _writeMessage: function (
    msg: Partial<JspbEncodingConfig>,
    writer: BinaryWriter
  ): BinaryWriter {
    if (msg.useJspbArrayAnyFormat) {
      writer.writeBool(1, msg.useJspbArrayAnyFormat);
    }
    return writer;
  },

  /**
   * @private
   */
  _readMessage: function (
    msg: JspbEncodingConfig,
    reader: BinaryReader
  ): JspbEncodingConfig {
    while (reader.nextField()) {
      const field = reader.getFieldNumber();
      switch (field) {
        case 1: {
          msg.useJspbArrayAnyFormat = reader.readBool();
          break;
        }
        default: {
          reader.skipField();
          break;
        }
      }
    }
    return msg;
  },
};

//========================================//
//          JSON Encode / Decode          //
//========================================//

export const WireFormatJSON = {
  UNSPECIFIED: "UNSPECIFIED",
  PROTOBUF: "PROTOBUF",
  JSON: "JSON",
  JSPB: "JSPB",
  TEXT_FORMAT: "TEXT_FORMAT",
  /**
   * @private
   */
  _fromInt: function (i: number): WireFormat {
    switch (i) {
      case 0: {
        return "UNSPECIFIED";
      }
      case 1: {
        return "PROTOBUF";
      }
      case 2: {
        return "JSON";
      }
      case 3: {
        return "JSPB";
      }
      case 4: {
        return "TEXT_FORMAT";
      }
      // unknown values are preserved as numbers. this occurs when new enum values are introduced and the generated code is out of date.
      default: {
        return i as unknown as WireFormat;
      }
    }
  },
  /**
   * @private
   */
  _toInt: function (i: WireFormat): number {
    switch (i) {
      case "UNSPECIFIED": {
        return 0;
      }
      case "PROTOBUF": {
        return 1;
      }
      case "JSON": {
        return 2;
      }
      case "JSPB": {
        return 3;
      }
      case "TEXT_FORMAT": {
        return 4;
      }
      // unknown values are preserved as numbers. this occurs when new enum values are introduced and the generated code is out of date.
      default: {
        return i as unknown as number;
      }
    }
  },
} as const;

export const TestCategoryJSON = {
  UNSPECIFIED_TEST: "UNSPECIFIED_TEST",
  BINARY_TEST: "BINARY_TEST",
  JSON_TEST: "JSON_TEST",
  /**
   * Similar to JSON_TEST. However, during parsing json, testee should ignore
   * unknown fields. This feature is optional. Each implementation can decide
   * whether to support it.  See
   * https://developers.google.com/protocol-buffers/docs/proto3#json_options
   * for more detail.
   */
  JSON_IGNORE_UNKNOWN_PARSING_TEST: "JSON_IGNORE_UNKNOWN_PARSING_TEST",
  /**
   * Test jspb wire format. Only used inside Google. Opensource testees just
   * skip it.
   */
  JSPB_TEST: "JSPB_TEST",
  /**
   * Test text format. For cpp, java and python, testees can already deal with
   * this type. Testees of other languages can simply skip it.
   */
  TEXT_FORMAT_TEST: "TEXT_FORMAT_TEST",
  /**
   * @private
   */
  _fromInt: function (i: number): TestCategory {
    switch (i) {
      case 0: {
        return "UNSPECIFIED_TEST";
      }
      case 1: {
        return "BINARY_TEST";
      }
      case 2: {
        return "JSON_TEST";
      }
      case 3: {
        return "JSON_IGNORE_UNKNOWN_PARSING_TEST";
      }
      case 4: {
        return "JSPB_TEST";
      }
      case 5: {
        return "TEXT_FORMAT_TEST";
      }
      // unknown values are preserved as numbers. this occurs when new enum values are introduced and the generated code is out of date.
      default: {
        return i as unknown as TestCategory;
      }
    }
  },
  /**
   * @private
   */
  _toInt: function (i: TestCategory): number {
    switch (i) {
      case "UNSPECIFIED_TEST": {
        return 0;
      }
      case "BINARY_TEST": {
        return 1;
      }
      case "JSON_TEST": {
        return 2;
      }
      case "JSON_IGNORE_UNKNOWN_PARSING_TEST": {
        return 3;
      }
      case "JSPB_TEST": {
        return 4;
      }
      case "TEXT_FORMAT_TEST": {
        return 5;
      }
      // unknown values are preserved as numbers. this occurs when new enum values are introduced and the generated code is out of date.
      default: {
        return i as unknown as number;
      }
    }
  },
} as const;

export const FailureSetJSON = {
  /**
   * Serializes FailureSet to JSON.
   */
  encode: function (msg: Partial<FailureSet>): string {
    return JSON.stringify(FailureSetJSON._writeMessage(msg));
  },

  /**
   * Deserializes FailureSet from JSON.
   */
  decode: function (json: string): FailureSet {
    return FailureSetJSON._readMessage(
      FailureSetJSON.initialize(),
      JSON.parse(json)
    );
  },

  /**
   * Initializes FailureSet with all fields set to their default value.
   */
  initialize: function (): FailureSet {
    return {
      failure: [],
    };
  },

  /**
   * @private
   */
  _writeMessage: function (msg: Partial<FailureSet>): Record<string, unknown> {
    const json: Record<string, unknown> = {};
    if (msg.failure?.length) {
      json["failure"] = msg.failure;
    }
    return json;
  },

  /**
   * @private
   */
  _readMessage: function (msg: FailureSet, json: any): FailureSet {
    const _failure_ = json["failure"];
    if (_failure_) {
      msg.failure = _failure_;
    }
    return msg;
  },
};

export const ConformanceRequestJSON = {
  /**
   * Serializes ConformanceRequest to JSON.
   */
  encode: function (msg: Partial<ConformanceRequest>): string {
    return JSON.stringify(ConformanceRequestJSON._writeMessage(msg));
  },

  /**
   * Deserializes ConformanceRequest from JSON.
   */
  decode: function (json: string): ConformanceRequest {
    return ConformanceRequestJSON._readMessage(
      ConformanceRequestJSON.initialize(),
      JSON.parse(json)
    );
  },

  /**
   * Initializes ConformanceRequest with all fields set to their default value.
   */
  initialize: function (): ConformanceRequest {
    return {
      protobufPayload: undefined,
      jsonPayload: undefined,
      jspbPayload: undefined,
      textPayload: undefined,
      requestedOutputFormat: WireFormat._fromInt(0),
      messageType: "",
      testCategory: TestCategory._fromInt(0),
      jspbEncodingOptions: JspbEncodingConfigJSON.initialize(),
      printUnknownFields: false,
    };
  },

  /**
   * @private
   */
  _writeMessage: function (
    msg: Partial<ConformanceRequest>
  ): Record<string, unknown> {
    const json: Record<string, unknown> = {};
    if (msg.protobufPayload?.length) {
      json["protobufPayload"] = encodeBase64Bytes(msg.protobufPayload);
    }
    if (msg.jsonPayload != undefined) {
      json["jsonPayload"] = msg.jsonPayload;
    }
    if (msg.jspbPayload != undefined) {
      json["jspbPayload"] = msg.jspbPayload;
    }
    if (msg.textPayload != undefined) {
      json["textPayload"] = msg.textPayload;
    }
    if (
      msg.requestedOutputFormat &&
      WireFormatJSON._toInt(msg.requestedOutputFormat)
    ) {
      json["requestedOutputFormat"] = msg.requestedOutputFormat;
    }
    if (msg.messageType) {
      json["messageType"] = msg.messageType;
    }
    if (msg.testCategory && TestCategoryJSON._toInt(msg.testCategory)) {
      json["testCategory"] = msg.testCategory;
    }
    if (msg.jspbEncodingOptions) {
      const _jspbEncodingOptions_ = JspbEncodingConfigJSON._writeMessage(
        msg.jspbEncodingOptions
      );
      if (Object.keys(_jspbEncodingOptions_).length > 0) {
        json["jspbEncodingOptions"] = _jspbEncodingOptions_;
      }
    }
    if (msg.printUnknownFields) {
      json["printUnknownFields"] = msg.printUnknownFields;
    }
    return json;
  },

  /**
   * @private
   */
  _readMessage: function (
    msg: ConformanceRequest,
    json: any
  ): ConformanceRequest {
    const _protobufPayload_ =
      json["protobufPayload"] ?? json["protobuf_payload"];
    if (_protobufPayload_) {
      msg.protobufPayload = decodeBase64Bytes(_protobufPayload_);
    }
    const _jsonPayload_ = json["jsonPayload"] ?? json["json_payload"];
    if (_jsonPayload_) {
      msg.jsonPayload = _jsonPayload_;
    }
    const _jspbPayload_ = json["jspbPayload"] ?? json["jspb_payload"];
    if (_jspbPayload_) {
      msg.jspbPayload = _jspbPayload_;
    }
    const _textPayload_ = json["textPayload"] ?? json["text_payload"];
    if (_textPayload_) {
      msg.textPayload = _textPayload_;
    }
    const _requestedOutputFormat_ =
      json["requestedOutputFormat"] ?? json["requested_output_format"];
    if (_requestedOutputFormat_) {
      msg.requestedOutputFormat = _requestedOutputFormat_;
    }
    const _messageType_ = json["messageType"] ?? json["message_type"];
    if (_messageType_) {
      msg.messageType = _messageType_;
    }
    const _testCategory_ = json["testCategory"] ?? json["test_category"];
    if (_testCategory_) {
      msg.testCategory = _testCategory_;
    }
    const _jspbEncodingOptions_ =
      json["jspbEncodingOptions"] ?? json["jspb_encoding_options"];
    if (_jspbEncodingOptions_) {
      const m = JspbEncodingConfig.initialize();
      JspbEncodingConfigJSON._readMessage(m, _jspbEncodingOptions_);
      msg.jspbEncodingOptions = m;
    }
    const _printUnknownFields_ =
      json["printUnknownFields"] ?? json["print_unknown_fields"];
    if (_printUnknownFields_) {
      msg.printUnknownFields = _printUnknownFields_;
    }
    return msg;
  },
};

export const ConformanceResponseJSON = {
  /**
   * Serializes ConformanceResponse to JSON.
   */
  encode: function (msg: Partial<ConformanceResponse>): string {
    return JSON.stringify(ConformanceResponseJSON._writeMessage(msg));
  },

  /**
   * Deserializes ConformanceResponse from JSON.
   */
  decode: function (json: string): ConformanceResponse {
    return ConformanceResponseJSON._readMessage(
      ConformanceResponseJSON.initialize(),
      JSON.parse(json)
    );
  },

  /**
   * Initializes ConformanceResponse with all fields set to their default value.
   */
  initialize: function (): ConformanceResponse {
    return {
      parseError: undefined,
      serializeError: undefined,
      timeoutError: undefined,
      runtimeError: undefined,
      protobufPayload: undefined,
      jsonPayload: undefined,
      skipped: undefined,
      jspbPayload: undefined,
      textPayload: undefined,
    };
  },

  /**
   * @private
   */
  _writeMessage: function (
    msg: Partial<ConformanceResponse>
  ): Record<string, unknown> {
    const json: Record<string, unknown> = {};
    if (msg.parseError != undefined) {
      json["parseError"] = msg.parseError;
    }
    if (msg.serializeError != undefined) {
      json["serializeError"] = msg.serializeError;
    }
    if (msg.timeoutError != undefined) {
      json["timeoutError"] = msg.timeoutError;
    }
    if (msg.runtimeError != undefined) {
      json["runtimeError"] = msg.runtimeError;
    }
    if (msg.protobufPayload?.length) {
      json["protobufPayload"] = encodeBase64Bytes(msg.protobufPayload);
    }
    if (msg.jsonPayload != undefined) {
      json["jsonPayload"] = msg.jsonPayload;
    }
    if (msg.skipped != undefined) {
      json["skipped"] = msg.skipped;
    }
    if (msg.jspbPayload != undefined) {
      json["jspbPayload"] = msg.jspbPayload;
    }
    if (msg.textPayload != undefined) {
      json["textPayload"] = msg.textPayload;
    }
    return json;
  },

  /**
   * @private
   */
  _readMessage: function (
    msg: ConformanceResponse,
    json: any
  ): ConformanceResponse {
    const _parseError_ = json["parseError"] ?? json["parse_error"];
    if (_parseError_) {
      msg.parseError = _parseError_;
    }
    const _serializeError_ = json["serializeError"] ?? json["serialize_error"];
    if (_serializeError_) {
      msg.serializeError = _serializeError_;
    }
    const _timeoutError_ = json["timeoutError"] ?? json["timeout_error"];
    if (_timeoutError_) {
      msg.timeoutError = _timeoutError_;
    }
    const _runtimeError_ = json["runtimeError"] ?? json["runtime_error"];
    if (_runtimeError_) {
      msg.runtimeError = _runtimeError_;
    }
    const _protobufPayload_ =
      json["protobufPayload"] ?? json["protobuf_payload"];
    if (_protobufPayload_) {
      msg.protobufPayload = decodeBase64Bytes(_protobufPayload_);
    }
    const _jsonPayload_ = json["jsonPayload"] ?? json["json_payload"];
    if (_jsonPayload_) {
      msg.jsonPayload = _jsonPayload_;
    }
    const _skipped_ = json["skipped"];
    if (_skipped_) {
      msg.skipped = _skipped_;
    }
    const _jspbPayload_ = json["jspbPayload"] ?? json["jspb_payload"];
    if (_jspbPayload_) {
      msg.jspbPayload = _jspbPayload_;
    }
    const _textPayload_ = json["textPayload"] ?? json["text_payload"];
    if (_textPayload_) {
      msg.textPayload = _textPayload_;
    }
    return msg;
  },
};

export const JspbEncodingConfigJSON = {
  /**
   * Serializes JspbEncodingConfig to JSON.
   */
  encode: function (msg: Partial<JspbEncodingConfig>): string {
    return JSON.stringify(JspbEncodingConfigJSON._writeMessage(msg));
  },

  /**
   * Deserializes JspbEncodingConfig from JSON.
   */
  decode: function (json: string): JspbEncodingConfig {
    return JspbEncodingConfigJSON._readMessage(
      JspbEncodingConfigJSON.initialize(),
      JSON.parse(json)
    );
  },

  /**
   * Initializes JspbEncodingConfig with all fields set to their default value.
   */
  initialize: function (): JspbEncodingConfig {
    return {
      useJspbArrayAnyFormat: false,
    };
  },

  /**
   * @private
   */
  _writeMessage: function (
    msg: Partial<JspbEncodingConfig>
  ): Record<string, unknown> {
    const json: Record<string, unknown> = {};
    if (msg.useJspbArrayAnyFormat) {
      json["useJspbArrayAnyFormat"] = msg.useJspbArrayAnyFormat;
    }
    return json;
  },

  /**
   * @private
   */
  _readMessage: function (
    msg: JspbEncodingConfig,
    json: any
  ): JspbEncodingConfig {
    const _useJspbArrayAnyFormat_ =
      json["useJspbArrayAnyFormat"] ?? json["use_jspb_array_any_format"];
    if (_useJspbArrayAnyFormat_) {
      msg.useJspbArrayAnyFormat = _useJspbArrayAnyFormat_;
    }
    return msg;
  },
};
