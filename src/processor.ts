import { orderEvents, perpetualEvents, positionEvents, marginBankEvents } from "./events.js";
import { initPerpetualV2Processor } from "./objects.js";

orderEvents();
perpetualEvents();
positionEvents();
marginBankEvents();
initPerpetualV2Processor();