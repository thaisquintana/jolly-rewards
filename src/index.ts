import { Event } from "./types"
import { processEvent } from "./engine/rewardProcessor"
import { rules } from "./store"

const data: Event[] = require("../data.json")

data.forEach(event => {
  processEvent(event, rules)
})
