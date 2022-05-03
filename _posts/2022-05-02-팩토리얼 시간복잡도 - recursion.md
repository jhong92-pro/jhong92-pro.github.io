---
title: "팩토리얼 시간복잡도 - recursion"
categories:
  - 알고리즘
tags:
  - 알고리즘
use_math: true
---


## 기본적인 팩토리얼 함수(recursion)
```python
def factorial(n):
  output = 1
  for i in range(1,n+1):
    output*=i
  return output
```  
위 함수의 시간복잡도는 `O(n)`이라고 생각들지만 그렇지 않습니다.  
a, b 두 수를 곱하는 데 `O(loga * logb)`의 시간이 걸리기 때문입니다.  
(완전 맞는 말은 아니지만 조금만 더 읽어주세요)  
  
## 자릿수
곱셈의 시간복잡도를 구하기 위해서는 팩토리얼의 자릿수를 알아야 합니다.  
기본적인 팩토리얼 함수의 시간복잡도를 계산하기 위해 아래 함수를 봅시다  
```python
def n_power(n):
  output = 1
  for i in range(n):
    output*=n
  return output
  # return n*n*...*n (n개)

def half_factorial(n):
  output = 1
  for i in range(n//2,n+1):
    output*=n
  return output
  # return (n/2)*(n/2+1)*(n/2+2)*...*n
```   
각 함수의 자릿수를 비교해봅시다  
참고로, n의 자릿수는 $$log_2n$$입니다  
2,4,8,16 을 생각해보시면 쉽게 와닿을 거에요.  
  
$$log_2(half\_factorial(n))  \leq  log_2(factorial(n)) \leq  log_2(n\_power(n))$$  
$$log_2(n\_power(n)) = log_2(n^n) = nlog_2(n)$$  
  
half_factorial의 가장 작은 수는
  
$$log_2(n/2) = log_2n - 1$$ 입니다  
  
따라서 half_factorial의 모든 element는 $$log_2n - 1$$ 보다 크다고 할 수 있습니다.  
  
또한 element의 개수는 `n/2`이므로  
  
$$log_2(n/2) + log_2((n/2) + 1) +... + log_2(n) \geq  (n/2) * (log_2(n) - 2) = (n/2) * log_2n - n$$  
  
만약 n이 $$2^6$$보다 크다면 다음과 같은 등식이 성립합니다.  
  
$$n \geq n/6 * log_2n$$  
  
따라서 최종적으로  
  
$$log_2(half\_factorial(n))  \leq  log_2(factorial(n)) \leq  log_2(n\_power(n))$$  
  
n팩토리얼의 자릿수는 다음과 같이 표기할 수 있습니다.  
  
$$ (n/3)*log_2(n) \leq  log_2(factorial(n)) \leq  nlog_2(n)$$  
  
따라서, 자릿수는 $$\Theta (nlogn)$$ 입니다.  

## 파이썬 곱셈  
팩토리얼 곱셈을 하는데 있어 곱셈의 시간복잡도 계산을 아는 것은 필수입니다.  
일반적으로 a, b 두 수를 곱하는 데 `O(loga * logb)`의 시간이 걸린다고 알려져 있습니다.  
a, b가 커지면 자릿수에 비례해서 시간복잡도가 증가합니다.  
  
참고로 가장 최적의 방법은 자릿수가 N인 정수에 대해 `O(NlogN)`의 시간의 걸린다고 합니다.  
저는 읽고 이해할 엄두가 안나네요. 관심있는 분들은 보면 좋을 것 같습니다.  
[https://hal.archives-ouvertes.fr/hal-02070778v2/document](https://hal.archives-ouvertes.fr/hal-02070778v2/document)  
  
파이썬에서는 적당히 큰 두 수를 곱할 때 카라추바 알고리즘이라는 방법을 씁니다.  
(이걸 자세히 다루지는 않겠습니다)  
시간복잡도는 $$O(n^{\log _{2}3})$$입니다.  

[https://github.com/python/cpython/blob/main/Objects/longobject.c](https://github.com/python/cpython/blob/main/Objects/longobject.c)   
깃허브 cpython에 은근히 정리가 잘 되어있습니다.  
같이 보시면 좋을 것 같아요.  
  
적당히 큰 수의 범위는 다음과 같습니다.  
```C
  #define KARATSUBA_CUTOFF 70
  #define KARATSUBA_SQUARE_CUTOFF (2 * KARATSUBA_CUTOFF)
  #
  #
  i = a == b ? KARATSUBA_SQUARE_CUTOFF : KARATSUBA_CUTOFF;
```  
적당히 큰 수는,  
곱하는 두 수가 같다면 `KARATSUBA_SQUARE_CUTOFF`, 그렇지 않다면 `KARATSUBA_CUTOFF` 자릿수보다 큰 수 입니다.  
  
또한, `2 * asize` <= `bsize` 이면(a는 작은 수, b는 큰 수),  
b를 쪼갠 후 다시 호출합니다.  
예를들어,  
`b = 100101010111`, `a=101` 이라고 하겠습니다. (위에 KARATSUBA_CUTOFF는 잠깐 무시합시다)  
그러면, `b`를 `a`의 사이즈에 맞게 쪼갭니다  
`b[] = 100 101 010 111`  
output = 0  
1. `output += b[0]*a` 후 비트 이동
2. `output += b[1]*a` 후 비트 이동
3. `output += b[2]*a` 후 비트 이동
4. `output += b[3]*a` 후 비트 이동
의 과정을 수행합니다.  
  
이렇게 하는 이유는 카라추바 곱셈의 시간복잡도인 $$O(n^{\log _{2}3})$$에서 n이 곱하는 두 수 중 큰 수이기 때문입니다.  
cpython에서 위 함수를 `k_lopsided_mul(a, b)`로 정의하고 있습니다.
  
개념적으로만 코드를 작성하자면(유사코드 정도로 봐주세요),  
```python
  def multiply(a, b):
    # assert a <= b
    if a < small: # 두 수가 적당히 작으면
      return a*b
      # O(loga * logb) 시간 복잡도의 곱셈
      # 이걸 깃허브 cpython에서는 gradeschool multiplication이라고 표현하네요
    elif b.bit_length() >= 2 * a.bit_length():
      # 아래는 k_lopsided_mul 함수
      A = bin(a)[2:]
      B = bin(b)[2:]
      output = 1
      for i in range(len(B)//len(A)): # 안 나눠 떨어지면 한번 더 루프를 타야하긴 합니다
        bslice = int(B[i*len(A):(i+1)*len(A)], 2)
        output += multiply(a, bslice)
        output = output << len(A) # 제일 마지막 루프는 비트 shift 없습니다
      return output
    else:
      return Karatsuba_multiply(a,b)

  
```  

## 시간복잡도 계산
드디어 최종 시간복잡도를 계산해보겠습니다.  
`factorial(n)`에서 n이 충분히 크다고 가정을 해보겠습니다.  
  
팩토리얼의 `n/2`번째 곱셈까지는 $$\Theta ((n/2)*log(n/2))$$ 이기 떄문에 $$\Theta (nlogn)$$ 로 표기해도 무방합니다.  
또한, `n/2`번째 곱셈까지 나온 수를 `n/2`만큼 반복해서 팩토리얼이 수행됩니다.  
  
제가 하고 싶은 말은,  
`factorial(n) = factorial(n/2) * (n/2+1)*(n/2+2)*(n/2+3)*...*n`  
`factorial(n/2)`의 자릿수는 $$\Theta (nlogn)$$  
`n/2+1 ~ n`의 자릿수는 $$\Theta (logn)$$  
  
즉, $$\Theta (nlogn)$$ 자릿수의 수에 $$\Theta (logn)$$ 자릿수의 수를 `n/2`번 곱하는 것과 같습니다.  
  
70자릿수가 cutoff이기 때문에  
`2^71 - 1  = 2361183241434822606848`까지는 카라추바 알고리즘을 고려하지 않아도 됩니다.  
`factorial(2361183241434822606848-1)`까지는 gradeschool multiplication만 사용됩니다.  
  
따라서 $$O(nlogn * logn * n/2) = O(n^2log^2n)$$  

## 다음
1. factorial을 divide and conquer 방법으로 구현하면 더 빠른 팩토리얼을 구현할 수 있습니다(원래 여기까지 작성하려 했는데 양이 많네요)
   - 여기서 곱셈은 카라추바 알고리즘을 쓰는 것으로 판단됩니다
2. 파이썬은 factorial 함수가 binary split 이라는 방법으로 구현되어 있습니다. 이건 공부중인데 최대한 빠르게 정리해보겠습니다
  
혼자 공부하는 거라 틀린 부분이나 매끄럽지 못한 부분이 있을 것 같습니다.  
질문, 피드백 등 의견 있으면 달아주세요!!  
  
감사합니다  
  
  

*출처*  
[https://www.cantorsparadise.com/factorials-and-how-to-compute-them-cb77ae8b497d](https://www.cantorsparadise.com/factorials-and-how-to-compute-them-cb77ae8b497d)