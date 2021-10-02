export function runTimeDuration (value: number): string {
  if (!value) return ''
  if (value < 60) {
    return value + '\''
  } else {
    const mins = value % 60
    const hours = Math.floor(value / 60)
    let out = ''
    if (hours > 1) {
      out += hours + ' Hours'
    } else {
      out += hours + ' Hour'
    }

    if (mins > 0) {
      if (mins > 1) {
        out += ' And ' + mins + ' Minuets'
      } else {
        out += ' And ' + mins + ' Minuet'
      }
    }

    return out
  }
}
