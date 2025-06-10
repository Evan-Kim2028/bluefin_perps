import { SuiObjectTypeProcessor, SuiNetwork, SuiObjectChangeContext } from "@sentio/sdk/sui";
import { TypeDescriptor } from "@typemove/move";

const SCALE = 1e9;
// Using the corrected type string you identified
const PERPETUAL_V2_TYPE = "0xcb4e1ee2a3d6323c70e7b06a8638de6736982cbdc08317d33e6f098747e2b438::perpetual::PerpetualV2";

export function initPerpetualV2Processor() {
  SuiObjectTypeProcessor.bind({
    objectType: new TypeDescriptor<any>(PERPETUAL_V2_TYPE), // Manually override with the correct type
    network:  SuiNetwork.MAIN_NET,
    startCheckpoint: 15000000n
  })
  .onObjectChange(async (changes, ctx: SuiObjectChangeContext) => {
    for (const ch of changes) {
      // We only care about freshly-created PerpetualV2 objects.
      if (ch.type !== "created") {
        continue;
      }

      // Now ch is guaranteed to be a SuiObjectChangeCreated object.
      const fields = (ch as any).fields;

      if (!fields) {
        console.warn(`Skipping created object ${ch.objectId} due to missing fields.`);
        continue;
      }

      // Emit the initial state of the object.
      await ctx.eventLogger.emit("perpetual_v2_created", {
        object_id:          ch.objectId,
        version:            ch.version,
        name:               fields.name,
        imr:                Number(fields.imr) / SCALE,
        mmr:                Number(fields.mmr) / SCALE,
        maker_fee:          Number(fields.makerFee) / SCALE,
        taker_fee:          Number(fields.takerFee) / SCALE,
        insurance_ratio:    Number(fields.insurancePoolRatio) / SCALE,
        delisted:           fields.delisted,
        delisting_price:    Number(fields.delistingPrice) / SCALE,
        trading_permitted:  fields.isTradingPermitted,
        start_time:         Number(fields.startTime),
        price_identifier:   fields.priceIdentifierId
      });
    }
  });
}