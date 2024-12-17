function determineWinner(n, sequence) {
    // Подсчет четных и нечетных чисел
    let evenCount = 0; // Количество четных чисел
    let oddCount = 0;  // Количество нечетных чисел
  
    for (let num of sequence) {
      if (num % 2 === 0) {
        evenCount++;
      } else {
        oddCount++;
      }
    }

    // Основная логика:
    // Если в последовательности остались только четные числа, Алиса всегда выигрывает,
    // так как сумма её чисел всегда будет четной.
    if (oddCount === 0) {
      return "Алиса";
    }
  
    // Если количество нечётных чисел нечётное, Алиса выигрывает,
    // так как она ходит первой и может сделать свою сумму чётной.
    if (oddCount % 2 === 1) {
      return "Алиса";
    } else {
      // Иначе (если количество нечётных чисел чётное), Боб выигрывает,
      // потому что он сможет сделать сумму Алисы нечётной.
      return "Боб";
    }
  }
  
  // Пример использования:
  const n = 4; // Длина последовательности
  const sequence = [1, 3, 4, 6, 7 ]; // Последовательность чисел
  
  console.log(determineWinner(n, sequence)); // Вывод: "Алиса"
  