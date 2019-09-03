export function permissionIsTrue (permissionCode) {
  return this.$store.getters.permissions.indexOf(permissionCode) < 0
}
