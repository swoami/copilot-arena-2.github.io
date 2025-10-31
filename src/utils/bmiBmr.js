// utils/bmiBmr.js
// Placeholder for BMI and BMR calculation logic
export function calculateBMI(weight, height) {
  if (!weight || !height) return null;
  return weight / ((height / 100) ** 2);
}

export function calculateBMR(weight, height, age, gender) {
  if (!weight || !height || !age || !gender) return null;
  if (gender === 'male') {
    return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }
}
