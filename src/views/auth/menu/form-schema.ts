import { FormSchema } from "@/../types/schema";
// import * as api from './service'
import i18n from '@/locales/useI18n'
const { t } = i18n.global;
export const getFormSchema = (eventObject: object): FormSchema => ({
    // style: {
    //     width: "auto"
    // },
    formItem: [
        {
            type: 'select',
            label: t('auth.menu.type'),
            field: 'type',
            value: '',
            eventObject: eventObject,
            options: [
                {
                    value: 'D',
                    label: '目录'
                },
                {
                    value: 'M',
                    label: '菜单'
                },
                {
                    value: 'B',
                    label: '按钮'
                },
            ],
            props: {
                placeholder: t('auth.menu.validate.placeholderType'),
            },
            rules: [
                {
                    required: true,
                    message: t('auth.menu.validate.placeholderType')
                }
            ]
        },
        {
            type: 'select',
            label: t('auth.menu.parentId'),
            field: 'parentId',
            value: '',
            options: [],
            props: {
                placeholder: t('auth.menu.validate.placeholderParent'),
            },
            rules: [
                {
                    required: true,
                    message: t('auth.menu.validate.placeholderParent')
                }
            ]
        },
        {
            type: 'input',
            label: t('auth.menu.title'),
            field: 'title',
            value: '',
            props: {
                placeholder: t('auth.menu.validate.placeholderTitle'),
            },
            rules: [
                {
                    required: true,
                    message: t('auth.menu.validate.placeholderTitle')
                }
            ]
        },
        {
            type: 'input',
            label: t('auth.menu.name'),
            field: 'name',
            value: '',
            props: {
                placeholder: t('auth.menu.validate.placeholderName'),
            }
        },
        {
            type: 'input',
            label: t('auth.menu.component'),
            field: 'component',
            value: '',
            props: {
                placeholder: t('auth.menu.validate.placeholderComponent'),
            }
        },
        {
            type: 'input',
            label: t('auth.menu.path'),
            field: 'path',
            value: '',
            props: {
                placeholder: t('auth.menu.validate.placeholderPath'),
            },
            rules: [
                {
                    required: true,
                    message: t('auth.menu.validate.placeholderPath')
                }
            ]
        },
        {
            type: 'input',
            label: t('auth.menu.icon'),
            field: 'icon',
            value: '',
            props: {
                placeholder: t('auth.menu.validate.placeholderIcon'),
            }
        },
        {
            type: 'switch',
            label: t('auth.menu.visible'),
            field: 'visible',
            value: '',
            props: {
                unCheckedValue: 'N',
                checkedValue: 'Y'
            }
        },
        {
            type: 'input-number',
            label: t('auth.menu.sort'),
            field: 'sort',
            value: '',
            props: {
                placeholder: t('auth.menu.validate.placeholderSort'),
            }
        },
    ]
})
