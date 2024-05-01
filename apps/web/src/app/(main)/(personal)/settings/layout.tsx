import { Topbar } from './topbar'

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Topbar />

      {children}
    </>
  )
}
