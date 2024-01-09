import React, { useEffect, useState } from 'react'

import { Input } from '@kubed/components'
import { ItemWrapper } from './styles'
import { isEmpty } from 'lodash'

const KindItem = props => {
  const { onChange, value } = props
  const [apiGroups, setApiGroups] = useState([])
  const [kinds, setKinds] = useState([])//Pod

  useEffect(() => {
    if(!isEmpty(kinds)||!isEmpty(apiGroups)){
      handleChange()
    }
  }, [kinds, apiGroups])

  const handleApiGroupsChange = e => {
    const _value = e.target.value
    setApiGroups(_value?_value.split(','):[])
  }

  const handleKindsChange = e => {
    const _value = e.target.value
    setKinds(_value?_value.split(','):[])
  }

  const handleChange = () => {
    onChange({
      kinds,
      apiGroups,
    })
  }

  return (
    <ItemWrapper>
      <Input
        name="apiGroups"
        value={apiGroups}
        placeholder={'apiGroups'}
        onChange={handleApiGroupsChange}
      />
      <Input
        name="kinds"
        placeholder={'kinds'}
        value={kinds}
        onChange={handleKindsChange}
      />
    </ItemWrapper>
  )
}

export default KindItem
