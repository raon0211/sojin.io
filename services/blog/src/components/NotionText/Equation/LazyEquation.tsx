import dynamic from 'next/dynamic'

const LazyEquation = dynamic(() => import('./EagerEquation'))

export { LazyEquation }
