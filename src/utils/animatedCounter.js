export function animateCounter(targetValue, onUpdate) {
  const initialValue = 0;
  const steps = 50; // Jumlah langkah perubahan nilai counter
  const intervalTime = 20; // Interval waktu antara setiap langkah perubahan nilai counter (ms)
  
  let currentValue = initialValue;
  const increment = (targetValue - initialValue) / steps;

  const interval = setInterval(() => {
    currentValue += increment;
    onUpdate(Math.round(currentValue)); // Menggunakan Math.round untuk membulatkan ke bilangan bulat terdekat
    if (currentValue >= targetValue) {
      clearInterval(interval);
      onUpdate(targetValue); // Pastikan nilai terakhir sesuai dengan nilai target
    }
  }, intervalTime);
}