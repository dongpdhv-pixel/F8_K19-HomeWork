// Bài 1
const numbers = [9, 8, 3, 5, 6, 2, 7, 9]

let max = numbers[0]
let second = -1

for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > max) {
        second = max
        max = numbers[i]
    }
    else if (
        numbers[i] > second &&
        numbers[i] < max
    ) {
        second = numbers[i]
    }
}

console.log(second)


// Bài 2
const classA = [15, 2, 8, 10];
const classB = [8, 11, 2, 5, 9];

const merged = [...classA, ...classB]
console.log(merged)
const obj = {}
const unique = []

for (let i = 0; i < merged.length; i++) {

    const value = merged[i]

    if (!obj[value]) {

        obj[value] = true
        unique.push(value)

    }

}
console.log(unique)

function quickSort(arr) {

    if (arr.length <= 1) {
        return arr
    }

    const pivot = arr[0]

    const left = []
    const right = []

    for (let i = 1; i < arr.length; i++) {

        if (arr[i] < pivot) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }

    }

    const leftSorted = quickSort(left)
    const rightSorted = quickSort(right)

    return [...leftSorted, pivot, ...rightSorted]

}

const result = quickSort(unique)

console.log(result)
