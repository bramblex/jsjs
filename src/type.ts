
import * as ESTree from 'estree'
import { Scope } from './scope'

export interface NodeTypeMap {
    Identifier: ESTree.Identifier
    Literal: ESTree.Literal
    Program: ESTree.Program
    FunctionDeclaration: ESTree.FunctionDeclaration
    FunctionExpression: ESTree.FunctionExpression
    ArrowFunctionExpression: ESTree.ArrowFunctionExpression
    SwitchCase: ESTree.SwitchCase
    CatchClause: ESTree.CatchClause
    VariableDeclarator: ESTree.VariableDeclarator
    ExpressionStatement: ESTree.ExpressionStatement
    BlockStatement: ESTree.BlockStatement
    EmptyStatement: ESTree.EmptyStatement
    DebuggerStatement: ESTree.DebuggerStatement
    WithStatement: ESTree.WithStatement
    ReturnStatement: ESTree.ReturnStatement
    LabeledStatement: ESTree.LabeledStatement
    BreakStatement: ESTree.BreakStatement
    ContinueStatement: ESTree.ContinueStatement
    IfStatement: ESTree.IfStatement
    SwitchStatement: ESTree.SwitchStatement
    ThrowStatement: ESTree.ThrowStatement
    TryStatement: ESTree.TryStatement
    WhileStatement: ESTree.WhileStatement
    DoWhileStatement: ESTree.DoWhileStatement
    ForStatement: ESTree.ForStatement
    ForInStatement: ESTree.ForInStatement
    ForOfStatement: ESTree.ForOfStatement
    VariableDeclaration: ESTree.VariableDeclaration
    ClassDeclaration: ESTree.ClassDeclaration
    ThisExpression: ESTree.ThisExpression
    ArrayExpression: ESTree.ArrayExpression
    ObjectExpression: ESTree.ObjectExpression
    YieldExpression: ESTree.YieldExpression
    UnaryExpression: ESTree.UnaryExpression
    UpdateExpression: ESTree.UpdateExpression
    BinaryExpression: ESTree.BinaryExpression
    AssignmentExpression: ESTree.AssignmentExpression
    LogicalExpression: ESTree.LogicalExpression
    MemberExpression: ESTree.MemberExpression
    ConditionalExpression: ESTree.ConditionalExpression
    CallExpression: ESTree.CallExpression
    NewExpression: ESTree.NewExpression
    SequenceExpression: ESTree.SequenceExpression
    TemplateLiteral: ESTree.TemplateLiteral
    TaggedTemplateExpression: ESTree.TaggedTemplateExpression
    ClassExpression: ESTree.ClassExpression
    MetaProperty: ESTree.MetaProperty
    AwaitExpression: ESTree.AwaitExpression
    Property: ESTree.Property
    Super: ESTree.Super
    TemplateElement: ESTree.TemplateElement
    SpreadElement: ESTree.SpreadElement
    ObjectPattern: ESTree.ObjectPattern
    ArrayPattern: ESTree.ArrayPattern
    RestElement: ESTree.RestElement
    AssignmentPattern: ESTree.AssignmentPattern
    ClassBody: ESTree.ClassBody
    MethodDefinition: ESTree.MethodDefinition
    ImportDeclaration: ESTree.ImportDeclaration
    ExportNamedDeclaration: ESTree.ExportNamedDeclaration
    ExportDefaultDeclaration: ESTree.ExportDefaultDeclaration
    ExportAllDeclaration: ESTree.ExportAllDeclaration
    ImportSpecifier: ESTree.ImportSpecifier
    ImportDefaultSpecifier: ESTree.ImportDefaultSpecifier
    ImportNamespaceSpecifier: ESTree.ImportNamespaceSpecifier
    ExportSpecifier: ESTree.ExportSpecifier
}

export type EvaluateMap = {
    [key in ESTree.Node['type']]: (node: NodeTypeMap[key], scope: Scope, arg?: any) => any
}

export type EvaluateFunc = (node: ESTree.Node, scope: Scope, arg?: any) => any