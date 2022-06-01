/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import { Inject, Injectable, Optional } from '@angular/core';
import {
  GrpcCallType,
  GrpcClient,
  GrpcClientFactory,
  GrpcEvent,
  GrpcMetadata
} from '@ngx-grpc/common';
import {
  GRPC_CLIENT_FACTORY,
  GrpcHandler,
  takeMessages,
  throwStatusErrors
} from '@ngx-grpc/core';
import { Observable, Subscription } from 'rxjs';
import * as thisProto from './menus.pb';
import { GRPC_MENUS_CLIENT_SETTINGS } from './menus.pbconf';
/**
 * Service client implementation for menus.v1.Menus
 */
@Injectable({ providedIn: 'any' })
export class MenusClient {
  private client: GrpcClient<any>;

  /**
   * Raw RPC implementation for each service client method.
   * The raw methods provide more control on the incoming data and events. E.g. they can be useful to read status `OK` metadata.
   * Attention: these methods do not throw errors when non-zero status codes are received.
   */
  $raw = {
    /**
     * Unary call: /menus.v1.Menus/GetMenus
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.MenusReply>>
     */
    getMenus: (
      requestData: thisProto.MenusEmpty,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.MenusReply>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/menus.v1.Menus/GetMenus',
        requestData,
        requestMetadata,
        requestClass: thisProto.MenusEmpty,
        responseClass: thisProto.MenusReply
      });
    },
    /**
     * Server streaming: /menus.v1.Menus/GetMenusStream
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.MenuItem>>
     */
    getMenusStream: (
      requestData: thisProto.MenusEmpty,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.MenuItem>> => {
      return this.handler.handle({
        type: GrpcCallType.serverStream,
        client: this.client,
        path: '/menus.v1.Menus/GetMenusStream',
        requestData,
        requestMetadata,
        requestClass: thisProto.MenusEmpty,
        responseClass: thisProto.MenuItem
      });
    }
  };

  constructor(
    @Optional() @Inject(GRPC_MENUS_CLIENT_SETTINGS) settings: any,
    @Inject(GRPC_CLIENT_FACTORY) clientFactory: GrpcClientFactory<any>,
    private handler: GrpcHandler
  ) {
    this.client = clientFactory.createClient('menus.v1.Menus', settings);
  }

  /**
   * Unary call @/menus.v1.Menus/GetMenus
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.MenusReply>
   */
  getMenus(
    requestData: thisProto.MenusEmpty,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.MenusReply> {
    return this.$raw
      .getMenus(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Server streaming @/menus.v1.Menus/GetMenusStream
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.MenuItem>
   */
  getMenusStream(
    requestData: thisProto.MenusEmpty,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.MenuItem> {
    return this.$raw
      .getMenusStream(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }
}
