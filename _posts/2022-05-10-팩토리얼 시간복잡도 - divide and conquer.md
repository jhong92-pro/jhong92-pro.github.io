---
title: "팩토리얼 시간복잡도 - divide and conquer"
categories:
  - 알고리즘
tags:
  - 알고리즘
use_math: true
---


## Factorial - divide and conquer

**본 글은 python을 따르고 있습니다, 다른 언어라면 시간복잡도가 달라질 수 있습니다**

```python
def partial_factorial(i, j):
  if i==j:
    return i
  elif i+1==j:
    return i*j
  else:
    mid = (i+j)//2
    modulo = (i+j)%2
    return partial_factorial(i, mid+modulo) * partial_factorial(mid+modulo+1, j)

# factorial(n)
print(partial_factorial(1,n))

def partial_factorial2(i, j):
  # (i+1)*(i+2)*...*j
  # assert i<=j
  if i==j:
    return 1
  elif i+1==j:
    return j
  else:
    mid = (i+j)//2
    modulo = (i+j)%2
    return partial_factorial(i, mid+modulo) * partial_factorial(mid+modulo, j)

# factorial(n)
print(partial_factorial(0,n))
```  
$$\prod (i, j) = \prod (i, mid) * \prod (mid+1, j)$$  
절반씩 나눠서 곱셈을 하기 때문에  
언뜻 보기에는 recursion과 차이가 없는 것 같지만,  
자릿수를 고려하면 그렇지 않습니다.  
  
## Recursion vs Divide and Conquer
  
`8!`을 각각 recursion 과 divide and conquer 로 구해보도록 하겠습니다  
```
# recursion
8!
= (1*2)*3*4*5*6*7*8
= (2*3)*4*5*6*7*8
= (6*4)*5*6*7*8
= (24*5)*6*7*8
= (120*6)*7*8
= (720*7)*8
= 5040*8
= 40320

# divide and conquer
8!
= (1*2)*3*4*5*6*7*8
= 2*(3*4)*5*6*7*8
= (2*12)*5*6*7*8
= 24*(5*6)*7*8
= 24*30*(7*8)
= 24*(30*56)
= 24*1680
= 40320
```  
  
위와 같이 두 방식에는 차이가 있습니다.  
정답을 구하기 직전의 수의 크기를 보면  
recursion은 5040, 8  
divide and conquer는 24, 1680  
입니다.  
수가 커질수록 두 방식에서 자릿수의 차이가 크게 나타납니다.  

## 시간복잡도  
이전글과 동일하게 자릿수부터 알아보도록 하겠습니다.  
`partial_factorial(i, j)`의 자릿수는  
  
$$
\begin{align}
log(\prod (i, j)) &= log(i*(i+1)*(i+2)*...*j) \\
&\leq log(j*j*j*...*j) = (j-i+1)*logj
\end{align}
$$  

편의를 위해 $$\prod (i, j)$$ = `partial_factorial2` 라고 하면, `(i부터 j-1까지의 곱)`
$$\prod (i, j) = (j-i)*logj$$ 입니다.  
  
$$\prod (i, j)$$ 의 제일 마지막 단계 때 곱셈 연산은,  
$$\prod (i, j) = \prod (i, (i+j)/2) *  \prod ((i+j)/2, j) $$  
$$\prod ((i+j)/2, j) $$의 자릿수는  
`(j-i)/2*logj`  
  
따라서, $$\prod (i, (i+j)/2) *  \prod ((i+j)/2, j) $$ 수행 시 시간복잡도는  
`M((j-i)*logj)`로 표현할 수 있습니다.  
`M(n)의 정의는 피연산자의 자릿수가 n인 곱셈을 수행할 때 시간복잡도`  
  
<span style='background-color: #fff5b1; color:#808080'> recursion에서는 곱셈의 결과값의 자릿수로 시간복잡도를 계산했고,  
divide and conquer에서는 피연산자의 자릿수로 시간복잡도를 계산하고 있어 충돌이 있습니다.</span>  
  
  
$$\prod (i, j)$$ 를 수행하는데 총 시간복잡도를 `T(i,j)` 라고 정의하겠습니다.  
  
$$ 
\begin{align}
&T(i,j) \\
 &= M((j-i)logj) + T(i,(i+j)/2)+ T((i+j)/2,j) \\
&\leq M((j-i)logj) + 2*T((i+j)/2,j) \\
&\leq M((j-i)logj) + 2*(M((j-i)/2*logj) + 2*T((i+3j)/4,j)) \\
&\leq M((j-i)logj) + 2M((j-i)/2*logj) + 4M((j-i)/4*logj) + 8T((i+7j)/8,j) \\
&\leq M((j-i)logj) + 2M((j-i)/2*logj) + 4M((j-i)/4*logj) + 8M((j-i)/8*logj) + ...+ \\
\end{align}
$$ 
  
덧셈은 depth만큼 반복됩니다  
  
또한,  
$$M(j) \geq 1/2*M(j/2)$$
  
따라서, 
  
$$O(T(i,j)) = O(log(j-i) * M((j-i)logj))$$  
  
`i=0, j=n+1` 을 넣어주면,    
$$O(factorial(n)) = O(logn * M(nlogn))$$  
  
`divide and conquer` 방법을 쓴다면,  
`recursion` 과는 다르게 카라추바 곱셈이 고려됩니다.  
  
```python
cutoff = 1<<71*30
n = 2
factorial_n_smaller = 1
# factorial_n_bigger = 2 (factorial(2) = 1*2)

while factorial_n_smaller < cutoff:
    n+=2
    factorial_n_smaller*=n//2
    # n이 2가 커질때마다 factorial_n_smaller는 1씩 증가합니다
    # ex)
    # factorial(8)  = (1*2*3*4)   * (5*6*7*8)
    # factorial(10) = (1*2*3*4*5) * (6*7*8*9*10)

print(n) ==> 622
```  
n이 622부터 카라추바 곱셈이 처음 수행됩니다.  
  
카라추바 곱셈의 시간복잡도는  
$$M(nlogn) = n^{log_23}*logn^{log_23}$$  
  
따라서 n이 충분히 크다면,  팩토리얼 시간복잡도는,  
$$O(n^{log_23}*logn^{log_23+1})$$  
  
  
  
## 다음
1. 파이썬에서 실제로 factorial이 어떻게 구현되어있는 지 알아보겠습니다.
<br>
<br>
<br>
  
*출처*  
[https://www.cantorsparadise.com/factorials-and-how-to-compute-them-cb77ae8b497d](https://www.cantorsparadise.com/factorials-and-how-to-compute-them-cb77ae8b497d)
[http://numbers.computation.free.fr/Constants/Algorithms/splitting.html](http://numbers.computation.free.fr/Constants/Algorithms/splitting.html)