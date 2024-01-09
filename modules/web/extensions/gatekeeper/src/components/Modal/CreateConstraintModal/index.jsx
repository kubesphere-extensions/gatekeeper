import React, { useEffect, useState } from 'react'
import { Modal, Switch } from '@kubed/components'
import { Group } from '@kubed/icons'
import { yaml } from '@ks-console/shared'
import { CodeEditor } from '@kubed/code-editor'
import CreateConstraintForm from '../../Forms/CreateConstraintForm'
import { SwitchStyle } from './styles'

const CreateConstraintModal = ({
  form,
  onCancel,
  visible,
  initialValues,
  onOk,
  store,
}) => {
  const [isCodeMode, setIsCodeMode] = useState(false)
  const [formData, setFormData] = useState(initialValues)
  const [yamlData, setYamlData] = useState('')

  useEffect(() => {
    if (store) {
      setYamlData(store.yamlRawData)
    }
  }, [])

  const handleSubmit = () => {
    form
      .validateFields()
      .then(() => {
        onOk?.(isCodeMode ? yaml.load(yamlData) : formData)
      })
      .catch(() => {})
  }

  const renderSwitch = () => {
    return (
      <SwitchStyle>
        <Switch
          onChange={value => setIsCodeMode(value)}
          label={t('EDIT_YAML')}
          variant="button"
        />
      </SwitchStyle>
    )
  }

  const handleChange = value => {
    setFormData(value)
  }

  const handleYamlChange = value => {
    setYamlData(value)
  }

  return (
    <Modal
      title={t('CREATE_CONSTRAINT')}
      width={960}
      titleIcon={<Group size={40} />}
      visible={visible}
      onCancel={onCancel}
      headerExtra={renderSwitch()}
      onOk={handleSubmit}
      bodyStyle={{ padding: '20px' }}
    >
      {isCodeMode ? (
        <CodeEditor mode="yaml" value={yamlData} onChange={handleYamlChange} />
      ) : (
        <CreateConstraintForm
          form={form}
          initialValues={initialValues}
          onChange={handleChange}
          store={store}
        />
      )}
    </Modal>
  )
}

export default CreateConstraintModal
