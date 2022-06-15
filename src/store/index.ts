import { createPinia } from 'pinia'
import { useCounterStore } from '@/store/modules/useCounter'

const pinia = createPinia()

export { useCounterStore }
export default pinia
