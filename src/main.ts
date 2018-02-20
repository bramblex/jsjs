
declare const require : (module: string) => any
const acorn = require('acorn/dist/acorn.js')

import Scope from './scope'
import { Var } from './scope'
import evaluate from './eval'

const options = {
    ecmaVersion: 5,
    sourceType: 'script',
    locations: true,
}

export default function (code: string, append_api: { [key: string]: any }) {
    const scope = new Scope('block')
    for (const name of Object.getOwnPropertyNames(append_api)) {
        scope.$const(name, append_api[name])
    }
    evaluate(acorn.parse(code, options), scope)
    const module_var = scope.$find('module')
    return module_var ? module_var.$get() : null
}
