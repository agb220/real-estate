export function updateStateIfChanged(
  param: string[] | undefined,
  state: string[],
  setState: (val: string[]) => void,
) {
  if (param?.length && param.toString() !== state.toString()) {
    setState([...param])
  }
}
