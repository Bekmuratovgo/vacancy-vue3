
const routes = [
  {
    path: '/',
    children: [
      { path: '', component: () => import('../pages/List.vue') }
    ]
  },
  {
    path: '/converter',
    children: [
      { path: '/converter', component: () => import('../pages/Converter.vue') }
    ]
  },
]

export default routes
