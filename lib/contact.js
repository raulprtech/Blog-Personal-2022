const contactAddressCodes = [
  99, 111, 110, 116, 97, 99, 116, 111, 64, 114, 97, 117, 108, 112, 97, 99, 104, 101, 99, 111, 46,
  100, 101, 118,
]

function getContactAddress() {
  return String.fromCharCode(...contactAddressCodes)
}

export function openContactEmail() {
  if (typeof window === 'undefined') return
  window.location.assign(`mailto:${getContactAddress()}`)
}
