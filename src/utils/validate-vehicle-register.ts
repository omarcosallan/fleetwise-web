export function validateVehicleRegistration(renavam: string) {
  if (!renavam.match(/^\d{11}$/)) {
    return false
  }

  const renavamWithoutDigits = renavam.substring(0, 10)
  const renavamInvertedWithoutDigits = renavamWithoutDigits
    .split('')
    .reverse()
    .join('')

  let sum = 0

  for (let i = 0; i < 8; i++) {
    const algarismo = Number(renavamInvertedWithoutDigits[i])
    const multiplicador = i + 2
    sum += algarismo * multiplicador
  }

  sum += Number(renavamInvertedWithoutDigits.charAt(8)) * 2
  sum += Number(renavamInvertedWithoutDigits.charAt(9)) * 3

  const mod11 = sum % 11

  let lastDigitCalculated = 11 - mod11

  lastDigitCalculated = lastDigitCalculated >= 10 ? 0 : lastDigitCalculated

  const digitRealInformed = Number(
    renavam.substring(renavam.length - 1, renavam.length),
  )

  if (lastDigitCalculated === digitRealInformed) {
    return true
  }
  return false
}
