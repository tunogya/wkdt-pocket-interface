import {atomFamily, selectorFamily, useRecoilState} from "recoil";
import {IDLE, PROCESSING} from "../global/constants";
import {fetchFlowStorage} from "../flow/script.fetch-flow-storage";

export const valueAtom = atomFamily({
  key: "flow-storage::state",
  default: selectorFamily({
    key: "flow-storage::default",
    get: address => async () => fetchFlowStorage(address),
  }),
})

export const statusAtom = atomFamily({
  key: "flow-storage::status",
  default: IDLE,
})

export function useFlowStorageHook(address) {
  const [storage, setStorage] = useRecoilState(valueAtom(address))
  const [status, setStatus] = useRecoilState(statusAtom(address))

  return {
    storage,
    status,
    async refresh() {
      setStatus(PROCESSING)
      await fetchFlowStorage(address).then(setStorage)
      setStatus(IDLE)
    },
  }
}
