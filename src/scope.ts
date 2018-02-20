
export type ScopeType = 'function' | 'loop' | 'switch' | 'block'

export type Kind = 'const' | 'var' | 'let'

export class Var {
  value: any
  kind: Kind

  constructor(kind: Kind, value: any) {
    this.kind = kind
    this.value = value
  }

  $get(): any {
    return this.value
  }

  $set(value: any): boolean {
    if (this.value === 'const') {
      return false
    } else {
      this.value = value
      return true
    }
  }
}

export default class Scope {
  private content: { [key: string]: Var }
  private parent: Scope | null

  readonly type: ScopeType

  invasived: boolean

  constructor(type: ScopeType, parent?: Scope, label?: string) {
    this.type = type
    this.parent = parent || null
    this.content = {}
    this.invasived = false
  }

  $find(name: string): Var | null {
    if (this.content.hasOwnProperty(name)) {
      return this.content[name]
    } else if (this.parent) {
      return this.parent.$find(name)
    } else {
      return null
    }
  }

  $let(name: string, value: any): boolean {
    const $var = this.content[name]
    if (!$var) {
      this.content[name] = new Var('let', value) 
      return true
    } else { return false }
  }

  $const(name: string, value: any): boolean { 
    const $var = this.content[name]
    if (!$var) {
      this.content[name] = new Var('const', value) 
      return true
    } else { return false }
  }

  $var(name: string, value: any): boolean {
    let scope: Scope = this

    while (scope.parent !== null && scope.type !== 'function') {
      scope = scope.parent
    }

    const $var = scope.content[name]
    if (!$var) {
      this.content[name] = new Var('var', value) 
      return true
    } else { return false }
  }


  $declar(kind: Kind, name: string, value: any): boolean {
    return ({
      'var': () => this.$var(name, value),
      'let': () => this.$let(name, value),
      'const': () => this.$const(name, value)
    })[kind]()
  }
}
