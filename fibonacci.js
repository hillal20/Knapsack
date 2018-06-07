function fibonacci(n) {
  if (n === 0 || n === 1) {
    return n
  }
  return fibonacci(n - 2) + fibonacci(n - 1);
}
console.log(fibonacci(10));
//////////////////////////////////////////////////////////////////////////////////////////////////

function nthFib(n) {
  const cache = Array(n); //// creating empty array with length n to allocate memory upfront  

  function nthFibMemo(n) {     /////////////// fn() ===> 1 
    let value = cache[n];

    if (!value) {
      value = naiveNthFib(n);
      cache[n] = value;
    }
    return value;
  }

  function naiveNthFib(n) {  /////// fn() ====> 2
    if (n === 0 || n === 1) {
      return n;
    }
    return nthFibMemo(n - 1) + nthFibMemo(n - 2);
  }

  return nthFibMemo(n);
}
console.log(nthFib(100));
///////////////////////////////////////////////////////////////////////////////////////////////
function nthFibIterative(n) {
  const cache = Array(n);
  cache[0] = 0;
  cache[1] = 1;

  for (let i = 2; i <= n; i++) {
    cache[i] = cache[i - 1] + cache[i - 2];
  }

  return cache[n];
}
console.log(nthFibIterative(100));



