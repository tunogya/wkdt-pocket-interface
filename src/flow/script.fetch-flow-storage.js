import {send, decode, script, args, arg, cdc} from "@onflow/fcl"
import {Address} from "@onflow/types"

const CODE = cdc`
pub fun main(address: Address): {String: UInt64} {
    let account = getAccount(address)
    return {"storageUsed": account.storageUsed, "storageCapacity": account.storageCapacity }
}
`

export function fetchFlowStorage(address) {
  if (address == null) return Promise.resolve(false)

  // prettier-ignore
  return send([
    script(CODE),
    args([
      arg(address, Address)
    ])
  ]).then(decode)
}
