export const getGradient = (color: string) => {
  switch (color) {
    case 'cyan':
      return 'from-cyan-500 to-blue-500'
    case 'magenta':
      return 'from-fuchsia-500 to-pink-500'
    case 'blue':
      return 'from-blue-500 to-indigo-500'
    case 'lime':
      return 'from-lime-500 to-green-500'
    case 'amber':
      return 'from-amber-500 to-orange-500'
    default:
      return 'from-cyan-500 to-blue-500'
  }
}