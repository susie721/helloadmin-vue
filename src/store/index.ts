import app from './modules/global'
import { createStore } from 'vuex'
import permission from './modules/permission'
import user from './modules/user'
import { genStore } from '@/utils/batchImportFiles'

const allStores = genStore()
const store = createStore({
  modules: {
    app,
    permission,
    user,
    ...allStores
  },
});

export default store
