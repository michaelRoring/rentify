export function generateAvatarURL() {
  const min = 1;
  const max = 41;
  const number = Math.floor(Math.random() * (max - min + 1)) + min;

  return `https://bamaha.my.id/avatar-image/avatar-${number}.svg`
}