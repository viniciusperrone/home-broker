import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import crypto from "crypto";

import { Wallet, WalletDocument } from "src/wallets/entities/wallet.entity";
import { Asset, AssetDocument } from "src/assets/entities/asset.entity";

export type OrderDocument = HydratedDocument<Order>;

export enum OrderType {
  BUY = 'BUY',
  SELL = 'SELL'
}

export enum OrderStatus {
  PENDING = 'PENDING',
  OPEN = 'SELL',
  CLOSE = 'CLOSE',
  FAILED = 'FAILED'
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ default: () => crypto.randomUUID() })
  _id: string;

  @Prop({ type: mongoose.Schema.Types.Int32 })
  shares: number;

  @Prop({ type: mongoose.Schema.Types.Int32 })
  partial: number;

  @Prop({ type: mongoose.Schema.Types.Int32 })
  price: number;

  @Prop()
  type: OrderType;

  @Prop()
  status: OrderStatus;

  @Prop({ type: String, ref: Wallet.name })
  wallet: WalletDocument | string;

  @Prop({ type: String, ref: Asset.name })
  asset: AssetDocument | string;

  @Prop()
  createdAt!: Date;

  @Prop()
  updatedAt!: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
