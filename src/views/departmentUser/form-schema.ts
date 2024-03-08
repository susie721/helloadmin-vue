import { FormSchema } from "@/../types/schema";
import { createVNode } from 'vue';
import FontPicker from './fontPicker.vue'
import * as api from './service'
import i18n from '@/locales/useI18n'
import * as Api from '@/views/auth/role/service'
const { t } = i18n.global;
export const getFormSchema = (): FormSchema => ({
  formItemLayout: {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  },
  formItem: [
    {
      type: 'input',
      label: t('departmentUser.form.departmentName'),
      field: 'name',
      value: '',
      props: {
        placeholder: t('departmentUser.form.placeholderInput'),
      },
      rules: [
        {
          required: true,
          message: t('departmentUser.form.validate.department')
        }
      ]
    },
    {
      type: 'treeSelect',
      label: t('departmentUser.form.superiorDepartment'),
      field: 'parentId',
      value: '',
      treeData: [],
      asyncOptions: async () => {
        const res: any = await api.DepartmentList()
        if (res.code === 0) {
          return [{ id: 0, name: '顶级' }, ...res.data.items]
        }
      },
      props: {
        fieldNames: {
          label: 'name',
          value: 'id'
        },
        style: { width: "100%" },
        dropdownStyle: { maxHeight: '400px', overflow: 'auto' },
        placeholder: t('departmentUser.form.placeholderSelect'),
      }
    },
    {
      type: 'input',
      label: t('departmentUser.form.departmentHead'),
      field: 'leader',
      value: '',
      props: {
        placeholder: t('departmentUser.form.placeholderInput'),
      }
    },
    {
      type: 'input-number',
      label: t('departmentUser.form.sort'),
      field: 'sort',
      value: '',
      props: {
        placeholder: t('departmentUser.form.placeholderInput'),
      }
    }
  ]
})
export const getUserFormSchema = (): FormSchema => ({
  formItemLayout: {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  },
  formItem: [
    {
      type: 'input',
      label: t('departmentUser.user.name'),
      field: 'nickname',
      value: '',
      props: {
        placeholder: t('departmentUser.form.placeholderInput'),
      },
      rules: [
        {
          required: true,
          message: t('departmentUser.user.validate.name')
        }
      ]
    },
    {
      type: 'input',
      label: t('departmentUser.user.email'),
      field: 'email',
      value: '',
      props: {
        placeholder: t('departmentUser.form.placeholderInput'),
      },
      rules: [
        {
          required: true,
          message: t('departmentUser.user.validate.email')
        }
      ]
    },
    {
      type: 'treeSelect',
      label: t('departmentUser.user.department'),
      field: 'deptId',
      value: undefined,
      treeData: [],
      asyncOptions: async () => {
        const res: any = await api.DepartmentList()
        if (res.code === 0) {
          return res.data.items
        }
      },
      props: {
        fieldNames: {
          label: 'name',
          value: 'id'
        },
        style: { width: "100%" },
        placeholder: t('departmentUser.form.placeholderSelect'),
      }
    },
    {
      type: 'select',
      label: t('departmentUser.user.role'),
      field: 'roleId',
      value: undefined,
      options: [],
      asyncOptions: async () => {
        const res: any = await Api.RoleList()
        if (res.code === 0) {
          const datas = res.data.items.map(item => {
            return { value: item.id, label: item.name }
          })
          return datas
        }
      },
      props: {
        placeholder: t('departmentUser.form.placeholderSelect'),
      },
      rules: [
        {
          required: true,
          message: t('departmentUser.user.validate.role')
        }
      ]
    },
    {
      type: 'input-password',
      label: t('departmentUser.user.password'),
      field: 'password',
      value: '',
      props: {
        placeholder: t('departmentUser.form.placeholderInput'),
      },
      hidden: false,
      rules: [
        {
          required: true,
          message: t('departmentUser.user.validate.password')
        }
      ]
    }
  ]
})
