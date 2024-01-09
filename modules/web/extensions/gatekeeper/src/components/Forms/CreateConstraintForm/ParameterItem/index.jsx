import React from 'react'

import {ItemWrapper} from './styles'
import { CodeEditor } from '@kubed/code-editor';
import { yaml } from '@ks-console/shared';
import { isEmpty } from 'lodash';

const ParameterItem =(props)=>{
  const {onChange, value, yamlData} = props

  const handleChange = (value)=>{
    onChange?.(yaml.load(value))
  }

  return (
    <ItemWrapper>
      <CodeEditor
        className="Textarea"
        value={isEmpty(yamlData)?undefined:yaml.getValue(yamlData)}
        hasUpload={false}
        hasDownload={false}
        onChange={handleChange}
      />
    </ItemWrapper>   
  )
}

export default ParameterItem