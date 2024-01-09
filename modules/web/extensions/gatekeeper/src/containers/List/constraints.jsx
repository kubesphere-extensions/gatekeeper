import React, { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Banner, Field, useForm } from '@kubed/components'
import { Group, Pen, Trash } from '@kubed/icons'
import {
  DataTable,
  useCommonActions,
  getOriginData,
  useActionMenu,
} from '@ks-console/shared'
import { constraintStore } from '../../store'
import FORM_TEMPLATES from '../../utils/form.templates'
import CreateConstraintModal from '../../components/Modal/CreateConstraintModal' // TODO:

const ConstraintList = () => {
  const { cluster } = useParams()
  const params = useParams()
  const constraintRef = useRef()
  const [form] = useForm()
  const [createVisible, setCreateVisible] = useState(false)
  const module = constraintStore.module
  const formTemplate = FORM_TEMPLATES[module]()

  const { editYaml, del } = useCommonActions({
    store: constraintStore,
    params: { cluster },
    callback,
  })

  const renderItemActions = useActionMenu({
    authKey: 'constraints',
    params: { cluster },
    actions: [
      {
        key: 'editYaml',
        icon: <Pen />,
        text: t('EDIT_YAML'),
        action: 'edit',
        onClick: editYaml,
      },
      {
        key: 'delete',
        icon: <Trash />,
        text: t('DELETE'),
        action: 'delete',
        onClick: del,
      },
    ],
  })

  const columns = [
    {
      title: t('Name'),
      field: 'name',
      sortable: false,
      searchable: false,
      render: (value, row) => (
        <Field
          value={value}
          as={Link}
          to={`/clusters/${
            params.cluster
          }/gatekeeper.constraints/${row.kind.toLowerCase()}/${row.name}`}
        />
      ),
    },
    {
      title: t('Kind'),
      field: 'kind',
      sortable: false,
      searchable: false,
    },
    {
      id: 'more',
      title: '',
      width: 20,
      render: (value, record) => renderItemActions({ ...record }),
    },
  ]

  const formatFn = data => {
    return {
      name: data.metadata.name,
      _originData: getOriginData(data),
      ...data,
    }
  }

  function formatServerData(serverData) {
    return {
      ...serverData,
      items: serverData.items,
      totalItems: 10,
    }
  }

  const renderTableActions = useActionMenu({
    authKey: module,
    params,
    autoSingleButton: true,
    actions: [
      {
        key: 'create',
        text: t('CREATE'),
        action: 'create',
        props: {
          color: 'secondary',
          shadow: true,
        },
        onClick: () => {
          setCreateVisible(true)
        },
      },
    ],
  })

  const callback = () => {
    constraintRef?.current?.refetch()
  }

  const handleCreate = data => {
    constraintStore
      .post({ kind: data.kind.toLowerCase() }, data)
      .then(res => {
        if (res) {
          callback()
          setCreateVisible(false)
        }
      })
      .catch(() => {})
  }

  return (
    <>
      <Banner
        icon={<Group />}
        title={t('Constraints')}
        description={t('CONSTRAINT_DESC')}
        className="mb12"
      />
      <DataTable
        ref={constraintRef}
        columns={columns}
        tableName="constraint-list"
        rowKey="uid"
        format={data => {
          return formatFn(data)
        }}
        serverDataFormat={formatServerData}
        placeholder={t('SEARCH_BY_NAME')}
        url={`/kapis/constraints.gatekeeper.sh/v1beta1/constraints`}
        useStorageState={false}
        disableRowSelect={false}
        selectType={false}
        toolbarRight={renderTableActions({})}
      />
      {createVisible && (
        <CreateConstraintModal
          visible={createVisible}
          onOk={handleCreate}
          form={form}
          initialValues={formTemplate}
          onCancel={() => {
            setCreateVisible(false)
          }}
          store={constraintStore}
        />
      )}
    </>
  )
}

export default ConstraintList
