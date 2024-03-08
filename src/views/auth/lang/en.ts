import { langType } from './../types'

const lang: langType = {
  title: 'Create Role',
  name: 'Role Name',
  role: {
    name: 'Role Name',
    placeholderName: 'Please enter role name',
    validateMsg: 'Role name cannot be empty！',
    describe: 'description',
    placeholderDescribe: 'Please enter a description'
  },
  menu: {
    type: 'Menu Type',
    parentId: 'Parent Menu',
    title: 'Menu Title',
    name: 'Menu Name',
    component: 'Component Path',
    path: 'Menu Path',
    icon: 'Menu Icon',
    visible: 'Visibility',
    sort: 'Sort',
    validate: {
      placeholderType: 'Please select the menu type',
      placeholderParent: 'Please select the parent menu',
      placeholderTitle: 'Please enter the menu title',
      placeholderName: 'Please enter the menu name',
      placeholderComponent: 'Please enter the component name',
      placeholderPath: 'Please enter the menu path',
      placeholderIcon: 'Please enter the menu icon',
      placeholderSort: 'Please enter sorting'
    }
  }
}

export default lang
