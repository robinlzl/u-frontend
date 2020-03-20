import { isValidUrl } from '../src/client/js/formHandler'
import 'babel-polyfill'

describe("test formHandler", () => {

    test("return true if the input url is valid", () => {

        const input = 'http://www.google.com'
        const output = null
        expect(isValidUrl(input)).toEqual(output)
    })

    test("return false if the input url is not valid", () => {

        const input = 'project 4'
        const output = null
        expect(isValidUrl(input)).toEqual(output)
    })
})



