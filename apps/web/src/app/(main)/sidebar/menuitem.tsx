import { Lightbulb, LineChart, Settings, Shapes, ShieldAlert } from 'lucide-react'

export const menuitem = [
  {
    type: 'dashboard',
    name: 'Dashboard',
    items: [
      {
        id: 1,
        name: 'Portofolio',
        icon: <LineChart />,
        url: '/portofolio',
        regex: /\/portofolio(?<temp1>.*)/,
      },
      {
        id: 2,
        name: 'Analisis',
        icon: <Lightbulb />,
        url: '/analisis',
        regex: /\/analisis(?<temp1>.*)/,
      },
      {
        id: 3,
        name: 'Courses',
        icon: <Shapes />,
        url: '/courses',
        regex: /\/courses(?<temp1>.*)/,
      },
    ],
  },
  {
    type: 'settings',
    name: 'Personal',
    items: [
      {
        id: 4,
        name: 'Pengaturan',
        icon: <Settings />,
        url: '/settings',
        regex: /\/settings(?<temp1>.*)/,
      },
      {
        id: 5,
        name: 'Starting guide',
        icon: <ShieldAlert />,
        url: '/starting-guide',
        regex: /\/starting-guide(?<temp1>.*)/,
      },
    ],
  },
]
