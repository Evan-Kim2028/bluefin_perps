import { order, perpetual, position, margin_bank, funding_rate} from "./types/sui/bluefin_perp.js";
import { SuiNetwork } from "@sentio/sdk/sui";

const SCALE_FACTOR = 10**9; // Define the scaling factor (10^9 for 9 decimals)

export function orderEvents() {
  const processor = order.bind({
    network: SuiNetwork.MAIN_NET
  });

  processor.onEventOrderFillV2(async (self, ctx) => {
    await ctx.eventLogger.emit('OrderFillV2', {
      distinctId: self.data_decoded.sigMaker, // Assuming sigMaker identifies the user
      tx_index: self.data_decoded.tx_index.toString(),
      orderHash: Buffer.from(self.data_decoded.orderHash).toString(),
      sigMaker: self.data_decoded.sigMaker,
      fillPrice: Number(self.data_decoded.fillPrice) / SCALE_FACTOR,
      fillQty: Number(self.data_decoded.fillQty) / SCALE_FACTOR,
      newFilledQuantity: Number(self.data_decoded.newFilledQuantity) / SCALE_FACTOR,
      // Include fields from the nested order object
      market: self.data_decoded.order.market,
      maker: self.data_decoded.order.maker,
      isBuy: self.data_decoded.order.isBuy,
      reduceOnly: self.data_decoded.order.reduceOnly,
      postOnly: self.data_decoded.order.postOnly,
      orderbookOnly: self.data_decoded.order.orderbookOnly,
      ioc: self.data_decoded.order.ioc,
      flags: self.data_decoded.order.flags,
      price: Number(self.data_decoded.order.price) / SCALE_FACTOR,
      quantity: Number(self.data_decoded.order.quantity) / SCALE_FACTOR,
      leverage: Number(self.data_decoded.order.leverage) / SCALE_FACTOR, 
      expiration: self.data_decoded.order.expiration.toString(),
      salt: self.data_decoded.order.salt.toString(),
    });

  });

  return processor;
}

export function perpetualEvents() {
  const processor = perpetual.bind({
    network: SuiNetwork.MAIN_NET
  });

  processor.onEventPerpetualCreationEvent(async (self, ctx) => {
    await ctx.eventLogger.emit('PerpetualCreation', {
      name: self.data_decoded.name,
      market: self.data_decoded.id,
      imr: self.data_decoded.imr.toString(),
      mmr: self.data_decoded.mmr.toString(),
      makerFee: self.data_decoded.makerFee.toString(),
      takerFee: self.data_decoded.takerFee.toString(),
      insurancePoolRatio: self.data_decoded.insurancePoolRatio.toString(),
      insurancePool: self.data_decoded.insurancePool,
      feePool: self.data_decoded.feePool,
      funding: self.data_decoded.funding,
      // trade checks
      minPrice: Number(self.data_decoded.checks.minPrice) / SCALE_FACTOR,
      maxPrice: Number(self.data_decoded.checks.maxPrice) / SCALE_FACTOR,
      tickSize: Number(self.data_decoded.checks.tickSize) / SCALE_FACTOR,
      minQty: Number(self.data_decoded.checks.minQty) / SCALE_FACTOR,
      maxQtyLimit: Number(self.data_decoded.checks.maxQtyLimit) / SCALE_FACTOR,
      maxQtyMarket: Number(self.data_decoded.checks.maxQtyMarket) / SCALE_FACTOR,
      stepSize: Number(self.data_decoded.checks.stepSize) / SCALE_FACTOR,
      mtbLong: Number(self.data_decoded.checks.mtbLong) / SCALE_FACTOR,
      mtbShort: Number(self.data_decoded.checks.mtbShort) / SCALE_FACTOR
    });
  });
}

export function positionEvents() {
  const processor = position.bind({
    network: SuiNetwork.MAIN_NET
  });
  processor.onEventAccountPositionUpdateEventV2(async (self, ctx) => {
    await ctx.eventLogger.emit('AccountPositionUpdateV2', {
        tx_index: self.data_decoded.tx_index.toString(),
        // position object fields
        user: self.data_decoded.sender.toString(),
        perpID: self.data_decoded.position.perpID.toString(),
        isPosPositive: self.data_decoded.position.isPosPositive,
        qPos: Number(self.data_decoded.position.qPos) / SCALE_FACTOR,
        margin: Number(self.data_decoded.position.margin) / SCALE_FACTOR,
        oiOpen: Number(self.data_decoded.position.oiOpen) / SCALE_FACTOR,
        mro: Number(self.data_decoded.position.mro) / SCALE_FACTOR,
        action: self.data_decoded.action,
    });
  })
  processor.onEventPositionClosedEventV2(async (self, ctx) => {
    await ctx.eventLogger.emit('PositionClosedV2', {
        tx_index: self.data_decoded.tx_index.toString(),
        perpID: self.data_decoded.perpID.toString(),
        account: self.data_decoded.account,
        amount: Number(self.data_decoded.amount) / SCALE_FACTOR,
    });
  })
  processor.onEventUserPosition(async (self, ctx) => {
    await ctx.eventLogger.emit('UserPosition', {
        user: self.data_decoded.user,
        perpID: self.data_decoded.perpID.toString(),
        isPosPositive: self.data_decoded.isPosPositive,
        qPos: Number(self.data_decoded.qPos) / SCALE_FACTOR,
        margin: Number(self.data_decoded.margin) / SCALE_FACTOR,
        oiOpen: Number(self.data_decoded.oiOpen) / SCALE_FACTOR,
        mro: Number(self.data_decoded.mro) / SCALE_FACTOR
    });
  })
}


export function marginBankEvents() {
  const processor = margin_bank.bind({
    network: SuiNetwork.MAIN_NET
  });
  processor.onEventBankBalanceUpdateV2(async (self, ctx) => {
    await ctx.eventLogger.emit('BankBalanceUpdateV2', {
        tx_index: self.data_decoded.tx_index.toString(),
        action: self.data_decoded.action,
        srcAddress: self.data_decoded.srcAddress,
        destAddress: self.data_decoded.destAddress,
        amount: Number(self.data_decoded.amount) / SCALE_FACTOR,
        srcBalance: Number(self.data_decoded.srcBalance) / SCALE_FACTOR,
        destBalance: Number(self.data_decoded.destBalance) / SCALE_FACTOR,
    });
  });
}
