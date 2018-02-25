
export type ScopeType = 'function' | 'loop' | 'switch' | 'block'

export type Kind = 'const' | 'var' | 'let'

export interface Var {
  $get(): any
  $set(value: any): boolean
  // $call($this: any, args: Array<any>): any
}

export class ScopeVar implements Var {
  value: any
  kind: Kind

  constructor(kind: Kind, value: any) {
    this.value = value
    this.kind = kind
  }

  $set(value: any): boolean {
    if (this.value === 'const') {
      return false
    } else {
      this.value = value
      return true
    }
  }

  $get(): any {
    return this.value
  }
}

export class PropVar implements Var {
  object: any
  property: string

  constructor(object: any, property: string) {
    this.object = object
    this.property = property
  }

  $set(value: any) { this.object[this.property] = value; return true }
  $get() { return this.object[this.property] }
  $delete() { delete this.object[this.property] }
}

export class Scope {
  private content: { [key: string]: Var }
  private parent: Scope | null
  private prefix: string = '@'

  readonly type: ScopeType

  invasived: boolean

  constructor(type: ScopeType, parent?: Scope, label?: string) {
    this.type = type
    this.parent = parent || null
    this.content = {}
    this.invasived = false
  }

  $find(raw_name: string): Var | null {
    const name = this.prefix + raw_name
    if (this.content.hasOwnProperty(name)) {
      return this.content[name]
    } else if (this.parent) {
      return this.parent.$find(raw_name)
    } else {
      return null
    }
  }

  $let(raw_name: string, value: any): boolean {
    const name = this.prefix + raw_name
    const $var = this.content[name]
    if (!$var) {
      this.content[name] = new ScopeVar('let', value) 
      return true
    } else { return false }
  }

  $const(raw_name: string, value: any): boolean { 
    const name = this.prefix + raw_name
    const $var = this.content[name]
    if (!$var) {
      this.content[name] = new ScopeVar('const', value) 
      return true
    } else { return false }
  }

  $var(raw_name: string, value: any): boolean {
    const name = this.prefix + raw_name
    let scope: Scope = this

    while (scope.parent !== null && scope.type !== 'function') {
      scope = scope.parent
    }

    const $var = scope.content[name]
    if (!$var) {
      this.content[name] = new ScopeVar('var', value) 
      return true
    } else { return false }
  }


  $declar(kind: Kind, raw_name: string, value: any): boolean {
    return ({
      'var': () => this.$var(raw_name, value),
      'let': () => this.$let(raw_name, value),
      'const': () => this.$const(raw_name, value)
    })[kind]()
  }
}
