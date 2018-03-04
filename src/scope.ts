
export enum ScopeType { Function, Bloc }
export enum Kind { Var, Const, Let }

export interface Var {
  value: any // 这里用 getter / setter 来控制 const 问题
  $delete(): boolean // delete 操作符
  $this(): any // 当前变量绑定的 this
}

// 作用域变量
export class ScopeVar implements Var {

  private _value: any
  private kind: Kind

  constructor(kind: Kind, init_value?: any) {
    this.kind = kind
    this._value = init_value
  }

  // 用 getter / setter 的方式简化之后的赋值语句
  set value(v: any) {
    if (this.kind === Kind.Const) throw new TypeError('Assignment to constant variable.')
    this._value = v
  }

  get value(): any { return this._value }

  // 用来给 delete 操作符用的方法
  $delete() { /* 对于普通的变量来说，delete 没有任何意义 */ return false }

  // 执行函数的时候用来找 this 用，没有则返回 undefined
  // 尽量以 strict 的标准来写吧
  $this(): any { return undefined }
}

// 通过属性访问的变量
export class PropVar implements Var {

  // 目的是为了保持 object 本身的 setter / getter
  // 以及函数调用时候的 $this
  private object: any
  private prop: string

  constructor(obejct: any, prop: string) {
    this.object = this.object
    this.prop = prop
  }

  // 和 ScopeVar 一样，用 getter 和 setter 来方便之后的赋值操作
  set value(v: any) { this.object[this.prop] = v }
  get value(): any { return this.object[this.prop] }

  // delete 操作符
  $delete() { return delete this.object[this.prop] }

  // PropVar 的 this 指向 object 对象，用于函数调用时使用
  $this(): any { return this.object }
}

export class Scope {

  // 用来存储变量的位置
  private type: ScopeType
  private content: { [name: string]: Var } = {}
  private parent?: Scope

  constructor(type: ScopeType, parent?: Scope) {
    this.type = type
    this.content = {};
    (<any>this.content).__proto__ = null // 置空 content 对象

    if (parent) {
      this.parent = parent;

      // 用原型链来记录作用域链，方便快速查找变量
      (<any>this.content).__proto__ = parent.content
    }
  }

  // 用原型链来方便查找过程
  find(name: string): Var | undefined { return this.content[name] }

  // 定义变量
  declare(kind: Kind, name: string, init_value?: any) {
    ({
      [Kind.Var]: () => {
        let scope: Scope = this
        // 像上层搜索，直到直到函数作用域或者顶层作用域
        while (scope.parent && scope.parent.type !== ScopeType.Function)
          scope = scope.parent
        scope.content[name] = new ScopeVar(Kind.Var, init_value)
      },
      [Kind.Let]: () => { this.content[name] = new ScopeVar(Kind.Let, init_value) },
      [Kind.Const]: () => { this.content[name] = new ScopeVar(Kind.Const, init_value) }
    })[kind]()
  }

  // 加上一些方便使用的方法
  $const(name: string, init_value?: any) { this.declare(Kind.Const, name, init_value) }
  $let(name: string, init_value?: any) { this.declare(Kind.Let, name, init_value) }
  $var(name: string, init_value?: any) { this.declare(Kind.Var, name, init_value) }
}