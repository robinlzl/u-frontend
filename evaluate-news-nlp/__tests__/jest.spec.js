import { checkForName } from '../src/client/js/nameChecker'
describe("test nameChecker", () => {

    test("it should ...", () => {

        const input = 'Picard'
        const output = true
        expect(checkForName(input)).toEqual(output)
    })
})



