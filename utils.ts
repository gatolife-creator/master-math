function combination(n: number, k: number): number {
  if (n < k) return 0;
  if (n === k) return 1;
  return factorial(n) / (factorial(k) * factorial(n - k));
}

function factorial(n: number): number {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}
