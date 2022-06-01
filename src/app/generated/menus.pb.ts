/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import {
  GrpcMessage,
  RecursivePartial,
  ToProtobufJSONOptions
} from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';

/**
 * Message implementation for menus.v1.MenusReply
 */
export class MenusReply implements GrpcMessage {
  static id = 'menus.v1.MenusReply';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new MenusReply();
    MenusReply.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: MenusReply) {
    _instance.menus = _instance.menus || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: MenusReply,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new MenuItem();
          _reader.readMessage(
            messageInitializer1,
            MenuItem.deserializeBinaryFromReader
          );
          (_instance.menus = _instance.menus || []).push(messageInitializer1);
          break;
        default:
          _reader.skipField();
      }
    }

    MenusReply.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: MenusReply, _writer: BinaryWriter) {
    if (_instance.menus && _instance.menus.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.menus as any,
        MenuItem.serializeBinaryToWriter
      );
    }
  }

  private _menus?: MenuItem[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of MenusReply to deeply clone from
   */
  constructor(_value?: RecursivePartial<MenusReply.AsObject>) {
    _value = _value || {};
    this.menus = (_value.menus || []).map(m => new MenuItem(m));
    MenusReply.refineValues(this);
  }
  get menus(): MenuItem[] | undefined {
    return this._menus;
  }
  set menus(value: MenuItem[] | undefined) {
    this._menus = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    MenusReply.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): MenusReply.AsObject {
    return {
      menus: (this.menus || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): MenusReply.AsProtobufJSON {
    return {
      menus: (this.menus || []).map(m => m.toProtobufJSON(options))
    };
  }
}
export module MenusReply {
  /**
   * Standard JavaScript object representation for MenusReply
   */
  export interface AsObject {
    menus?: MenuItem.AsObject[];
  }

  /**
   * Protobuf JSON representation for MenusReply
   */
  export interface AsProtobufJSON {
    menus?: MenuItem.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for menus.v1.MenuItem
 */
export class MenuItem implements GrpcMessage {
  static id = 'menus.v1.MenuItem';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new MenuItem();
    MenuItem.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: MenuItem) {
    _instance.url = _instance.url || '';
    _instance.name = _instance.name || '';
    _instance.iconClass = _instance.iconClass || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: MenuItem,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.url = _reader.readString();
          break;
        case 2:
          _instance.name = _reader.readString();
          break;
        case 3:
          _instance.iconClass = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    MenuItem.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: MenuItem, _writer: BinaryWriter) {
    if (_instance.url) {
      _writer.writeString(1, _instance.url);
    }
    if (_instance.name) {
      _writer.writeString(2, _instance.name);
    }
    if (_instance.iconClass) {
      _writer.writeString(3, _instance.iconClass);
    }
  }

  private _url?: string;
  private _name?: string;
  private _iconClass?: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of MenuItem to deeply clone from
   */
  constructor(_value?: RecursivePartial<MenuItem.AsObject>) {
    _value = _value || {};
    this.url = _value.url;
    this.name = _value.name;
    this.iconClass = _value.iconClass;
    MenuItem.refineValues(this);
  }
  get url(): string | undefined {
    return this._url;
  }
  set url(value: string | undefined) {
    this._url = value;
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
    this._name = value;
  }
  get iconClass(): string | undefined {
    return this._iconClass;
  }
  set iconClass(value: string | undefined) {
    this._iconClass = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    MenuItem.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): MenuItem.AsObject {
    return {
      url: this.url,
      name: this.name,
      iconClass: this.iconClass
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): MenuItem.AsProtobufJSON {
    return {
      url: this.url,
      name: this.name,
      iconClass: this.iconClass
    };
  }
}
export module MenuItem {
  /**
   * Standard JavaScript object representation for MenuItem
   */
  export interface AsObject {
    url?: string;
    name?: string;
    iconClass?: string;
  }

  /**
   * Protobuf JSON representation for MenuItem
   */
  export interface AsProtobufJSON {
    url?: string;
    name?: string;
    iconClass?: string;
  }
}

/**
 * Message implementation for menus.v1.MenusEmpty
 */
export class MenusEmpty implements GrpcMessage {
  static id = 'menus.v1.MenusEmpty';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new MenusEmpty();
    MenusEmpty.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: MenusEmpty) {}

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: MenusEmpty,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        default:
          _reader.skipField();
      }
    }

    MenusEmpty.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: MenusEmpty,
    _writer: BinaryWriter
  ) {}

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of MenusEmpty to deeply clone from
   */
  constructor(_value?: RecursivePartial<MenusEmpty.AsObject>) {
    _value = _value || {};
    MenusEmpty.refineValues(this);
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    MenusEmpty.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): MenusEmpty.AsObject {
    return {};
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): MenusEmpty.AsProtobufJSON {
    return {};
  }
}
export module MenusEmpty {
  /**
   * Standard JavaScript object representation for MenusEmpty
   */
  export interface AsObject {}

  /**
   * Protobuf JSON representation for MenusEmpty
   */
  export interface AsProtobufJSON {}
}
