export type Employee = {
    id: string
    name: string
    point_balance: number
  }
  
  export type Event = {
    id: string
    employeeId: string
    type: string
    timestamp: string
    metadata: Record<string, unknown>
  }

  export type Operator =
  | "=="
  | "!="
  | ">"
  | "<"
  | ">="
  | "<="

  export type Condition = {
    field: string
    operator: Operator
    value: unknown
  }
  
  export type Rule = {
    name: string
    condition: Condition
    points: number
    active: boolean
    eventType: string
  }
  
  export type RewardGrant = {
    eventId: string
    ruleName: string
    employeeId: string
    points: number
  }
  