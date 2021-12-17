import { format } from 'date-fns'

export const echoLocalDateTime = (date: Date) => {
  return format(new Date(date), 'yyyy/MM/dd H:mm:ss')
}
