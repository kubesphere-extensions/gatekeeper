import React, { useEffect, useState } from 'react';
import { Modal, Switch } from '@kubed/components';
import { Group } from '@kubed/icons';
import CreateConstraintTemplateForm from '../../Forms/CreateConstraintTemplateForm';
import { SwitchStyle } from './styles';
import { yaml } from '@ks-console/shared';
import { CodeEditor } from '@kubed/code-editor';

const CreateConstraintTemplateModal = ({
  form,
  onCancel,
  visible,
  initialValues,
  onOk,
  store,
  // onChange = () => {},
}) => {
  const [isCodeMode, setIsCodeMode] = useState(false);
  const [formData, setFormData] = useState(initialValues);
  const [yamlData,setYamlData] = useState({})

  useEffect(()=>{
    if(store){
      setYamlData(store.yamlRawData)
    }
  },[])

  const handleSubmit = () => {
    form.validateFields().then(() => {
      onOk?.(isCodeMode?yamlData:formData);
    }).catch(()=>{})
  };

  const renderSwitch = () => {
    return (
      <SwitchStyle>
        <Switch onChange={value => setIsCodeMode(value)} label={t('EDIT_YAML')} variant="button" />
      </SwitchStyle>
    );
  };

  const handleChange = value => {
    setFormData(value);
  };

  const handleYamlChange = value => {
    setYamlData(yaml.load(value));
  };

  return (
    <Modal
      title={t('CREATE_CONSTRAINT_TEMPLATE')}
      width={960}
      titleIcon={<Group size={40} />}
      visible={visible}
      onCancel={onCancel}
      headerExtra={renderSwitch()}
      onOk={handleSubmit}
      bodyStyle={{ padding: '20px' }}
    >
      {isCodeMode ? (
        <CodeEditor mode="yaml" value={yaml.getValue(yamlData)} onChange={handleYamlChange} />
      ) : (
        <CreateConstraintTemplateForm
          form={form}
          initialValues={initialValues}
          onChange={handleChange}
        />
      )}
    </Modal>
  );
};

export default CreateConstraintTemplateModal;
