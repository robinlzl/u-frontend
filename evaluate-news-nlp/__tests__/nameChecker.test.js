import { checkForName } from '../src/client/js/nameChecker'
describe("test nameChecker", () => {

    test("return true if input is in the name list", () => {

        const input = 'Picard'
        const output = true
        expect(checkForName(input)).toEqual(output)
    })

    test("return false if input is in the name list", () => {

        const input = 'xxx'
        const output = false
        expect(checkForName(input)).toEqual(output)
    })
})



