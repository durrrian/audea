import { BeginnerClass } from './beginner-class'
import { SupercuanCourse } from './supercuan-course'

interface PillProps {
  markAs: string | null
}

export function Pill({ markAs }: PillProps) {
  if (markAs === 'Beginner class') return <BeginnerClass />

  if (markAs === 'Supercuan course') return <SupercuanCourse />

  return <p />
}
