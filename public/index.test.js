const index = require('./index.js')
const adjustPageNum = require('./index.js')

var PAGE = 1
let  buttonDisable = jest.fn()
test('if dir equals next, page equals 2', () => {
    
    PAGE = adjustPageNum("next")
    expect(buttonDisable).toHaveBeenCalled();
})
