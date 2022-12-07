# Calculator
Built a calculator using vanilla Javascript. Has usability features beyond [project requirements](https://www.theodinproject.com/lessons/foundations-calculator)

Live code: https://plywoodpallet.github.io/calculator/

## Post-Project Notes
- This was my first medium-sized project for the Odin Project
- I wrote this project before learning about design patterns. Implementing the advanced logic heavily complicated my code
- Writing the advanced logic made me appreciate how simple-looking apps like a calculator can have a lot going on underneath
- I was motivated to write some advance logic to make it more usable
 - Decimal math is not precise in js by default, learning how to implement this was beyond the scope of the project
 - Creating a negative/positive button helped with negative number calculations

## Usability Features / Advanced logic
- Perform two linked operations concurrently 
    - using equals: 2 * 2 = - 1 returns 3
    - without using equals: 4 / 2 + 1 returns 3 
    - multiple concurrent operations: 1 + 2 + 3 + 4 + 5 + 6 + 7 + 9 + 10 returns 55
- Perform two operations separately
    - 4 / 2 returns 2, then entering 1 + 2 returns 3
- Repeat operations
    - Each time = is entered, the operation is repeated: 10 - 1 = = = = = = returns 4
- Decimal Math
    - Enter without trailing zero: 2.2 + 1.1
    - Enter numbers <1 with a leading zero: 0.01 - 0.05
    - Enter numbers <1 without leading zero: .2 displays 0.2 after operation is chosen
    - Calculating without leading zero: .2 + .1 works
- Negative Number Math
    - Result is negative: 1 - 100 = -99
    - First operand is negative: -99 + 99 = 0
    - Second operand is negative: 5 * -99