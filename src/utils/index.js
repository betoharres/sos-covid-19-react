export function getListItemIcon(state) {
  switch (state) {
    case 'waiting':
      return 'access_time'
    case 'testing':
      return 'assignment_turned_in'
    case 'infected':
      return 'local_hospital'
    case 'discarded':
      return 'remove_circle'
    default:
      return 'black'
  }
}
