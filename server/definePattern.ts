import type { IconDefinition } from "@fortawesome/fontawesome-common-types"

export type PatternDef = {
  id: string
  title: string
  slug: string
  shortdesc: string
  icon: IconDefinition
  explanation: string
  exercises: {
    content: string
  }[]
}

export function definePattern(def: PatternDef): PatternDef {
  return def
}

/** 
 * Currently just a reimplementation of default template literals
 * Used to inform syntax highlighting
 */
export function md(strs: TemplateStringsArray, ...substs: any[]) {
  return substs.reduce(
    (prev, cur, i) => prev + cur + strs[i + 1],
    strs[0]
  )
}