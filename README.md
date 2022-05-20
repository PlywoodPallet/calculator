# calculator

Create a calculator using vanilla Javascript. Has some advanced logic as described in test cases. 
Live code: https://plywoodpallet.github.io/calculator/

Test cases
Basic Math
1 + 1 = (simple operation) PASS
2 * 2 = - 1 (perform two operations concurrently with entering "=") PASS
4 / 2 + 1 (need to perform two operations concurrently without entering "=") PASS
1 + 2 + 3 + 4 + 5 + 6 + 7 + 9 + 10 = 55 (multiple concurrent operations) PASS
4 / 2 =, 1 + 1 = (perform two operations separately) PASS
10 - 1 = = = = = = (repeated pressing of = performs to operation over and over) PASS

Decimal Math
need decimal math to be accurate - FAIL (beyond scope of this project)
2.2 + 1.1 (entering decimals without a zero after decimal point) PASS
0.01 - 0.05 (entering decimals with a zero after decimal point) PASS 
entering .2 displays 0.2 PASS
entering .2 + .1 produces a correct result PASS

Negative number math - beyond scope of this project
1 - 100 = -99 (result is a negative number) PASS 
-99 + 99 = 0 (first operand is a negative number) PASS
5 * -99 = (second operand is a negative number. entering - after entering operator makes a negative number, not change the operator to -) PASS - only if +/- button is pressed after entering second operand
