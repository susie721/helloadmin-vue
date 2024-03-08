import { FormSchema } from "@/../types/schema";
import { createVNode } from 'vue';
import FontPicker from './fontPicker.vue'
// import * as api from '../service'
import i18n from '@/locales/useI18n'
const { t } = i18n.global;
export const getFormSchema = (): FormSchema => ({
    // style: {
    //     width: "auto"
    // },
    formItem: [
        {
            type: 'input',
            label: t('auth.role.name'),
            field: 'name',
            value: '',
            props: {
                placeholder: t('auth.role.placeholderName'),
            },
            rules: [
                {
                    required: true,
                    message: t('auth.role.validateMsg')
                }
            ]
        }
    ]
})
