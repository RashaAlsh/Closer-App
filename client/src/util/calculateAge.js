function calculateAge(birthdate) {
  if (!birthdate) {
    return Math.floor(Math.random() * 80 + 18);
  }
  const birthDate = new Date(birthdate);

  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  // If the birth date has not occurred yet this year, subtract 1 from age.
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age;
}
export default calculateAge;
