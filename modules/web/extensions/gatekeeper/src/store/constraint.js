import { BaseStore, request } from '@ks-console/shared'
import { find, get, isEmpty } from 'lodash'

const module = 'constraints'

const mapper = item => {
  return {
    name: item.metadata.name || item.items[0].metadata.name,
    uid: item.metadata.uid,
    ...item,
  } 
}

const yamlRawData = `
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sPSPHostFilesystem
metadata:
  name: psp-host-filesystem
spec:
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Pod"]
#    namespaces:
#      - name: kubesphere-system
#    namespaceSelector:
#      matchExpressions:
#        - key: kubesphere.io/workspace
#          operator: Exists
#      matchLabels:
#        kubesphere.io/workspace: system-workspace
  parameters: {}
`

const getResourceUrl = params => {
  return `apis/constraints.gatekeeper.sh/v1beta1/${params.kind}`
}

const fetchConstraintKind = async () => {
  const url = `apis/templates.gatekeeper.sh/v1/constrainttemplates`
  const result = await request.get(url)
  const items = get(result, 'items', [])
  return {
    data: items,
    total: items.length,
  }
}

const checkNameFn = async ({ name, kind }) => {
  if (kind) {
    const url = `kapis/constraints.gatekeeper.sh/v1beta1/constraints`
    const result = await request.get(url)
    const items = get(result, 'items', [])
    return isEmpty(find(items, { 'metadata.name': name, kind }))
  }
  return false
}

const create = async data => {
  return request.post(`apis/constraints.gatekeeper.sh/v1beta1/${module}`, data)
}

const { ...baseStore } = BaseStore({
  module,
  mapper,
  getListUrlFn: getResourceUrl,
  getResourceUrlFn: getResourceUrl,
})

const constraintStore = {
  ...baseStore,
  module,
  mapper,
  fetchConstraintKind,
  yamlRawData,
  create,
  checkNameFn,
}

export default constraintStore

